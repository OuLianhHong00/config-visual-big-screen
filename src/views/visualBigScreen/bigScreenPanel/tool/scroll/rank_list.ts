/**
 * 竖向滚动
 */
import { Components } from '../commomSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '竖向滚动',
  },
];

// 滚动设置
const scrollConfig = [
  {
    label: '滚动设置',
    field: 'scrollSetting',
    list: [
      {
        field: 'isScroll',
        component: Components.SWITCH,
        label: '是否滚动',
        value: true,
      },
      {
        field: 'direction',
        component: Components.SELECT,
        label: '滚动方向',
        value: 'up',
        options: [
          { value: 'up', label: '向上' },
          { value: 'down', label: '向下' },
        ],
      },
      {
        field: 'hover',
        component: Components.SWITCH,
        label: '鼠标悬停',
        value: true,
      },
      {
        field: 'limitScrollNum',
        component: Components.SLIDER,
        label: '滚动数量',
        value: 8,
        max: 20,
        min: 5,
      },
      {
        field: 'step',
        component: Components.SLIDER,
        label: '速度',
        value: 5,
        max: 10,
        min: 1,
        step: 1,
      },
    ],
  },
];
// 颜色设置
const barConfig = [
  {
    label: '柱体设置',
    field: 'barSetting',
    list: [
      {
        field: 'barColor',
        lable: '柱体颜色',
        component: Components.COLOR,
        value: '#1370fb',
      },
      {
        field: 'barBgColor',
        lable: '背景颜色',
        component: Components.COLOR,
        value: '#1370fb80',
      },
      {
        field: 'textColor',
        lable: '文字颜色',
        component: Components.COLOR,
        value: '#ffffff',
      },
      {
        field: 'textSize',
        lable: '文字大小',
        component: Components.INPUTNUMBER,
        value: 14,
      },
    ],
  },
];

export const rank_list = {
  code: 'RankList',
  type: 'chart',
  label: '竖向滚动组件',
  icon: 'material-symbols:stacked-bar-chart',
  option: {
    attr: [...basicInfo, ...scrollConfig, ...barConfig],
    // 数据源
    dataSource: {
      dataType: 1,
      staticData: [],
      dynamicData: '',
    },
    // 坐标
    position: {
      left: 0,
      top: 0,
      width: 500,
      height: 350,
    },
  },
};
