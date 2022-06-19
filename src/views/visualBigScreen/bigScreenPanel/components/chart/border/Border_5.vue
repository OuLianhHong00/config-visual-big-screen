<template>
  <div class="go-border-box" :style="`box-shadow: inset 0 0 25px 3px ${colors[0]}`">
    <svg :width="w" :height="h">
      <polygon
        :fill="backgroundColor"
        :points="`
        4, 0 ${w - 4}, 0 ${w}, 4 ${w}, ${h - 4} ${w - 4}, ${h}
        4, ${h} 0, ${h - 4} 0, 4
      `"
      />
    </svg>

    <svg :width="w" :height="h" :key="item" v-for="item in border" :class="`border-item ${item}`">
      <polygon :fill="colors[1]" points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
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
  const border = ['left-top', 'right-top', 'left-bottom', 'right-bottom'];

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
    .border-item {
      position: absolute;
      top: 0;
      left: 0;
    }
    .right-top {
      right: 0;
      transform: rotateY(180deg);
    }
    .left-bottom {
      bottom: 0;
      transform: rotateX(180deg);
    }
    .right-bottom {
      right: 0;
      bottom: 0;
      transform: rotateX(180deg) rotateY(180deg);
    }
  }
</style>
