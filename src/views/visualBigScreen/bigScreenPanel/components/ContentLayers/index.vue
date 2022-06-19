<template>
  <ContentBox
    id="go-chart-edit-layout"
    :flex="true"
    :showBottom="true"
    :depth="1"
    :xScroll="true"
    @drop="dragHandle"
    @dragover="dragoverHandle"
    @dragenter="dragoverHandle"
  >
    <!-- 画布主体 -->
    <div id="go-chart-edit-content" @contextmenu="handleContextMenu">
      <!-- 展示 -->
      <EditRange>
        <!-- 图表 -->
        <EditShapBox
          v-for="(item, index) in chartEditStore.getComponentList"
          :key="item.uuid"
          :data-id="item.uuid"
          :index="index"
          :style="useComponentStyle(item.option.position, item.zIndex ? item.zIndex : index)"
          :item="item"
          @mousedown="mousedownHandle($event, item)"
          @mouseenter="mouseenterHandle($event, item)"
          @mouseleave="mouseleaveHandle($event)"
          @contextmenu.prevent="handleContextMenu($event, item)"
        >
          <component
            class="edit-content-chart"
            :is="components.get(item.code)"
            :chartConfig="dealwithChartAttr(item.option.attr)"
            :chartData="item.option.dataSource"
            :style="{
              ...useSizeStyle(item.option.position),
            }"
          />
        </EditShapBox>
      </EditRange>
    </div>
    <!-- 底部控制 -->
    <template #bottom>
      <EditBottom />
    </template>
  </ContentBox>
</template>
<script lang="ts" setup>
  // util
  import { getUUID } from '../../utils/commonUtils';
  import { useComponentStyle, useSizeStyle } from '../../hooks/useStyle.hook';
  import { useLayout } from '../../hooks/useLayout.hook';
  import { throttle, cloneDeep } from 'lodash-es';
  import { useContextMenu } from '../../hooks/useContextMenu.hook';
  // Store
  import { useChartEditStoreWithOut } from '/@/store/modules/chartEdit';
  import { useChartViewStoreWithOut } from '/@/store/modules/chartView';
  //Components
  import EditRange from './components/EditRange.vue';
  import EditShapBox from './components/EditShapBox.vue';
  import ContentBox from './components/ContentBox.vue';
  import EditBottom from './components/EditBottom.vue';

  // 定义各种组件的集合
  import components from '../../tool/main';

  const chartViewStore = useChartViewStoreWithOut();
  const chartEditStore = useChartEditStoreWithOut();
  const { handleContextMenu, onClickOutSide } = useContextMenu();

  // 布局处理 初始缩放
  useLayout();

  // * 拖拽到编辑区域里
  const dragHandle = async (e: DragEvent) => {
    e.preventDefault();

    try {
      // 获取拖拽数据
      const drayDataString: any = cloneDeep(chartViewStore.getCurrentDragChartInfo);
      if (!drayDataString) {
        return;
      }
      // 修改状态
      chartEditStore.setEditCanvas('isCreate', false);

      // 设置组件的位置
      drayDataString.option.position.left = e.offsetX - drayDataString.option.position.width / 2;
      drayDataString.option.position.top = e.offsetY - drayDataString.option.position.height / 2;

      // 新增图表到数组中
      drayDataString.uuid = getUUID();
      chartEditStore.addComponentList(drayDataString, false, true);
      chartEditStore.setTargetSelectChart(drayDataString.uuid);
      // 高亮新增的图表
    } catch (error) {
      // window['$message'].warning(`图表正在研发中, 敬请期待...`);
    }
  };

  // * 进入拖拽区域
  const dragoverHandle = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
  };

  // 点击事件（包含移动事件）
  const mousedownHandle = (e: MouseEvent, item) => {
    e.preventDefault();
    e.stopPropagation();

    onClickOutSide();
    chartEditStore.setTargetSelectChart(item.uuid);
    const scale = chartEditStore.getEditCanvas.scale;
    const width = chartEditStore.getEditCanvasConfig.width;
    const height = chartEditStore.getEditCanvasConfig.height;

    // 记录图表初始位置和大小
    const itemAttrX = item.option.position.left;
    const itemAttrY = item.option.position.top;
    const itemAttrW = item.option.position.width;
    const itemAttrH = item.option.position.height;

    // 记录点击初始位置
    const startX = e.screenX;
    const startY = e.screenY;
    // 记录初始位置
    chartEditStore.setMousePosition(startX, startY);

    // 计算偏移量（处理 scale 比例问题）
    const mousemove = throttle((moveEvent: MouseEvent) => {
      chartEditStore.setEditCanvas('isDrag', true);
      chartEditStore.setMousePosition(moveEvent.screenX, moveEvent.screenY);

      let currX = Math.round(itemAttrX + (moveEvent.screenX - startX) / scale);
      let currY = Math.round(itemAttrY + (moveEvent.screenY - startY) / scale);

      // 要预留的距离
      const distance = 50;
      // 基于左上角位置检测
      currX = currX < -itemAttrW + distance ? -itemAttrW + distance : currX;
      currY = currY < -itemAttrH + distance ? -itemAttrH + distance : currY;

      // 基于右下角位置检测
      currX = currX > width - distance ? width - distance : currX;
      currY = currY > height - distance ? height - distance : currY;

      item.option.position.left = currX;
      item.option.position.top = currY;
    }, 30);

    const mouseup = () => {
      chartEditStore.setEditCanvas('isDrag', false);
      chartEditStore.setMousePosition(0, 0);
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };

  // * 进入事件
  const mouseenterHandle = (e: MouseEvent, item) => {
    e.preventDefault();
    e.stopPropagation();
    chartEditStore.setTargetHoverChart(item.uuid);
  };

  // * 移出事件
  const mouseleaveHandle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    chartEditStore.setEditCanvas('isDrag', false);
    chartEditStore.setTargetHoverChart(undefined);
  };

  // 处理图标属性
  const dealwithChartAttr = (attr) => {
    const obj = {};
    attr.forEach((item) => {
      if (item.value) {
        obj[item.field] = item.value;
      }
      if (item.list) {
        obj[item.field] = {};
        item.list.forEach((child) => {
          obj[item.field][child.field] = child.value;
        });
      }
    });
    return obj;
  };
</script>
<style scoped lang="less">
  #go-chart-edit-layout {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-size: 15px 15px, 15px 15px;
    background-color: #18181c;
    background-image: linear-gradient(#18181c 14px, transparent 0),
      linear-gradient(90deg, transparent 14px, #86909c 0);
  }

  #go-chart-edit-content {
    border-radius: 10px;
    margin: 15px;
    overflow: hidden;
    transition: all 0.4s;
    box-sizing: 0 8px 20px rgba(0, 0, 0, 0.15);
    box-shadow: 0 8px 10px #1e1e1e1f;

    .edit-content-chart {
      position: absolute;
      overflow: hidden;
    }
  }
</style>
