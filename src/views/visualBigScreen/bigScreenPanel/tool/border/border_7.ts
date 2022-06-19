import { Components } from '../commomSetting';
import { borderConfig, bgConfig } from './commonBorderSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '边框7',
  },
];

borderConfig[0].list[0].value = '#235fa7';
borderConfig[0].list[1].value = '#4fd2dd';

const animationConfig = [
  {
    name: '动画设置',
    field: 'animationSetting',
    list: [
      {
        field: 'dur',
        component: Components.INPUTNUMBER,
        label: '速度(s)',
        required: true,
        value: 3,
      },
      {
        field: 'reverse',
        component: Components.SWITCH,
        label: '反向',
        required: true,
        value: false,
      },
    ],
  },
];
export const border_7 = {
  code: 'Border_7',
  type: 'chart',
  label: '边框7',
  icon: 'material-symbols:featured-play-list-outline',
  option: {
    attr: [...basicInfo, ...borderConfig, ...animationConfig, ...bgConfig],
    // 坐标
    position: {
      left: 0,
      top: 0,
      width: 500,
      height: 350,
    },
  },
};
