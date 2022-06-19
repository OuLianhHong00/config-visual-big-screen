<template>
  <div class="go-edit-bottom">
    <div class="bottom-ri">
      <!-- 缩放比例 -->
      <Select
        :disabled="lockScale"
        class="scale-btn"
        v-model:value="filterValue"
        size="small"
        :options="filterOptions"
        @update:value="selectHandle"
      />

      <!-- 拖动 -->
      <Slider
        class="scale-slider"
        v-model:value="sliderValue"
        :default-value="50"
        :min="10"
        :max="200"
        :step="5"
        :tipFormatter="sliderFormatTooltip"
        :disabled="lockScale"
        :marks="sliderMaks"
        @update:value="sliderHandle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, toRefs, watchEffect } from 'vue';
  // Components
  import { Select, Slider } from 'ant-design-vue';
  import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';

  const chartEditStore = useChartEditStoreWithOut();
  const { lockScale, scale } = toRefs(chartEditStore.getEditCanvas);

  // 缩放选项
  let filterOptions = [
    {
      label: '200%',
      value: 200,
    },
    {
      label: '150%',
      value: 150,
    },
    {
      label: '100%',
      value: 100,
    },
    {
      label: '50%',
      value: 50,
    },
    {
      label: '自适应',
      value: 0,
    },
  ];

  // 选择值
  const filterValue = ref('');

  // 用户自选择
  const selectHandle = (v: number) => {
    if (v === 0) {
      chartEditStore.computedScale();
      return;
    }
    chartEditStore.setScale(v / 100);
  };

  // 拖动
  const sliderValue = ref(100);

  // 拖动格式化
  const sliderFormatTooltip = (v: string) => `${v}%`;

  // 拖动处理
  const sliderHandle = (v: number) => {
    chartEditStore.setScale(v / 100);
  };

  const sliderMaks = reactive({
    100: '',
  });

  // 监听 scale 变化
  watchEffect(() => {
    const value = (scale.value * 100).toFixed(0);
    filterValue.value = `${value}%`;
    sliderValue.value = parseInt(value);
  });
</script>

<style lang="less" scoped>
  .go-edit-bottom {
    width: 100%;
    min-width: 500px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .bottom-ri {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .scale-btn {
        font-size: 12px;
      }

      .scale-slider {
        position: relative;
        top: 5px;
        width: 200px;
      }
    }
  }
</style>
