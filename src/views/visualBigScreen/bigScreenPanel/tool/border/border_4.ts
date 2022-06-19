import { Components } from '../commomSetting';
import { borderConfig, bgConfig } from './commonBorderSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '边框3',
  },
];

borderConfig[0].list[0].value = '#8aaafb';
borderConfig[0].list[1].value = '#1f33a2';

const titleConfig = [
  {
    name: '标题设置',
    field: 'titleSetting',
    list: [
      {
        field: 'borderTitle',
        component: Components.INPUT,
        label: '标题',
        required: true,
        value: '边框4',
      },
      {
        field: 'borderTitleWidth',
        component: Components.INPUTNUMBER,
        label: '标题宽',
        required: true,
        value: 250,
      },
      {
        field: 'borderTitleHeight',
        component: Components.INPUTNUMBER,
        label: '标题长',
        required: true,
        value: 32,
      },
      {
        field: 'borderTitleSize',
        component: Components.INPUTNUMBER,
        label: '字体大小',
        required: true,
        value: 18,
      },
      {
        field: 'borderTitleColor',
        component: Components.COLOR,
        label: '字体颜色',
        required: true,
        value: '#ffffff',
      },
    ],
  },
];
export const border_4 = {
  code: 'Border_4',
  type: 'chart',
  label: '边框4',
  icon: 'material-symbols:featured-play-list-outline',
  option: {
    attr: [...basicInfo, ...titleConfig, ...borderConfig, ...bgConfig],
    // 坐标
    position: {
      left: 0,
      top: 0,
      width: 500,
      height: 350,
    },
  },
};
