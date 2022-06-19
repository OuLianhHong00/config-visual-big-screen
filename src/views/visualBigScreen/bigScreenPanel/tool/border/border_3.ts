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

borderConfig[0].list[0].value = '#6586ec';
borderConfig[0].list[1].value = '#2cf7fe';
export const border_3 = {
  code: 'Border_3',
  type: 'chart',
  label: '边框3',
  icon: 'material-symbols:featured-play-list-outline',
  option: {
    attr: [...basicInfo, ...borderConfig, ...bgConfig],
    // 坐标
    position: {
      left: 0,
      top: 0,
      width: 500,
      height: 350,
    },
  },
};
