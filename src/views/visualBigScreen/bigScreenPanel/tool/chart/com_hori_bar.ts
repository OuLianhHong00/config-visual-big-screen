/**
 * 横向柱状图
 */
import {
  chartGrid,
  chartXConfig,
  chartYConfig,
  legendConfig,
  tooltipConfig,
  Components,
  colorConfig,
  barLabelConfig,
} from '../commomSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '横向柱状图',
  },
];

// 柱体设置
const barConfig = [
  {
    label: '柱体设置',
    field: 'barSetting',
    list: [
      {
        field: 'width',
        component: Components.SLIDER,
        label: '宽度',
        required: false,
        value: 15,
        max: 50,
        min: 2,
      },
      {
        field: 'radius',
        component: Components.SLIDER,
        label: '圆角',
        required: false,
        value: 5,
        max: 50,
        min: 0,
      },
      {
        field: 'minHeight',
        component: Components.SLIDER,
        label: '最小高度',
        required: false,
        value: 0,
        max: 100,
        min: 0,
      },
    ],
  },
];

export const com_hori_bar = {
  code: 'ComHoriBar',
  type: 'chart',
  label: '横向柱状图',
  icon: 'material-symbols:align-horizontal-left',
  option: {
    attr: [
      ...basicInfo,
      ...barLabelConfig,
      ...chartGrid,
      ...chartXConfig,
      ...chartYConfig,
      ...legendConfig,
      ...tooltipConfig,
      ...barConfig,
      ...colorConfig,
    ],
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
