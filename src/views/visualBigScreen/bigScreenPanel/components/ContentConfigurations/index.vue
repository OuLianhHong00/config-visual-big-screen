<template>
  <div class="flex items-center h-[64px] justify-around header">
    <Tooltip>
      <template #title>属性</template>
      <Icon
        icon="clarity:settings-outline-badged"
        class="cursor-pointer"
        :class="isAttr == 1 ? 'icon-class' : 'normal-icon'"
        :color="isAttr == 1 ? '#51d6a9' : '#fff'"
        :size="20"
        @click="() => (isAttr = 1)"
      />
    </Tooltip>
    <Tooltip>
      <template #title>数据</template>
      <Icon
        icon="teenyicons:database-outline"
        class="cursor-pointer"
        :color="isAttr == 2 ? '#51d6a9' : '#fff'"
        :size="20"
        :class="isAttr == 2 ? 'icon-class' : 'normal-icon'"
        v-if="selectTarget?.option?.dataSource"
        @click="() => (isAttr = 2)"
      />
    </Tooltip>
    <Tooltip>
      <template #title>位置</template>
      <Icon
        icon="ep:location-information"
        class="cursor-pointer"
        :color="isAttr == 3 ? '#51d6a9' : '#fff'"
        :size="20"
        :class="isAttr == 3 ? 'icon-class' : 'normal-icon'"
        v-if="selectTarget?.option?.position"
        @click="() => (isAttr = 3)"
      />
    </Tooltip>
  </div>
  <ScrollContainer class="w-full p-4" style="height: calc(100% - 60px)">
    <PositionConfig
      @positionChange="positionChange"
      v-if="isAttr === 3"
      :position="selectTarget?.option?.position || {}"
    />
    <ScreenConfig
      v-if="isAttr === 1 && !selectTarget"
      :config="screenConfigData"
      @screenChange="handleScreenChange"
    />
    <DataSourceConfig v-if="isAttr === 2" :config="selectTarget?.option?.dataSource" />
    <AttrConfig v-if="isAttr === 1 && selectTarget" :config="selectTarget?.option?.attr" />
  </ScrollContainer>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  // component
  import { Icon } from '/@/components/Icon';
  import { Tooltip } from 'ant-design-vue';
  import PositionConfig from './components/PositionConfig.vue';
  import ScreenConfig from './components/ScreenConfig.vue';
  import DataSourceConfig from './components/DataSourceConfig.vue';
  import AttrConfig from './components/AttrConfig.vue';
  import { ScrollContainer } from '/@/components/Container';

  // Store
  import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';
  // Utils
  import { cloneDeep } from 'lodash-es';
  const chartEditStore = useChartEditStoreWithOut();

  const isAttr = ref(1);

  const screenConfigData = computed(() => chartEditStore.getEditCanvasConfig);

  const selectTarget = computed(() => {
    const selectId = chartEditStore.getTargetChart.selectId;
    if (!selectId) return undefined;
    const index = chartEditStore.fetchTargetIndex();
    if (index === -1) return undefined;
    return chartEditStore.componentList[index];
  });

  // 图表位置改变
  const positionChange = (type, value) => {
    const index = chartEditStore.fetchTargetIndex();
    if (selectTarget.value) {
      const newData = cloneDeep(selectTarget.value);
      newData.option.position[type] = value;
      chartEditStore.updateComponentList(index, newData);
    }
  };

  // 大屏设置改变
  const handleScreenChange = (type, value) => {
    chartEditStore.setEditCanvasConfig(type, value);
    chartEditStore.computedScale();
  };
</script>
<style scoped lang="less">
  .icon-class {
    border: 2px solid #51d6a9;
    padding: 2px 8px;
    border-radius: 5px;
  }

  .normal-icon {
    border: 2px solid #fff;
    padding: 2px 8px;
    border-radius: 5px;
  }

  .header {
    background-color: #1e1e1f;
    border-bottom: solid 1px #ffffff17;
  }
</style>
