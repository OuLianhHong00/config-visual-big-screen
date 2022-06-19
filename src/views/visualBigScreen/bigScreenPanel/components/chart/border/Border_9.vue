<template>
  <div class="go-border-box">
    <svg class="bv-border-svg-container" :width="w" :height="h">
      <polygon
        :fill="backgroundColor"
        :points="`
        23, 23 ${w - 24}, 23 ${w - 24}, ${h - 24} 23, ${h - 24}
      `"
      />

      <polyline
        class="go-border-line-1"
        :stroke="colors[0]"
        :points="`4, 4 ${w - 22} ,4 ${w - 22}, ${h - 22} 4, ${h - 22} 4, 4`"
      />
      <polyline
        class="go-border-line-3"
        :stroke="colors[1]"
        :points="`10, 10 ${w - 16}, 10 ${w - 16}, ${h - 16} 10, ${h - 16} 10, 10`"
      />
      <polyline
        class="go-border-line-3"
        :stroke="colors[1]"
        :points="`16, 16 ${w - 10}, 16 ${w - 10}, ${h - 10} 16, ${h - 10} 16, 16`"
      />
      <polyline
        class="go-border-line-3"
        :stroke="colors[1]"
        :points="`22, 22 ${w - 4}, 22 ${w - 4}, ${h - 4} 22, ${h - 4} 22, 22`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { watch, ref, computed } from 'vue';

  const props = defineProps({
    chartConfig: {
      type: Object,
      default: () => ({}),
    },
    style: {
      type: Object,
      default: () => ({ width: '200px', height: '150px' }),
    },
  });

  let w = computed(() => {
    if (props.style.width) {
      return props.style.width.substr(0, props.style.width.length - 2);
    }
    return 300;
  });
  let h = computed(() => {
    if (props.style.height) {
      return props.style.height.substr(0, props.style.height.length - 2);
    }
    return 200;
  });
  let colors = ref();
  const backgroundColor = ref();

  const initCharts = () => {
    colors.value = [
      props.chartConfig.borderSetting.colorOne,
      props.chartConfig.borderSetting.colorTwo,
    ];
    backgroundColor.value = props.chartConfig.bgSetting.color;
  };

  watch(
    () => props.chartConfig,
    () => {
      initCharts();
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style lang="scss" scoped>
  .go-border-box {
    polyline {
      fill: none;
    }
    .go-line-line-1 {
      stroke-width: 1;
    }
    .go-line-line-3 {
      stroke-width: 3;
    }
  }
</style>
