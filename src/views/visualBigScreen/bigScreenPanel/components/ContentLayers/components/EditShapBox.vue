<template>
  <div class="go-shape-box">
    <slot></slot>
    <!-- 锚点 -->
    <div
      :class="`shape-point ${point}`"
      v-for="(point, index) in select ? pointList : []"
      :key="index"
      :style="
        usePointStyle(
          point,
          index,
          { width: item.option.position.width, height: item.option.position.height },
          cursorResize,
        )
      "
      @mousedown="handleMousePointHandle($event, point, item.option.position)"
    ></div>

    <!-- 选中 -->
    <div class="shape-modal" :style="useSizeStyle(item.option.position)">
      <div class="shape-modal-select" :class="{ active: select }"></div>
      <div class="shape-modal-change" :class="{ selectActive: select, hoverActive: hover }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';
  import { useSizeStyle, usePointStyle } from '../../../hooks/useStyle.hook';
  import { throttle } from 'lodash-es';

  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  });

  const chartEditStore = useChartEditStoreWithOut();

  // 锚点
  const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'];

  // 光标朝向
  const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se'];

  // 计算当前选中目标
  const hover = computed(() => {
    return props.item.uuid === chartEditStore.getTargetChart.hoverId;
  });

  const select = computed(() => {
    return props.item.uuid === chartEditStore.getTargetChart.selectId;
  });

  const handleMousePointHandle = (e, point, attr) => {
    e.stopPropagation();
    e.preventDefault();

    // 设置拖拽状态
    chartEditStore.setEditCanvas('isDrag', true);
    const scale = chartEditStore.getEditCanvas.scale;

    const itemAttrX = attr.left;
    const itemAttrY = attr.top;
    const itemAttrW = attr.width;
    const itemAttrH = attr.height;

    // 记录点击初始位置
    const startX = e.screenX;
    const startY = e.screenY;

    // 记录初始位置
    chartEditStore.setMousePosition(startX, startY);

    const mousemove = throttle((moveEvent: MouseEvent) => {
      chartEditStore.setMousePosition(moveEvent.screenX, moveEvent.screenY);

      let currX = Math.round((moveEvent.screenX - startX) / scale);
      let currY = Math.round((moveEvent.screenY - startY) / scale);

      const isTop = /t/.test(point);
      const isBottom = /b/.test(point);
      const isLeft = /l/.test(point);
      const isRight = /r/.test(point);

      const newHeight = itemAttrH + (isTop ? -currY : isBottom ? currY : 0);
      const newWidth = itemAttrW + (isLeft ? -currX : isRight ? currX : 0);

      attr.height = newHeight > 0 ? newHeight : 0;
      attr.width = newWidth > 0 ? newWidth : 0;
      attr.left = itemAttrX + (isLeft ? currX : 0);
      attr.top = itemAttrY + (isTop ? currY : 0);
    }, 50);

    const mouseup = () => {
      chartEditStore.setEditCanvas('isDrag', false);
      chartEditStore.setMousePosition(0, 0);
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };
</script>

<style lang="less" scoped>
  .go-shape-box {
    position: absolute;
    cursor: move;

    /* 锚点 */
    .shape-point {
      z-index: 1;
      position: absolute;
      width: 7px;
      height: 7px;
      border: 3px solid #51d6a9;
      border-radius: 5px;
      background-color: #fff;
      transform: translate(-40%, -30%);

      &.t,
      &.b {
        width: 30px;
        transform: translate(-50%, -50%);
      }

      &.l,
      &.r {
        height: 30px;
      }

      &.r {
        transform: translate(-20%, -50%);
      }

      &.l {
        transform: translate(-45%, -50%);
      }

      &.rt,
      &.rb {
        transform: translate(-30%, -30%);
      }
    }

    /* 选中 */
    .shape-modal {
      position: absolute;
      top: 0;
      left: 0;

      .shape-modal-select,
      .shape-modal-change {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }

      .shape-modal-select {
        opacity: 0.1;
        top: 2px;
        left: 2px;
      }

      .active {
        background-color: #51d6a9;
      }

      .shape-modal-change {
        border: 2px solid rgba(0, 0, 0, 0);
      }

      .selectActive,
      .hoverActive {
        border: 2px solid #51d6a9;
      }

      .hoverActive {
        border-style: dotted;
      }

      .selectActive {
        border-style: solid;
      }
    }
  }
</style>
