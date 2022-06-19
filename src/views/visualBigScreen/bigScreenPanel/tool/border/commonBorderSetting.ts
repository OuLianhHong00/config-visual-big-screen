import { Components } from '../commomSetting';
// 边框颜色
export const borderConfig = [
  {
    label: '边框',
    field: 'borderSetting',
    list: [
      {
        field: 'colorOne',
        component: Components.COLOR,
        label: '外边框',
        value: '#4fd2dd',
      },
      {
        field: 'colorTwo',
        component: Components.COLOR,
        label: '内边框',
        value: '#235fa7',
      },
    ],
  },
];

// 背景色
export const bgConfig = [
  {
    label: '背景',
    field: 'bgSetting',
    list: [
      {
        field: 'color',
        component: Components.COLOR,
        label: '背景色',
        value: '#00000000',
      },
    ],
  },
];
