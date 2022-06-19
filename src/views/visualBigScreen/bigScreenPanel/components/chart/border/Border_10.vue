<template>
  <div class="go-border-box">
    <svg :width="w" :height="h">
      <polygon
        :fill="backgroundColor"
        :points="`
        10, 22 ${w - 22}, 22 ${w - 22}, ${h - 86} ${w - 84}, ${h - 24} 10, ${h - 24}
      `"
      />

      <polyline
        class="bv-bb5-line-1"
        :stroke="colors[0]"
        :points="`8, 5 ${w - 5}, 5 ${w - 5}, ${h - 100}
          ${w - 100}, ${h - 5} 8, ${h - 5} 8, 5`"
      />
      <polyline
        class="bv-bb5-line-2"
        :stroke="colors[1]"
        :points="`3, 5 ${w - 20}, 5 ${w - 20}, ${h - 60}
          ${w - 74}, ${h - 5} 3, ${h - 5} 3, 5`"
      />
      <polyline class="bv-bb5-line-3" :stroke="colors[1]" :points="`50, 13 ${w - 35}, 13`" />
      <polyline class="bv-bb5-line-4" :stroke="colors[1]" :points="`15, 20 ${w - 35}, 20`" />
      <polyline
        class="bv-bb5-line-5"
        :stroke="colors[1]"
        :points="`15, ${h - 20} ${w - 110}, ${h - 20}`"
      />
      <polyline
        class="bv-bb5-line-6"
        :stroke="colors[1]"
        :points="`15, ${h - 13} ${w - 110}, ${h - 13}`"
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
  }
</style>
