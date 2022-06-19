import { defineStore } from 'pinia';
import { getUUID } from '/@/views/visualBigScreen/bigScreenPanel/utils/commonUtils';

import { debounce, cloneDeep } from 'lodash-es';
import { store } from '/@/store';

import { HistoryActionTypeEnum } from './commpoType';
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();
// 记录记录
import { useChartViewStoreWithOut } from '/@/store/modules/chartView';
// Types
import { EditCanvasType, HistoryTargetTypeEnum, ComponentType } from './commpoType';
interface ChartEditStoreType {
  editCanvas: EditCanvasType;
  rightMenuShow: boolean;
  mousePosition: {
    startX: number;
    startY: number;
    x: number;
    y: number;
  };
  targetChart: {
    hoverId: string | undefined;
    selectId: string | undefined;
  };
  recordChart?: string;
  editCanvasConfig: any;
  componentList: ComponentType[];
  // 图片移动的位置
  chartMoveDistance: number;
  menuOptions: [];
}

const chartHistoryStore = useChartViewStoreWithOut();

// 编辑区域内容
export const useChartEditStore = defineStore({
  id: 'useChartEditStore',
  state: (): ChartEditStoreType => ({
    // 画布属性
    editCanvas: {
      // 编辑区域 Dom
      editLayoutDom: null,
      editContentDom: null,
      // 偏移量
      offset: 20,
      // 系统控制缩放
      scale: 1,
      // 用户控制的缩放
      userScale: 1,
      // 锁定缩放
      lockScale: false,
      // 初始化
      isCreate: false,
      // 拖拽中
      isDrag: false,
    },
    // 右键菜单
    rightMenuShow: false,
    // 鼠标定位
    mousePosition: {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
    },
    // 目标图表
    targetChart: {
      hoverId: undefined,
      selectId: undefined,
    },
    // 记录临时数据（复制等）
    recordChart: undefined,
    // -----------------------
    // 画布/大屏属性（需存储给后端）
    editCanvasConfig: {
      title: '大屏',
      description: '',
      // 默认宽度
      width: 1920,
      // 默认高度
      height: 1080,
      // 默认背景色
      background: '#232324',
      backgroundImage: undefined,
      // 选择颜色还是背景图
      selectColor: true,
      // 预览方式
      previewScaleType: '',
    },
    // 图表数组（需存储给后端）
    componentList: [],
    chartMoveDistance: 5,
    menuOptions: [],
  }),
  getters: {
    getMenuOptions(): any {
      return this.menuOptions;
    },
    getMousePosition(): any {
      return this.mousePosition;
    },
    getRightMenuShow(): boolean {
      return this.rightMenuShow;
    },
    getEditCanvas(): any {
      return this.editCanvas;
    },
    getEditCanvasConfig(): any {
      return this.editCanvasConfig;
    },
    getTargetChart(): any {
      return this.targetChart;
    },
    getRecordChart(): any {
      return this.recordChart;
    },
    getComponentList(): any {
      return this.componentList;
    },
    // 获取需要存储的数据项
    getStorageInfo(): any {
      return {
        editCanvasConfig: this.getEditCanvasConfig,
        componentList: this.getComponentList,
      };
    },
  },
  actions: {
    // 设置邮件菜单
    setMenuOption(list) {
      this.menuOptions = list;
    },
    // * 设置 editCanvas 数据项
    setEditCanvas(key, value) {
      this.editCanvas[key] = value;
    },
    // * 设置 editCanvasConfig（需保存后端） 数据项
    setEditCanvasConfig(key, value) {
      this.editCanvasConfig[key] = value;
    },
    // * 设置右键菜单
    setRightMenuShow(value: boolean) {
      this.rightMenuShow = value;
    },
    // * 设置目标数据 hover
    setTargetHoverChart(hoverId) {
      this.targetChart.hoverId = hoverId;
    },
    // * 设置目标数据 select
    setTargetSelectChart(selectId) {
      this.targetChart.selectId = selectId;
    },
    // * 设置记录数据
    setRecordChart(item) {
      this.recordChart = cloneDeep(item);
    },
    // * 设置鼠标位置
    setMousePosition(x?: number, y?: number, startX?: number, startY?: number): void {
      if (startX) this.mousePosition.startX = startX;
      if (startY) this.mousePosition.startY = startY;
      if (x) this.mousePosition.x = x;
      if (y) this.mousePosition.y = y;
    },
    // * 找到目标 id 数据下标位置（无则返回-1）
    fetchTargetIndex(id?: string): number {
      const targetId = id || this.getTargetChart.selectId;
      if (!targetId) {
        return -1;
      }
      const index = this.componentList.findIndex((e) => e.uuid === targetId);
      if (index === -1) {
        // error Todo
        return -1;
      }
      return index;
    },
    /**
     * * 新增组件列表
     * @param chartConfig 新图表实例
     * @param isHead 是否头部插入
     * @param isHistory 是否进行记录
     * @returns
     */
    addComponentList(chartConfig, isHead = false, isHistory = false): void {
      if (isHistory) {
        // 推入历史栈
        chartHistoryStore.createAddHistory(chartConfig);
      }
      if (isHead) {
        this.componentList.unshift(chartConfig);
        return;
      }
      this.componentList.push(chartConfig);
    },
    // * 删除组件列表
    removeComponentList(isHistory = true, item = { uuid: undefined }): void {
      try {
        const index = this.fetchTargetIndex(item?.uuid);
        if (index !== -1) {
          isHistory
            ? chartHistoryStore.createDeleteHistory(this.getComponentList[index])
            : undefined;
          this.componentList.splice(index, 1);
          return;
        }
      } catch (value) {}
    },
    // * 更新组件列表某一项的值
    updateComponentList(index: number, newData) {
      if (index < 1 && index > this.getComponentList.length) return;
      this.componentList[index] = newData;
    },
    // * 设置页面样式属性
    setPageStyle(key, value): void {
      const dom = this.getEditCanvas.editContentDom;
      if (dom) {
        dom.style[key] = value;
      }
    },
    // * 移动组件列表层级位置到两端
    setBothEnds(isEnd = false, isHistory = true): void {
      try {
        const length = this.getComponentList.length;
        if (length < 2) {
          return;
        }

        const index = this.fetchTargetIndex();
        const targetData = this.getComponentList[index];
        if (index != -1) {
          // 置底排除最底层, 置顶排除最顶层
          if ((isEnd && index === 0) || (!isEnd && index === length - 1)) {
            return;
          }

          // 记录原有位置
          const setIndex = (t: any, i: number) => {
            const temp = cloneDeep(t);
            temp.zIndex = i;
            return temp;
          };

          // 历史记录
          if (isHistory) {
            chartHistoryStore.createLaryerHistory(
              setIndex(targetData, index),
              isEnd ? HistoryActionTypeEnum.BOTTOM : HistoryActionTypeEnum.TOP,
            );
          }

          // 插入两端
          this.addComponentList(targetData, isEnd);
          this.getComponentList.splice(isEnd ? index + 1 : index, 1);

          return;
        }
      } catch (value) {}
    },
    // * 置顶
    setTop(isHistory = true): void {
      this.setBothEnds(false, isHistory);
    },
    // * 置底
    setBottom(isHistory = true): void {
      this.setBothEnds(true, isHistory);
    },
    // * 上移/下移互换图表位置
    wrap(isDown = false, isHistory = true) {
      try {
        const length = this.getComponentList.length;
        if (length < 2) {
          return;
        }

        const index: number = this.fetchTargetIndex();
        if (index !== -1) {
          // 下移排除最底层, 上移排除最顶层
          if ((isDown && index === 0) || (!isDown && index === length - 1)) {
            return;
          }
          // 互换位置
          const swapIndex = isDown ? index - 1 : index + 1;
          const targetItem = this.getComponentList[index];
          const swapItem = this.getComponentList[swapIndex];

          // 历史记录
          if (isHistory) {
            chartHistoryStore.createLaryerHistory(
              targetItem,
              isDown ? HistoryActionTypeEnum.DOWN : HistoryActionTypeEnum.UP,
            );
          }
          this.updateComponentList(index, swapItem);
          this.updateComponentList(swapIndex, targetItem);

          return;
        }
      } catch (value) {}
    },
    // * 图层上移
    setUp(isHistory = true) {
      this.wrap(false, isHistory);
    },
    // * 图层下移
    setDown(isHistory = true) {
      this.wrap(true, isHistory);
    },
    // * 复制
    setCopy() {
      try {
        const index: number = this.fetchTargetIndex();
        if (index !== -1) {
          const copyData = {
            charts: this.getComponentList[index],
            type: HistoryActionTypeEnum.COPY,
          };
          this.setRecordChart(copyData);
          createMessage.info('复制成功！');
        }
      } catch (value) {}
    },
    // * 粘贴
    setParse() {
      try {
        const recordCharts = this.getRecordChart;
        if (recordCharts === undefined) {
          return;
        }
        const parseHandle = (e) => {
          e = cloneDeep(e);
          // 生成新 id
          e.uuid = getUUID();
          // 偏移位置
          e.option.position.left = this.getMousePosition.x + 30;
          e.option.position.top = this.getMousePosition.y + 30;
          return e;
        };
        // 多项
        if (Array.isArray(recordCharts.charts)) {
          recordCharts.charts.forEach((e) => {
            this.addComponentList(parseHandle(e), undefined, true);
          });
          return;
        }
        // 单项
        this.addComponentList(parseHandle(recordCharts.charts), undefined, true);
      } catch (value) {}
    },
    // * 撤回/前进 目标处理
    setBackAndSetForwardHandle(item, isForward = false) {
      console.log('item', item, isForward);
      // 处理画布
      if (item.targetType === HistoryTargetTypeEnum.CANVAS) {
        this.editCanvas = item.historyData;
        return;
      }

      const historyData = item.historyData;

      // 处理新增类型
      const isAdd = item.actionType === HistoryActionTypeEnum.ADD;
      const isDel = item.actionType === HistoryActionTypeEnum.DELETE;
      this.setTargetSelectChart(historyData.uuid);
      if (isAdd || isDel) {
        if ((isAdd && isForward) || (isDel && !isForward)) {
          this.addComponentList(historyData);
          return;
        }
        this.removeComponentList(false, item?.historyData);
        return;
      }

      // 处理层级
      const isTop = item.actionType === HistoryActionTypeEnum.TOP;
      const isBottom = item.actionType === HistoryActionTypeEnum.BOTTOM;
      if (isTop || isBottom) {
        if (!isForward) {
          // 插入到原有位置
          if (isTop) this.getComponentList.pop();
          if (isBottom) this.getComponentList.shift();
          this.getComponentList.splice(historyData.attr.zIndex, 0, historyData);
          return;
        }
        if (isTop) this.setTop(false);
        if (isBottom) this.setBottom(false);
      }

      const isUp = item.actionType === HistoryActionTypeEnum.UP;
      const isDown = item.actionType === HistoryActionTypeEnum.DOWN;
      if (isUp || isDown) {
        if ((isUp && isForward) || (isDown && !isForward)) {
          this.setUp(false);
          return;
        }
        this.setDown(false);
        return;
      }

      // 处理内容修改
      this.getComponentList[this.fetchTargetIndex()] = item.historyData;
    },
    // * 撤回
    setBack() {
      try {
        const targetData = chartHistoryStore.backAction();
        if (!targetData) {
          return;
        }
        if (Array.isArray(targetData)) {
          targetData.forEach((e) => {
            this.setBackAndSetForwardHandle(e);
          });
          return;
        }
        this.setBackAndSetForwardHandle(targetData);
      } catch (value) {}
    },
    // * 前进
    setForward() {
      try {
        const targetData = chartHistoryStore.forwardAction();
        console.log('go', targetData);
        if (!targetData) {
          return;
        }
        if (Array.isArray(targetData)) {
          targetData.forEach((e) => {
            this.setBackAndSetForwardHandle(e, true);
          });
          return;
        }
        this.setBackAndSetForwardHandle(targetData, true);
      } catch (value) {}
    },
    // ----------------
    // * 设置页面大小
    setPageSize(scale: number): void {
      this.setPageStyle('height', `${this.editCanvasConfig.height * scale}px`);
      this.setPageStyle('width', `${this.editCanvasConfig.width * scale}px`);
    },
    // * 计算缩放
    computedScale() {
      if (this.getEditCanvas.editLayoutDom) {
        // 现有展示区域
        const width =
          this.getEditCanvas.editLayoutDom.clientWidth - this.getEditCanvas.offset * 2 - 5;
        const height =
          this.getEditCanvas.editLayoutDom.clientHeight - this.getEditCanvas.offset * 4;

        // 用户设定大小
        const editCanvasWidth = this.editCanvasConfig.width;
        const editCanvasHeight = this.editCanvasConfig.height;

        // 需保持的比例
        const baseProportion = parseFloat((editCanvasWidth / editCanvasHeight).toFixed(5));
        const currentRate = parseFloat((width / height).toFixed(5));

        if (currentRate > baseProportion) {
          // 表示更宽
          const scaleWidth = parseFloat(((height * baseProportion) / editCanvasWidth).toFixed(5));
          this.setScale(scaleWidth > 1 ? 1 : scaleWidth);
        } else {
          // 表示更高
          const scaleHeight = parseFloat((width / baseProportion / editCanvasHeight).toFixed(5));
          this.setScale(scaleHeight > 1 ? 1 : scaleHeight);
        }
      } else {
        createMessage.warning('请先创建画布，再进行缩放');
      }
    },
    // * 监听缩放
    listenerScale(): Function {
      const resize = debounce(this.computedScale, 200);
      // 默认执行一次
      resize();
      // 开始监听
      window.addEventListener('resize', resize);
      // 销毁函数
      const remove = () => {
        window.removeEventListener('resize', resize);
      };
      return remove;
    },
    /**
     * * 设置缩放
     * @param scale 0~1 number 缩放比例;
     * @param force boolean 强制缩放
     */
    setScale(scale: number, force = false): void {
      if (!this.getEditCanvas.lockScale || force) {
        this.setPageSize(scale);
        this.getEditCanvas.userScale = scale;
        this.getEditCanvas.scale = scale;
      }
    },
  },
});

// Need to be used outside the setup
export function useChartEditStoreWithOut() {
  return useChartEditStore(store);
}
