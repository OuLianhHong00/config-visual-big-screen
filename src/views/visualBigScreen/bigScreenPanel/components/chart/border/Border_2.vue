<template>
  <div class="go-border-box">
    <svg :width="w" :height="h">
      <path
        :fill="backgroundColor"
        :stroke="colors[0]"
        :d="`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${w - 20} 10 L ${w - 5} 25
          L ${w - 5} ${h - 5} L 20 ${h - 5}
          L 5 ${h - 20} L 5 20
        `"
      />

      <path
        fill="transparent"
        stroke-w="3"
        stroke-linecap="round"
        stroke-dasharray="10, 5"
        :stroke="colors[0]"
        :d="`M 16 9 L 61 9`"
      />

      <path fill="transparent" :stroke="colors[1]" :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`" />

      <path
        fill="transparent"
        :stroke="colors[1]"
        :d="`M ${w - 5} ${h - 30} L ${w - 5} ${h - 5} L ${w - 30} ${h - 5}`"
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
