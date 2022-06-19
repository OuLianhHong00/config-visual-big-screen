import { Components } from '../commomSetting';
import { borderConfig, bgConfig } from './commonBorderSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '边框2',
  },
];

export const border_2 = {
  code: 'Border_2',
  type: 'chart',
  label: '边框2',
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
