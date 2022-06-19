<template>
  <Layout class="layout">
    <!-- 组件 -->
    <LayoutSider collapsible>
      <ContentCharts />
    </LayoutSider>
    <Layout>
      <LayoutHeader>
        <ContentHeader />
      </LayoutHeader>
      <LayoutContent>
        <!-- 画布 -->
        <ContentLayers />
      </LayoutContent>
    </Layout>
    <!-- 配置 -->
    <LayoutSider collapsible width="300">
      <ContentConfigurations />
    </LayoutSider>
  </Layout>
  <div
    class="absolute text-[14px] text-[#fff] border-[1px] border-[#fff] bg-[#48484e] w-[122px] rounded-[5px]"
    :style="{ left: mousePosition.x + 'px', top: mousePosition.y + 'px' }"
    v-show="chartEditStore.getRightMenuShow"
  >
    <div @mouseleave="onClickOutSide">
      <div
        v-for="(item, index) in menuOptions"
        :key="index"
        @click="handleMenuSelect(item.key)"
        class="leading-[30px] text-center"
      >
        <div class="cursor-pointer hover:bg-[#ffffffd1] hover:text-[#000]">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  // Components
  import ContentCharts from './components/ContentCharts/index.vue';
  import ContentHeader from './components/ContentHeader/index.vue';
  import ContentLayers from './components/ContentLayers/index.vue';
  import ContentConfigurations from './components/ContentConfigurations/index.vue';
  // Store
  import { useChartViewStoreWithOut } from '/@/store/modules/chartView';
  import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';
  // hooks
  import { useContextMenu } from './hooks/useContextMenu.hook';

  const LayoutHeader = Layout.Header;
  const LayoutContent = Layout.Content;
  const LayoutSider = Layout.Sider;

  // 判断是否新增
  const chartViewStore = useChartViewStoreWithOut();
  const chartEditStore = useChartEditStoreWithOut();
  // 初始化
  chartViewStore.canvasInit(chartEditStore.getEditCanvas);

  const menuOptions = computed(() => chartEditStore.getMenuOptions);

  const { mousePosition, onClickOutSide, handleMenuSelect } = useContextMenu();
</script>
<style scoped lang="less">
  .layout {
    background-image: linear-gradient(120deg, #18181c 0%, #18181c 100%);
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    ::v-deep .ant-layout-sider {
      background-color: #232324;
    }

    ::v-deep .ant-layout-sider-trigger {
      background-color: #1e1e1f;
    }

    ::v-deep .ant-layout-header {
      padding-right: 0;
      background-color: #1e1e1f;
      border-bottom: solid 1px #ffffff17;
    }
  }
</style>
