<template>
  <div :style="style">
    <Vue3SeamlessScroll
      :list="list"
      :step="state.step"
      :isScroll="state.isScroll"
      :direction="state.direction"
      :hover="state.hover"
      :limitScrollNum="state.limitScrollNum"
      class="overflow-hidden h-[300px]"
    >
      <div class="h-[50px]" v-for="(item, index) in list" :key="index">
        <div class="flex justify-between">
          <span :style="{ color: state.textColor, fontSize: state.textSize }">{{ item.name }}</span>
          <span :style="{ color: state.textColor, fontSize: state.textSize }">{{
            item.value
          }}</span>
        </div>
        <div class="h-[30px]" :style="{ borderColor: state.barBgColor }">
          <div
            :style="`width: ${item.value / maxValue}%; backgroundColor: ${state.barColor}`"
          ></div>
        </div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
  import { rankList } from '../../../tool/chartStaticData';
  const props = defineProps({
    chartData: {
      type: Object,
      default: () => ({}),
    },
    chartConfig: {
      type: Object,
      default: () => ({}),
    },
    style: {
      type: Object,
      default: () => ({ width: '200px', height: '150px' }),
    },
  });

  const list = ref(rankList);
  const maxValue = ref(100);

  const state = reactive({
    isScroll: true,
    direction: 'up',
    hover: true,
    limitScrollNum: 10,
    step: 5,
    barColor: '#1370fb',
    barBgColor: '#1370fb80',
    textColor: '#ffffff',
    textSize: 14,
  });

  const initList = () => {
    state.isScroll = props.chartConfig.scrollSetting.isScroll;
    state.direction = props.chartConfig.scrollSetting.direction;
    state.hover = props.chartConfig.scrollSetting.hover;
    state.limitScrollNum = props.chartConfig.scrollSetting.limitScrollNum;
    state.step = props.chartConfig.scrollSetting.step;
    state.barColor = props.chartConfig.barSetting.barColor || '#1370fb';
    state.barBgColor = props.chartConfig.barSetting.barBgColor || '#1370fb80';
    state.textColor = props.chartConfig.barSetting.textColor || '#fff';
    state.textSize = props.chartConfig.barSetting.textSize || 14;

    console.log('rank', rankList, list.value);
  };

  watch(
    () => props.chartConfig,
    () => {
      initList();
    },
    {
      deep: true,
      immediate: true,
    },
  );

  watch(
    () => props.chartData,
    () => {
      if (props.chartData && props.chartData?.dataType === 1) {
        // 静态数据
        list.value = props.chartData?.staticData || rankList;
      }
      maxValue.value = Math.max(...list.value.map((item) => item.value)) || 1;
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>
