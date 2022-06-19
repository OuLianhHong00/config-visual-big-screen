<!-- 图层 -->
<template>
  <ScrollContainer>
    <!-- 图层内容 -->
    <div v-if="reverseList.length === 0">
      <div class="text-center text-[#fff] mt-20">暂无图层~</div>
    </div>
    <div v-else>
      <Draggable
        item-key="id"
        tag="transition-group"
        v-model="reverseList"
        ghostClass="ghost"
        @change="onMoveCallback"
      >
        <template #item="{ element }">
          <div
            @mousedown="mousedownHandle(element)"
            @mouseenter="mouseenterHandle(element)"
            @mouseleave="mouseleaveHandle"
            @contextmenu="handleContextMenu($event, element)"
          >
            <div
              class="relative h-[50px] leading-[52px] cursor-pointer text-center text-[#fff]"
              :class="{ hover: hover == element.uuid, select: select == element.uuid }"
            >
              {{ element.option?.attr[0]?.value || '图层' }}</div
            >
          </div>
        </template>
      </Draggable>
    </div>
  </ScrollContainer>
</template>

<script setup lang="ts">
  import { computed, toRaw } from 'vue';
  // Components
  import { ScrollContainer } from '/@/components/Container';

  import Draggable from 'vuedraggable';
  import { cloneDeep } from 'lodash-es';
  import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';
  import { useContextMenu } from '../../../hooks/useContextMenu.hook';
  // Types
  import { ChartItem } from '../../../type/chartCommonType';

  const chartEditStore = useChartEditStoreWithOut();

  const { handleContextMenu } = useContextMenu();

  // 逆序展示
  const reverseList = computed(() => {
    const list: ChartItem[] = cloneDeep(chartEditStore.getComponentList);
    return list.reverse();
  });

  // 移动结束处理
  const onMoveCallback = (val: any) => {
    const { oldIndex, newIndex } = val.moved;
    const moveTarget = toRaw(val.moved.element);
    if (newIndex - oldIndex > 0) {
      // 从上往下
      chartEditStore.getComponentList.splice(-(oldIndex + 1), 1);
      chartEditStore.getComponentList.splice(-newIndex, 0, moveTarget);
    } else {
      // 从下往上
      chartEditStore.getComponentList.splice(-(oldIndex + 1), 1);
      if (newIndex === 0) {
        chartEditStore.getComponentList.push(moveTarget);
      } else {
        chartEditStore.getComponentList.splice(-newIndex, 0, moveTarget);
      }
    }
  };

  // 点击事件
  const mousedownHandle = (item: ChartItem) => {
    chartEditStore.setTargetSelectChart(item.uuid);
  };

  // 进入事件
  const mouseenterHandle = (item: ChartItem) => {
    chartEditStore.setTargetHoverChart(item.uuid);
  };

  // 移出事件
  const mouseleaveHandle = () => {
    chartEditStore.setTargetHoverChart(undefined);
  };

  // 计算当前选中目标
  const select = computed(() => {
    return chartEditStore.getTargetChart.selectId;
  });

  const hover = computed(() => {
    return chartEditStore.getTargetChart.hoverId;
  });
</script>
<style>
  .ghost {
    opacity: 0;
  }

  .hover {
    background-color: #313132;
  }

  .select {
    border: 2px solid #51d6a9;
    border-radius: 20px;
  }
</style>
