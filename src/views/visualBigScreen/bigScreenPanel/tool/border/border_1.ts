import { Components } from '../commomSetting';
import { borderConfig, bgConfig } from './commonBorderSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '边框1',
  },
];

export const border_1 = {
  code: 'Border_1',
  type: 'chart',
  label: '边框1',
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
