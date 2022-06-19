import { FormSchema } from '/@/components/Form/index';

// 位置配置
export const position: FormSchema[] = [
  {
    field: 'left',
    component: 'InputNumber',
    label: '左边距',
    required: true,
    defaultValue: 0,
  },
  {
    field: 'top',
    component: 'InputNumber',
    label: '上边距',
    required: true,
    defaultValue: 0,
  },
  {
    field: 'width',
    component: 'InputNumber',
    label: '宽度',
    required: true,
    defaultValue: 500,
  },
  {
    field: 'height',
    component: 'InputNumber',
    label: '高度',
    required: true,
    defaultValue: 200,
  },
];

// 数据配置
export const dataSource: FormSchema[] = [
  {
    field: 'dataType',
    component: 'RadioButtonGroup',
    label: '数据类型',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '静态数据',
          value: 0,
        },
        {
          label: '动态态数据',
          value: 1,
        },
      ],
    },
  },
  {
    field: 'staticData',
    component: 'Input',
    label: '字段2',
    slot: 'staticData',
    defaultValue: '',
    ifShow: ({ values }) => {
      return values.dataType == 0;
    },
  },
  {
    field: 'dynamicData',
    component: 'Select',
    label: '动态数据源',
    ifShow: ({ values }) => {
      return values.dataType == 1;
    },
    defaultValue: '',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
];
