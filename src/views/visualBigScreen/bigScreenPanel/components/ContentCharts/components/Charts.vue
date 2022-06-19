<template>
  <Collapse expand-icon-position="right">
    <CollapsePanel v-for="item in components" :key="item.code" class="bg-[#282828] text-[#fff]">
      <template #header>
        <Icon :icon="item.icon" color="#fff" size="18" class="mr-4" />{{ item.name }}
      </template>
      <div
        v-for="child in item.children"
        :key="child.code"
        draggable="true"
        @dragstart.stop="dragStartHandle(child)"
        @dragend.stop="dragendHandle"
        class="bg-[#232324] w-full h-[50px] leading-[50px] text-center text-[#fff] cursor-pointer"
      >
        <div class="hover:bg-[#313132] hover:rounded-[20px]">
          <Icon :icon="child.icon" />
          {{ child.label }}</div
        >
      </div>
    </CollapsePanel>
  </Collapse>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  // component
  import { Icon } from '/@/components/Icon';
  import { Collapse } from 'ant-design-vue';
  import { barChartTool, borderTool, scrollTool } from '../../../tool/main';
  // Store
  import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';
  import { useChartViewStoreWithOut } from '/@/store/modules/chartView';
  // Types
  import { ChartItem } from '../../../type/chartCommonType';

  const chartEditStore = useChartEditStoreWithOut();
  const chartViewStore = useChartViewStoreWithOut();

  const CollapsePanel = Collapse.Panel;

  // 初始化组件
  const components = ref([
    {
      name: '柱状图',
      code: 'bar',
      icon: 'ant-design:bar-chart-outlined',
      children: barChartTool,
    },
    {
      name: '折线图',
      code: 'line',
      icon: 'carbon:chart-line',
    },
    {
      name: '饼图',
      code: 'pie',
      icon: 'ant-design:pie-chart-outlined',
    },
    {
      name: '滚动组件',
      code: 'scroll',
      icon: 'material-symbols:calendar-view-day-outline-sharp',
      children: scrollTool,
    },
    {
      name: '边框',
      code: 'border',
      icon: 'material-symbols:rectangle-outline',
      children: borderTool,
    },
  ]);

  // 拖拽处理
  const dragStartHandle = (item: ChartItem) => {
    // 记录此时拖拽的元素
    chartViewStore.setCurrentDragChartInfo(item);
    // 修改状态
    chartEditStore.setEditCanvas('isCreate', true);
  };

  // 拖拽结束
  const dragendHandle = () => {
    chartEditStore.setEditCanvas('isCreate', false);
  };
</script>
<style scoped lang="less">
  ::v-deep .ant-collapse-content-box {
    background-color: transparent;
  }

  ::v-deep .ant-collapse-header {
    color: #fff !important;
  }

  ::v-deep .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
  }

  .ant-collapse > .ant-collapse-item {
    border-bottom: 1px solid #242323;
  }

  .ant-collapse {
    border: none;
  }
</style>
