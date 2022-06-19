import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/visualBigScreen',
  name: 'VisualBigScreen',
  component: LAYOUT,
  redirect: '/visualBigScreen/management',
  meta: {
    orderNo: 10,
    icon: 'ion:bar-chart-outline',
    title: t('routes.visualBigScreen.visualBigScreen'),
  },
  children: [
    {
      path: 'management',
      name: 'Management',
      component: () => import('/@/views/visualBigScreen/bigScreen/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.visualBigScreen.bigScreen'),
      },
    },
    {
      path: 'dataSource',
      name: 'DataSource',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.visualBigScreen.dataSource'),
      },
    },
    // {
    //   path: 'operatorPanel',
    //   name: 'operatorPanel',
    //   meta: {
    //     title: '操作面板',
    //     hideMenu: true,
    //   },
    //   component: () => import('/@/views/visualBigScreen/bigScreenPanel/index.vue'),
    // },
  ],
};

export default dashboard;
