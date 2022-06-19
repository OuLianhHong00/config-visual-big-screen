<template>
  <div
    class="go-edit-range go-transition"
    :style="rangeStyle"
    @mousedown="mousedownHandleUnStop($event, undefined)"
  >
    <slot></slot>
    <!-- 标尺 -->
    <SketchRule />
    <!-- 拖拽时的遮罩 -->
    <div class="go-edit-range-model" :style="rangeModelStyle"></div>
  </div>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue';
  import { useSizeStyle } from '../../../hooks/useStyle.hook';
  import SketchRule from './SketchRule.vue';
  import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';

  const chartEditStore = useChartEditStoreWithOut();

  const { getEditCanvasConfig, getEditCanvas } = toRefs(chartEditStore);

  const size = computed(() => {
    return {
      width: getEditCanvasConfig.value.width,
      height: getEditCanvasConfig.value.height,
    };
  });

  const rangeStyle = computed(() => {
    // 缩放
    const scale = {
      transform: `scale(${getEditCanvas.value.scale})`,
    };
    // 设置背景色和图片背景
    const background = getEditCanvasConfig.value.background;
    const backgroundImage = getEditCanvasConfig.value.backgroundImage;
    const selectColor = getEditCanvasConfig.value.selectColor;
    const backgroundColor = background ? background : undefined;

    const computedBackground = selectColor
      ? { background: backgroundColor }
      : { background: `url(${backgroundImage}) no-repeat center/100% !important` };

    // @ts-ignore
    return { ...useSizeStyle(size.value), ...computedBackground, ...scale };
  });

  // 模态层
  const rangeModelStyle = computed(() => {
    const dragStyle = getEditCanvas.value.isCreate && { 'z-index': 99999 };
    // @ts-ignore
    return { ...useSizeStyle(size.value), ...dragStyle };
  });

  // * 不拦截默认行为点击
  const mousedownHandleUnStop = (e, item) => {
    if (item) {
      chartEditStore.setTargetSelectChart(item.uuid);
      return;
    }
    chartEditStore.setTargetSelectChart(undefined);
  };
</script>

<style lang="less" scoped>
  .go-edit-range {
    position: relative;
    transform-origin: left top;
    background-size: cover;
    border-color: #373739;
  }
</style>
