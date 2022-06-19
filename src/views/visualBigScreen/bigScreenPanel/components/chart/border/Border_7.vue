<template>
  <div class="go-border-box">
    <svg :width="w" :height="h">
      <defs>
        <path :id="path" :d="pathD" fill="transparent" />
        <radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <mask :id="mask">
          <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
            <animateMotion :dur="`${dur}s`" :path="pathD" rotate="auto" repeatCount="indefinite" />
          </circle>
        </mask>
      </defs>

      <polygon :fill="backgroundColor" :points="`5, 5 ${w - 5}, 5 ${w - 5} ${h - 5} 5, ${h - 5}`" />

      <use :stroke="colors[0]" stroke-width="1" :xlink:href="`#${path}`" />

      <use :stroke="colors[1]" stroke-width="3" :xlink:href="`#${path}`" :mask="`url(#${mask})`">
        <animate
          attributeName="stroke-dasharray"
          :from="`0, ${length}`"
          :to="`${length}, 0`"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </use>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { watch, ref, computed } from 'vue';
  import { getUUID } from '../../../utils/commonUtils';

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

  const path = `border-box-08-path-${getUUID()}`;
  const gradient = `border-box-08-gradient-${getUUID()}`;
  const mask = `border-box-08-mask-${getUUID()}`;

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

  let colors = ref(['#235fa7', '#4fd2dd']);
  const backgroundColor = ref('#00000000');
  let dur = ref(3);
  let reverse = ref(false);

  const length = computed(() => {
    return (w.value + h.value - 5) * 2;
  });

  const pathD = computed(() => {
    if (reverse.value)
      return `M 2.5, 2.5 L 2.5, ${h.value - 2.5} L ${w.value - 2.5}, ${h.value - 2.5} L ${
        w.value - 2.5
      }, 2.5 L 2.5, 2.5`;
    return `M2.5, 2.5 L${w.value - 2.5}, 2.5 L${w.value - 2.5}, ${h.value - 2.5} L2.5, ${
      h.value - 2.5
    } L2.5, 2.5`;
  });

  const initCharts = () => {
    colors.value = [
      props.chartConfig.borderSetting.colorOne,
      props.chartConfig.borderSetting.colorTwo,
    ];
    backgroundColor.value = props.chartConfig.bgSetting.color;
    dur.value = props.chartConfig.animationSetting.dur;
    reverse.value = props.chartConfig.animationSetting.reverse;
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
