/**
 * 折柱状图
 */
import {
  chartGrid,
  chartXConfig,
  legendConfig,
  tooltipConfig,
  Components,
  colorConfig,
  barLabelConfig,
  lineConfig,
  lineLabelConfig,
} from '../commomSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '折柱图',
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

// Y轴设置
export const chartYConfig = [
  {
    label: 'Y轴设置',
    field: 'YSetting',
    list: [
      {
        field: 'leftShow',
        component: Components.SWITCH,
        label: '左显示',
        placeholder: '',
        value: true,
      },
      {
        field: 'leftLineColor',
        component: Components.COLOR,
        label: '左轴颜色',
        value: '#ffffff',
      },
      {
        field: 'leftName',
        component: Components.INPUT,
        label: '左轴名称',
        value: '',
      },
      {
        field: 'rightShow',
        component: Components.SWITCH,
        label: '右显示',
        placeholder: '',
        value: true,
      },
      {
        field: 'rightLineColor',
        component: Components.COLOR,
        label: '右轴颜色',
        value: '#ffffff',
      },
      {
        field: 'rightName',
        component: Components.INPUT,
        label: '右轴名称',
        value: '',
      },

      {
        field: 'lineWidth',
        component: Components.INPUTNUMBER,
        label: '轴宽度',
        value: 1,
      },
      {
        field: 'axisLineShow',
        component: Components.SWITCH,
        label: '轴线',
        placeholder: '',
        value: true,
      },
      {
        field: 'textColor',
        component: Components.COLOR,
        label: '字体颜色',
        value: '#ffffff',
      },
      {
        field: 'axisTickShow',
        component: Components.SWITCH,
        label: '刻度',
        placeholder: '',
        value: true,
      },
      {
        field: 'splitLineShow',
        component: Components.SWITCH,
        label: '分割线',
        placeholder: '',
        value: false,
      },
    ],
  },
];

export const com_bar_line = {
  code: 'ComBarLine',
  type: 'chart',
  label: '折柱图',
  icon: 'material-symbols:bar-chart-rounded',
  option: {
    attr: [
      ...basicInfo,
      ...barLabelConfig,
      ...barConfig,
      ...lineLabelConfig,
      ...lineConfig,
      ...chartGrid,
      ...chartXConfig,
      ...chartYConfig,
      ...legendConfig,
      ...tooltipConfig,
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
