<template>
  <div class="h-full flex items-center">
    <!-- 选择图表或图层 -->
    <Tooltip>
      <template #title>后退</template>
      <Icon
        icon="carbon:previous-outline"
        class="mr-10 cursor-pointer ml-[100px]"
        :size="20"
        :class="isBackStack ? 'icon-class' : 'normal-icon'"
        :color="isBackStack ? '#51d6a9' : '#fff'"
        @click="handleHistory('back')"
      />
    </Tooltip>
    <Tooltip>
      <template #title>前进</template>
      <Icon
        icon="carbon:next-outline"
        class="mr-5 cursor-pointer"
        :size="20"
        :class="isForwardStack ? 'icon-class' : 'normal-icon'"
        :color="isForwardStack ? '#51d6a9' : '#fff'"
        @click="handleHistory('go')"
      />
    </Tooltip>
    <Divider
      type="vertical"
      style="
         {
          height: 70%;
          border: 1px solid #fff;
        }
      "
    />
    <Divider type="vertical" />
    <Tooltip>
      <template #title>保存</template>
      <Icon
        icon="ant-design:save-twotone"
        class="mr-10 cursor-pointer normal-icon"
        color="#fff"
        :size="20"
      />
    </Tooltip>
    <Tooltip>
      <template #title>预览</template>
      <Icon
        icon="ic:outline-preview"
        class="mr-5 cursor-pointer normal-icon"
        color="#fff"
        :size="20"
      />
    </Tooltip>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  // Components
  import { Icon } from '/@/components/Icon';
  import { Tooltip, Divider } from 'ant-design-vue';
  //Store
  import { useChartViewStoreWithOut } from '/@/store/modules/chartView';
  import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';

  const chartHistoryStore = useChartViewStoreWithOut();
  const chartEditStore = useChartEditStoreWithOut();

  const isBackStack = computed(() => chartHistoryStore.getBackStack.length > 1);

  const isForwardStack = computed(() => chartHistoryStore.getForwardStack.length > 0);

  const handleHistory = (type) => {
    type == 'go' ? chartEditStore.setForward() : chartEditStore.setBack();
  };
</script>
<style lang="less" scoped>
  .icon-class {
    border: 2px solid #51d6a9;
    padding: 2px 8px;
    border-radius: 5px;
  }

  .normal-icon {
    border: 2px solid #fff;
    padding: 2px 8px;
    border-radius: 5px;
    cursor: not-allowed;
  }
</style>
