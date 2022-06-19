import { Components } from '../commomSetting';
import { borderConfig, bgConfig } from './commonBorderSetting';

const basicInfo = [
  {
    field: 'layerName',
    component: Components.INPUT,
    label: '图层名称',
    required: true,
    value: '边框6',
  },
];

borderConfig[0].list[0].value = '#3140ad';
borderConfig[0].list[1].value = '#1089ff';
export const border_6 = {
  code: 'Border_6',
  type: 'chart',
  label: '边框6',
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
