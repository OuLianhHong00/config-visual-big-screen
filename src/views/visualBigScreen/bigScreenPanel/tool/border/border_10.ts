import { Components } from '../commomSetting';
import { borderConfig, bgConfig } from './commonBorderSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '边框10',
  },
];

borderConfig[0].list[0].value = '#2862b7';
borderConfig[0].list[1].value = '#2862b7';

export const border_10 = {
  code: 'Border_10',
  type: 'chart',
  label: '边框10',
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
