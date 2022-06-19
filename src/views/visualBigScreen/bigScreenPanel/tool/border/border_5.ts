import { Components } from '../commomSetting';
import { borderConfig, bgConfig } from './commonBorderSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '边框5',
  },
];

borderConfig[0].list[0].value = '#1d48c4';
borderConfig[0].list[1].value = '#d3e1f8';
export const border_5 = {
  code: 'Border_5',
  type: 'chart',
  label: '边框5',
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
