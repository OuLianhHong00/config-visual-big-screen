import { defineAsyncComponent } from 'vue';
import { com_basic_bar } from './chart/com_basic_bar';
import { com_stack_bar } from './chart/com_stack_bar';
import { com_hori_bar } from './chart/com_hori_bar';
import { com_bar_line } from './chart/com_bar_line';

export const barChartTool = [com_basic_bar, com_stack_bar, com_hori_bar, com_bar_line];

import { border_1 } from './border/border_1';
import { border_2 } from './border/border_2';
import { border_3 } from './border/border_3';
import { border_4 } from './border/border_4';
import { border_5 } from './border/border_5';
import { border_6 } from './border/border_6';
import { border_7 } from './border/border_7';
import { border_8 } from './border/border_8';
import { border_9 } from './border/border_9';
import { border_10 } from './border/border_10';

export const borderTool = [
  border_1,
  border_2,
  border_3,
  border_4,
  border_5,
  border_6,
  border_7,
  border_8,
  border_9,
  border_10,
];

import { rank_list } from './scroll/rank_list';

export const scrollTool = [rank_list];

// 引入组件
const components = new Map<string, any>();
components.set(
  'ComBasicBar',
  defineAsyncComponent(() => import('../components/chart/bar/ComBasicBar.vue')),
);
components.set(
  'ComStackBar',
  defineAsyncComponent(() => import('../components/chart/bar/ComStackBar.vue')),
);
components.set(
  'ComHoriBar',
  defineAsyncComponent(() => import('../components/chart/bar/ComHoriBar.vue')),
);
components.set(
  'ComBarLine',
  defineAsyncComponent(() => import('../components/chart/bar/ComBarLine.vue')),
);
components.set(
  'Border_1',
  defineAsyncComponent(() => import('../components/chart/border/Border_1.vue')),
);
components.set(
  'Border_2',
  defineAsyncComponent(() => import('../components/chart/border/Border_2.vue')),
);
components.set(
  'Border_3',
  defineAsyncComponent(() => import('../components/chart/border/Border_3.vue')),
);
components.set(
  'Border_4',
  defineAsyncComponent(() => import('../components/chart/border/Border_4.vue')),
);
components.set(
  'Border_5',
  defineAsyncComponent(() => import('../components/chart/border/Border_5.vue')),
);
components.set(
  'Border_6',
  defineAsyncComponent(() => import('../components/chart/border/Border_6.vue')),
);
components.set(
  'Border_7',
  defineAsyncComponent(() => import('../components/chart/border/Border_7.vue')),
);
components.set(
  'Border_8',
  defineAsyncComponent(() => import('../components/chart/border/Border_8.vue')),
);
components.set(
  'Border_9',
  defineAsyncComponent(() => import('../components/chart/border/Border_9.vue')),
);
components.set(
  'Border_10',
  defineAsyncComponent(() => import('../components/chart/border/Border_10.vue')),
);
// 滚动组件
components.set(
  'RankList',
  defineAsyncComponent(() => import('../components/chart/scroll/RankList.vue')),
);
export default components;
