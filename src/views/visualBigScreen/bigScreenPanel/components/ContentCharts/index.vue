<template>
  <div class="flex items-center h-[64px] justify-around header">
    <Tooltip>
      <template #title>图表</template>
      <Icon
        icon="typcn:chart-bar-outline"
        class="cursor-pointer"
        :class="isComponent ? 'icon-class' : 'normal-icon'"
        :color="isComponent ? '#51d6a9' : '#fff'"
        :size="20"
        @click="isComponent = true"
      />
    </Tooltip>
    <Tooltip>
      <template #title>图层</template>
      <Icon
        icon="bx:layer"
        class="cursor-pointer"
        :color="!isComponent ? '#51d6a9' : '#fff'"
        :size="20"
        :class="!isComponent ? 'icon-class' : 'normal-icon'"
        @click="isComponent = false"
      />
    </Tooltip>
  </div>
  <ScrollContainer>
    <Charts v-if="isComponent" />
    <Layers v-else />
  </ScrollContainer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  // component
  import { Icon } from '/@/components/Icon';
  import { Tooltip } from 'ant-design-vue';
  import { ScrollContainer } from '/@/components/Container';
  import Charts from './components/Charts.vue';
  import Layers from './components/Layers.vue';

  const isComponent = ref(true);
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
