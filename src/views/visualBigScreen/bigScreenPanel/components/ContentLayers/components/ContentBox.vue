<template>
  <!-- 每个小模块的公共样式 -->
  <div class="go-content-box" :class="[`bg-depth${depth}`]">
    <div
      class="content"
      :class="{
        'content-height-show-bottom': showBottom,
      }"
    >
      <template v-if="xScroll">
        <div class="overflow-x-scroll overflow-y-hidden">
          <slot></slot>
        </div>
      </template>

      <template v-else>
        <div class="overflow-auto">
          <slot></slot>
        </div>
      </template>
    </div>

    <div v-if="showBottom" class="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: String,
    showBottom: {
      type: Boolean,
      default: false,
    },
    flex: {
      type: Boolean,
      default: false,
    },
    // 背景深度
    depth: {
      type: Number,
      default: 1,
    },
    // x 轴滚动
    xScroll: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style lang="less" scoped>
  .go-content-box {
    height: calc(100vh - 60px);
    margin: 1px;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;

    .bg-depth0 {
      background-color: #18181c;

      .bottom,
      .top {
        background-color: #18181c;
      }
    }

    .bg-depth1 {
      background-color: #18181c;

      .bottom,
      .top {
        background-color: #232324;
      }
    }

    &.bg-depth2 {
      background-color: #232324;

      .bottom,
      .top {
        background-color: #2a2a2b;
      }
    }

    &.bg-depth3 {
      background-color: #2a2a2b;

      .bottom,
      .top {
        background-color: #313132;
      }
    }

    .top,
    .bottom {
      height: 52px;
      padding: 0 10px;
      border-top: 1px solid;
      border-color: #373739;
    }

    .top {
      border-bottom: 1px solid #18181c;
    }

    .content {
      height: calc(100vh - 60px);
      overflow: hidden;
    }

    .aside {
      position: relative;
    }

    .content-height-show-bottom {
      height: calc(100vh - 60px - 52px);
    }
  }
</style>
