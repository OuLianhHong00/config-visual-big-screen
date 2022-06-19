import { nextTick } from 'vue';
import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';

import { MenuOptionsItemType } from '../type/chartCommonType';
import { MenuEnum } from '../enums/commonEnum';

const chartEditStore = useChartEditStoreWithOut();

// * 默认选项
const defaultOptions: MenuOptionsItemType[] = [
  {
    label: '复制',
    key: MenuEnum.COPY,
    icon: 'bx:copy-alt',
    fnHandle: chartEditStore.setCopy,
  },
  {
    label: '粘贴',
    key: MenuEnum.PARSE,
    icon: 'bx:copy-alt',
    fnHandle: chartEditStore.setParse,
  },
  {
    label: '置顶',
    key: MenuEnum.TOP,
    icon: 'bx:copy-alt',
    fnHandle: chartEditStore.setTop,
  },
  {
    label: '置底',
    key: MenuEnum.BOTTOM,
    icon: 'bx:copy-alt',
    fnHandle: chartEditStore.setBottom,
  },
  {
    label: '上移一层',
    key: MenuEnum.UP,
    icon: 'bx:copy-alt',
    fnHandle: chartEditStore.setUp,
  },
  {
    label: '下移一层',
    key: MenuEnum.DOWN,
    icon: 'bx:copy-alt',
    fnHandle: chartEditStore.setDown,
  },
  {
    label: '删除',
    key: MenuEnum.DELETE,
    icon: 'bx:copy-alt',
    fnHandle: chartEditStore.removeComponentList,
  },
];

// * 无数据传递拥有的选项
const defaultNoItemKeys = [MenuEnum.PARSE, MenuEnum.CLEAR];

/**
 * * 挑选选项
 * @param options
 * @param pickList
 * @returns
 */
const pickOption = (options: MenuOptionsItemType[], pickList?: MenuEnum[]) => {
  if (!pickList) return options;
  return options.filter((op: MenuOptionsItemType) => {
    return pickList.findIndex((e: MenuEnum) => e === op.key) !== -1;
  });
};

/**
 * * 去除选项
 * @param options
 * @param hideList
 * @returns
 */
const hideOption = (options: MenuOptionsItemType[], hideList?: MenuEnum[]) => {
  if (!hideList) return options;
  return options.filter((op: MenuOptionsItemType) => {
    return hideList.findIndex((e: MenuEnum) => e !== op.key) !== -1;
  });
};

// * 右键处理
const handleContextMenu = (
  e: MouseEvent,
  // 右键对象
  item?: any,
  // 判断函数
  optionsHandle?: Function,
  // 隐藏选项列表
  hideOptionsList?: MenuEnum[],
  // 挑选选项列表
  pickOptionsList?: MenuEnum[],
) => {
  e.stopPropagation();
  e.preventDefault();
  let target = e.target;
  while (target instanceof SVGElement) {
    target = target.parentNode;
  }
  chartEditStore.setRightMenuShow(false);

  // * 设置默认选项
  chartEditStore.setMenuOption(defaultOptions);

  if (!item) {
    console.log('items', chartEditStore);
    const items = chartEditStore.getRecordChart;
    console.log('items', items);
    if (items) {
      chartEditStore.setMenuOption(pickOption(chartEditStore.getMenuOptions, defaultNoItemKeys));
    }
  }
  if (hideOptionsList) {
    chartEditStore.setMenuOption(hideOption(chartEditStore.getMenuOptions, hideOptionsList));
  }
  if (pickOptionsList) {
    chartEditStore.setMenuOption(hideOption(chartEditStore.getMenuOptions, pickOptionsList));
  }
  if (optionsHandle) {
    chartEditStore.setMenuOption(optionsHandle(chartEditStore.getMenuOptions));
  }
  nextTick().then(() => {
    chartEditStore.setMousePosition(e.clientX, e.clientY);
    chartEditStore.setRightMenuShow(true);
  });
};

/**
 * * 右键hook
 * @param menuConfig
 * @returns
 */
export const useContextMenu = () => {
  // 设置默认项
  const menuOptions = defaultOptions;

  // * 失焦
  const onClickOutSide = () => {
    chartEditStore.setRightMenuShow(false);
  };

  // * 事件处理
  const handleMenuSelect = (key: string) => {
    chartEditStore.setRightMenuShow(false);
    const targetItem: MenuOptionsItemType[] = menuOptions.filter(
      (e: MenuOptionsItemType) => e.key === key,
    );

    menuOptions.forEach((e: MenuOptionsItemType) => {
      if (e.key === key) {
        if (e.fnHandle) {
          e.fnHandle();
          return;
        }
        if (!targetItem) {
        }
      }
    });
  };

  return {
    handleContextMenu,
    onClickOutSide,
    handleMenuSelect,
    mousePosition: chartEditStore.getMousePosition,
  };
};
