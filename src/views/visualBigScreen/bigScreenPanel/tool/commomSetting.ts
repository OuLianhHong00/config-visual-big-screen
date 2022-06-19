export const Components = {
  INPUT: 'Input',
  SELECT: 'Select',
  INPUTNUMBER: 'InputNumber',
  RADIO: 'Radio',
  CHECKBOX: 'Checkbox',
  SLIDER: 'Slider',
  SWITCH: 'Switch',
  UPLOAD: 'Upload',
  COLOR: 'Color',
  CONFIGCOLOR: 'ConfigColor',
};
export const textSetting = [
  {
    field: 'textColor',
    component: Components.COLOR,
    label: '字体颜色',
    required: false,
    value: '#ffffff',
  },
  {
    field: 'TextFontWeight',
    component: Components.SELECT,
    label: '字体粗细',
    required: false,
    value: 'normal',
    options: [
      { value: 'normal', label: '正常' },
      { value: 'bold', label: '粗体' },
      { value: 'bolder', label: '特粗体' },
      { value: 'lighter', label: '细体' },
    ],
  },
  {
    field: 'textFontSize',
    component: Components.INPUTNUMBER,
    label: '字体大小',
    required: false,
    value: 14,
  },
  {
    field: 'textAlign',
    component: Components.SELECT,
    label: '字体位置',
    required: false,
    value: 'center',
    options: [
      { value: 'center', label: '居中' },
      { value: 'left', label: '左对齐' },
      { value: 'right', label: '右对齐' },
    ],
  },
  {
    field: 'textLineHeight',
    component: Components.INPUTNUMBER,
    label: '字体行高',
    required: false,
  },
];

// 图表离容器的距离
export const chartGrid = [
  {
    label: '边距设置',
    field: 'gridSetting',
    list: [
      {
        field: 'left',
        component: Components.SLIDER,
        label: '左边距',
        placeholder: '数字或1%',
        value: 50,
        max: 100,
        min: 10,
      },
      {
        field: 'right',
        component: Components.SLIDER,
        label: '右边距',
        placeholder: '数字或1%',
        value: 50,
        max: 100,
        min: 10,
      },
      {
        field: 'top',
        component: Components.SLIDER,
        label: '上边距',
        placeholder: '数字或1%',
        value: 50,
        max: 100,
        min: 10,
      },
      {
        field: 'bottom',
        component: Components.SLIDER,
        label: '下边距',
        placeholder: '数字或1%',
        value: 40,
        max: 100,
        min: 10,
      },
    ],
  },
];

