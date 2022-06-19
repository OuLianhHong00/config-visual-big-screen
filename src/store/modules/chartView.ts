import { defineStore } from 'pinia';
import { store } from '/@/store';

import {
  EditCanvasType,
  ComponentType,
  HistoryTargetTypeEnum,
  HistoryActionTypeEnum,
} from './commpoType';

type HistoryItemType = {
  id: string;
  actionType: HistoryActionTypeEnum;
  targetType: HistoryTargetTypeEnum;
  historyData: ComponentType | EditCanvasType;
};

interface ChartState {
  // 后退栈
  backStack: HistoryItemType[];
  // 前进栈
  forwardStack: HistoryItemType[];
  currentDragChartInfo: ComponentType | undefined;
}
const editHistoryMax = 100;

export const useUserStore = defineStore({
  id: 'useUserStore',
  state: (): ChartState => ({
    // 后退栈
    backStack: [],
    // 前进栈
    forwardStack: [],
    currentDragChartInfo: undefined,
  }),
  getters: {
    getBackStack(): Array<HistoryItemType> {
      return this.backStack;
    },
    getForwardStack(): Array<HistoryItemType> {
      return this.forwardStack;
    },
    getCurrentDragChartInfo(): undefined | ComponentType {
      return this.currentDragChartInfo;
    },
  },
  actions: {
    //当前拖拽的组件信息
    setCurrentDragChartInfo(value) {
      this.currentDragChartInfo = value;
    },
    /**
     * * 新增记录并插入栈
     * @param item 图表实例
     * @param actionType 动作类型
     * @param targetType 对象类型（默认图表）
     */
    createStackItem(
      item: ComponentType | EditCanvasType,
      actionType: HistoryActionTypeEnum,
      targetType: HistoryTargetTypeEnum = HistoryTargetTypeEnum.CHART,
    ) {
      // 优化性能转为freeze
      this.pushBackStackItem(
        Object.freeze({
          id: new Date().getTime().toString(),
          historyData: item,
          actionType: actionType,
          targetType: targetType,
        } as const),
      );
    },
    // * 画布初始化
    canvasInit(canvas: EditCanvasType) {
      this.createStackItem(canvas, HistoryActionTypeEnum.ADD, HistoryTargetTypeEnum.CANVAS);
    },
    // * 推入后退栈
    pushBackStackItem(item: HistoryItemType | Array<HistoryItemType>, notClear = false): void {
      console.log('推入后退站', item, notClear);
      if (item instanceof Array) this.backStack = [...this.backStack, ...item];
      else this.backStack.push(item);
      this.backStack.splice(0, this.backStack.length - editHistoryMax);
      // 新动作需清空前进栈
      if (notClear) return;
      this.clearForwardStack();
    },
    // * 推入前进栈
    pushForwardStack(item: HistoryItemType | Array<HistoryItemType>): void {
      console.log('推入前进站', item);
      if (item instanceof Array) this.forwardStack = [...this.forwardStack, ...item];
      else this.forwardStack.push(item);
    },
    // * 移出后退栈
    popBackStackItem(index?: number): HistoryItemType[] | HistoryItemType | undefined {
      const length = this.backStack.length;
      if (index && length >= index) {
        return this.backStack.splice(-index);
      }
      if (this.backStack.length > 0) {
        return this.backStack.pop();
      }
    },
    // * 移出前进栈
    popForwardStack(index?: number): HistoryItemType[] | HistoryItemType | undefined {
      const length = this.forwardStack.length;
      if (index && length >= index) {
        return this.forwardStack.splice(-index);
      }
      if (this.forwardStack.length > 0) {
        return this.forwardStack.pop();
      }
    },
    // * 清空前进栈
    clearForwardStack() {
      this.forwardStack = [];
    },
    // * 清空后退栈(保留初始化)
    clearBackStack() {
      const canvasHistory = this.getBackStack[0];
      this.backStack = [canvasHistory];
    },
    // * 撤回
    backAction() {
      try {
        // 排除画布初始化
        if (this.getBackStack.length > 1) {
          const targetData = this.popBackStackItem();
          if (!targetData) {
            return;
          }
          // 移除记录到前进堆
          this.pushForwardStack(targetData);
          return targetData;
        }
      } catch (error) {}
    },
    // * 前进
    forwardAction() {
      try {
        if (this.getForwardStack.length) {
          const targetData = this.popForwardStack();
          if (!targetData) {
            return;
          }
          // 放入后退栈
          this.pushBackStackItem(targetData, true);
          return targetData;
        }
      } catch (error) {}
    },
    // * 新增组件记录
    createAddHistory(item: ComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.ADD, HistoryTargetTypeEnum.CHART);
    },
    // * 更新属性记录（大小、图表属性）
    createUpdateHistory(item: ComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.UPDATE, HistoryTargetTypeEnum.CHART);
    },
    // * 删除组件记录
    createDeleteHistory(item: ComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.DELETE, HistoryTargetTypeEnum.CHART);
    },
    // * 移动组件记录
    createMoveHistory(item: ComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.MOVE, HistoryTargetTypeEnum.CHART);
    },
    // * 改变层级组件记录
    createLaryerHistory(
      item: ComponentType,
      type:
        | HistoryActionTypeEnum.TOP
        | HistoryActionTypeEnum.DOWN
        | HistoryActionTypeEnum.UP
        | HistoryActionTypeEnum.BOTTOM,
    ) {
      this.createStackItem(item, type, HistoryTargetTypeEnum.CHART);
    },
    // * 剪切组件记录
    createPasteHistory(item: ComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.CUT, HistoryTargetTypeEnum.CHART);
    },
  },
});

// Need to be used outside the setup
export function useChartViewStoreWithOut() {
  return useUserStore(store);
}
