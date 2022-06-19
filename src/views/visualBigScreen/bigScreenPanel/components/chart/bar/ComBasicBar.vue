<template>
  <div ref="chartRef" :style="style"></div>
</template>
<script lang="ts" setup>
  import { ref, Ref, reactive, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  // Utils
  import { isArray } from '/@/utils/is';
  // Types
  import type { EChartsOption } from 'echarts';
  import { barData } from '../../../tool/chartStaticData';

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
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, resize } = useECharts(chartRef as Ref<HTMLDivElement>);
  const option = reactive({
    animation: false,
    color: ['#1E90FF', '#00BFFF', '	#00FFFF', '	#FFD700'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#333',
        },
      },
      textStyle: {
        color: '#FFD700',
        fontSize: 14,
      },
    },
    grid: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
    legend: {
      show: true,
      orient: 'horizontal',
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: {
      type: 'category',
      show: true,
      name: 'x轴',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#fff',
          width: 1,
        },
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#fff', '#808080'],
          type: 'dashed',
        },
      },
      data: ['一月', '二月', '三月', '四月'],
      nameRotate: 0,
      nameTextStyle: {
        color: '#FFD700',
        fontWeight: 'normal',
        fontSize: 14,
        align: 'center',
        // lineHeight: 56,
      },
    },
    yAxis: {
      type: 'value',
      show: true,
      name: 'Y轴',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#fff',
          width: 1,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#fff', '#808080'],
          type: 'dashed',
        },
      },
      data: [],
      nameRotate: 0,
      nameTextStyle: {
        color: '#FFD700',
        fontWeight: 'normal',
        fontSize: 14,
        align: 'center',
        // lineHeight: 56,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '数学',
        data: [89, 99, 92, 70],
        type: 'bar',
        barGap: '0%',
        barWidth: 15,
        barMinHeight: 0,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: true,
          distance: 5,
          color: '#fff',
        },
      },
    ],
  });

  watch(
    () => props.style,
    () => resize(),
    { deep: true },
  );

  // 数据初始化
  const initData = () => {
    let xData = [];
    let series: any[] = [];
    if (props.chartData && props.chartData.dataType === 1) {
      // 静态数据
      if (props.chartData?.staticData?.xData && isArray(props.chartData?.staticData?.xData)) {
        xData = props.chartData?.staticData.xData;
        option.xAxis.data = xData;
      } else {
        option.xAxis.data = barData.xData;
      }
      let seriesData: { name: string; data: any[] }[] = [];
      if (props.chartData?.staticData?.series && isArray(props.chartData?.staticData?.series)) {
        seriesData = props.chartData?.staticData?.series;
      } else {
        seriesData = barData.series;
      }
      seriesData.forEach((element) => {
        series.push({
          name: element.name,
          data: element.data,
          type: 'bar',
          barGap: '0%',
          barWidth: props.chartConfig?.barSetting?.width || 10,
          barMinHeight: props.chartConfig?.barSetting?.minHeight || 10,
          itemStyle: {
            borderRadius: props.chartConfig?.barSetting?.radius || 0,
          },
          label: {
            show: props.chartConfig?.labelSetting?.show,
            position: props.chartConfig?.labelSetting?.position || 'top',
            color: props.chartConfig?.labelSetting?.labelColor || '#fff',
          },
        });
      });
      if (series.length > 0) {
        option.series = series;
      }
    } else {
      // 动态数据
    }
  };

  // 其他设置
  const barSetting = () => {
    // 自定义配色
    option.color = props.chartConfig?.colorSetting?.colorList;
    // 边距
    option.grid = {
      top: props.chartConfig.gridSetting.top || 30,
      bottom: props.chartConfig.gridSetting.bottom || 30,
      left: props.chartConfig.gridSetting.left || 30,
      right: props.chartConfig.gridSetting.right || 30,
    };
    // tooltip
    option.tooltip.textStyle.color = props.chartConfig?.tooltipSetting?.textColor || '#ffffff';
    option.tooltip.textStyle.fontSize = props.chartConfig?.tooltipSetting?.textSize || '#ffffff';
    // 图例
    option.legend.show = props.chartConfig?.legendSetting?.show;
    option.legend.orient = props.chartConfig?.legendSetting?.orient || 'horizontal';
    option.legend.textStyle.color = props.chartConfig?.legendSetting?.textColor || '#ffffff';
    // x轴
    option.xAxis.show = props.chartConfig?.xSetting?.show;
    option.xAxis.axisLine.show = props.chartConfig?.xSetting?.axisLineShow;
    option.xAxis.axisLine.lineStyle.color = props.chartConfig?.xSetting?.lineColor || '#ffffff';
    option.xAxis.axisLine.lineStyle.width = props.chartConfig?.xSetting?.lineWidth || 1;
    option.xAxis.axisTick.show = props.chartConfig?.xSetting?.axisTickShow;
    option.xAxis.nameRotate = props.chartConfig?.xSetting?.nameRotate || 0;
    option.xAxis.nameTextStyle.color = props.chartConfig?.xSetting?.textColor || '#ffffff';
    option.xAxis.name = props.chartConfig?.xSetting?.name;
    option.xAxis.splitLine.show = props.chartConfig?.xSetting?.splitLineShow;

    // y轴
    option.yAxis.show = props.chartConfig?.YSetting?.show;
    option.yAxis.axisLine.show = props.chartConfig?.YSetting?.axisLineShow;
    option.yAxis.axisLine.lineStyle.color = props.chartConfig?.YSetting?.lineColor || '#ffffff';
    option.yAxis.axisLine.lineStyle.width = props.chartConfig?.YSetting?.lineWidth || 1;
    option.yAxis.axisTick.show = props.chartConfig?.YSetting?.axisTickShow;
    option.yAxis.nameRotate = props.chartConfig?.YSetting?.nameRotate || 0;
    option.yAxis.nameTextStyle.color = props.chartConfig?.YSetting?.textColor || '#ffffff';
    option.yAxis.name = props.chartConfig?.YSetting?.name;
    option.yAxis.splitLine.show = props.chartConfig?.YSetting?.splitLineShow;
  };

  const initCharts = () => {
    initData();
    barSetting();
    setOptions(option as unknown as EChartsOption, false);
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