// x轴设置
export const chartXConfig = [
  {
    label: 'X轴设置',
    field: 'xSetting',
    list: [
      {
        field: 'show',
        component: Components.SWITCH,
        label: '是否显示',
        placeholder: '',
        value: true,
      },
      {
        field: 'lineColor',
        component: Components.COLOR,
        label: '轴颜色',
        value: '#ffffff',
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
        field: 'name',
        component: Components.INPUT,
        label: '坐标轴名称',
        value: 'X轴',
      },
      {
        field: 'textColor',
        component: Components.COLOR,
        label: '字体颜色',
        value: '#ffffff',
      },
      {
        field: 'nameRotate',
        component: Components.SLIDER,
        label: '名称旋转',
        value: 0,
        max: 180,
        min: 0,
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

// Y轴设置
export const chartYConfig = [
  {
    label: 'Y轴设置',
    field: 'YSetting',
    list: [
      {
        field: 'show',
        component: Components.SWITCH,
        label: '是否显示',
        placeholder: '',
        value: true,
      },
      {
        field: 'lineColor',
        component: Components.COLOR,
        label: '轴颜色',
        value: '#ffffff',
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
        field: 'name',
        component: Components.INPUT,
        label: '坐标轴名称',
        value: 'Y轴',
      },
      {
        field: 'textColor',
        component: Components.COLOR,
        label: '字体颜色',
        value: '#ffffff',
      },
      {
        field: 'nameRotate',
        component: Components.SLIDER,
        label: '名称旋转',
        value: 0,
        max: 180,
        min: 0,
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

// 图例设置
export const legendConfig = [
  {
    label: '图例设置',
    field: 'legendSetting',
    list: [
      {
        field: 'show',
        component: Components.SWITCH,
        label: '是否显示',
        placeholder: '',
        value: true,
      },
      {
        field: 'orient',
        component: Components.SELECT,
        label: '图例朝向',
        value: 'horizontal',
        options: [
          { value: 'horizontal', label: '水平' },
          { value: 'vertical', label: '竖直' },
        ],
      },
      {
        field: 'textColor',
        component: Components.COLOR,
        label: '字体颜色',
        required: false,
        value: '#ffffff',
      },
    ],
  },
];

// 图形toolTip
export const tooltipConfig = [
  {
    label: '图表提示',
    field: 'tooltipSetting',
    list: [
      {
        field: 'textColor',
        component: Components.COLOR,
        label: '字体颜色',
        required: false,
        value: '#ffffff',
      },
      {
        field: 'textSize',
        component: Components.INPUTNUMBER,
        label: '字体大小',
        required: false,
        value: 14,
      },
    ],
  },
];

// 自定义配色
export const colorConfig = [
  {
    label: '自定义配色',
    field: 'colorSetting',
    list: [
      {
        field: 'colorList',
        component: Components.CONFIGCOLOR,
        label: '图表颜色',
        value: ['#0069d1', '#009dd6', '	#00FFFF', '	#FFD700'],
      },
    ],
  },
];

// 柱状图数值设置
export const barLabelConfig = [
  {
    label: '数值设置',
    field: 'labelSetting',
    list: [
      {
        field: 'show',
        component: Components.SWITCH,
        label: '是否显示',
        placeholder: '',
        value: true,
      },
      {
        field: 'position',
        component: Components.SELECT,
        label: '位置',
        placeholder: '',
        options: [
          { value: 'insideBottom', label: '下' },
          { value: 'top', label: '上' },
          { value: 'inside', label: '中' },
        ],
        value: 'top',
      },
      {
        field: 'labelColor',
        component: Components.COLOR,
        label: '文字颜色',
        placeholder: '',
        value: '#ffffff',
      },
    ],
  },
];

// 折线设置
export const lineConfig = [
  {
    label: '折线设置',
    field: 'lineSetting',
    list: [
      {
        field: 'showSymbol',
        component: Components.SWITCH,
        label: '标记点',
        placeholder: '',
        value: true,
      },
      {
        field: 'symbolSize',
        component: Components.SLIDER,
        label: '点大小',
        value: 5,
        max: 20,
        min: 2,
      },
      {
        field: 'symbol',
        component: Components.SELECT,
        label: '点形状',
        placeholder: '',
        options: [
          { value: 'circle', label: '圆形' },
          { value: 'roundRect', label: '方形' },
          { value: 'triangle', label: '三角形' },
          { value: 'pin', label: '坐标形' },
          { value: 'none', label: '无' },
        ],
        value: 'circle',
      },
      {
        field: 'smooth',
        component: Components.SWITCH,
        label: '平滑曲线',
        placeholder: '',
        value: true,
      },
      {
        field: 'areaOpcity',
        component: Components.SLIDER,
        label: '面积厚度',
        value: 0,
        min: 0,
        max: 1,
        step: 0.1,
      },
      {
        field: 'lineWidth',
        component: Components.SLIDER,
        label: '线宽',
        value: 2,
        max: 10,
        min: 1,
        step: 1,
      },
      {
        field: 'lineType',
        component: Components.SELECT,
        label: '线类型',
        options: [
          { value: 'solid', label: '实线' },
          { value: 'dashed', label: '虚线' },
          { value: 'dotted', label: '点线' },
        ],
        value: 'solid',
      },
    ],
  },
];

// 折线数值设置
export const lineLabelConfig = [
  {
    label: '数值设置',
    field: 'lineLabelSetting',
    list: [
      {
        field: 'show',
        component: Components.SWITCH,
        label: '是否显示',
        placeholder: '',
        value: true,
      },
      {
        field: 'position',
        component: Components.SELECT,
        label: '位置',
        placeholder: '',
        options: [
          { value: 'insideBottom', label: '下' },
          { value: 'top', label: '上' },
          { value: 'inside', label: '中' },
        ],
        value: 'top',
      },
      {
        field: 'labelColor',
        component: Components.COLOR,
        label: '文字颜色',
        placeholder: '',
        value: '#ffffff',
      },
    ],
  },
];
