<template>
  <Form :model="formState" :labelCol="{ span: 7 }" labelAlign="left" :wrapperCol="{ span: 15 }">
    <template v-for="(item, index) in formState" :key="index">
      <!-- 未分组的 -->
      <template v-if="!item.list">
        <FormItem :label="item.label">
          <Input v-if="item.component == 'Input'" v-model:value="item.value" />
        </FormItem>
      </template>
      <!-- 分组的 -->
      <template v-else>
        <Collapse accordion expand-icon-position="right">
          <CollapsePanel :key="`a-${item.field}`" :header="item.label" class="text-[#fff]">
            <div v-for="(child, childIndex) in item.list" :key="`a-${item.field}-${childIndex}`">
              <FormItem :label="child.label" v-if="child.component !== Component.CONFIGCOLOR">
                <!-- 输入框 -->
                <Input v-if="child.component == Component.INPUT" v-model:value="child.value" />
                <!-- 数字输入框 -->
                <InputNumber
                  v-if="child.component == Component.INPUTNUMBER"
                  v-model:value="child.value"
                  type="number"
                />
                <!-- 下拉框 -->
                <Select
                  v-if="child.component == Component.SELECT"
                  v-model:value="child.value"
                  :options="child.options"
                />
                <!-- 颜色提取 -->
                <ColorPanel
                  v-if="child.component == Component.COLOR"
                  v-model:value="child.value"
                  @change="(value) => (child.value = value)"
                />
                <!-- 滑块 -->
                <Slider
                  v-if="child.component == Component.SLIDER"
                  v-model:value="child.value"
                  :max="child.max"
                  :min="child.min"
                  :step="child.step || 1"
                />
                <!-- 开关 -->
                <Switch v-if="child.component == Component.SWITCH" v-model:checked="child.value" />
              </FormItem>
              <FormItem v-if="child.component == Component.CONFIGCOLOR" :wrapperCol="{ span: 24 }">
                <!-- 自定义配色 -->
                <ColorConfig
                  v-model:value="child.value"
                  @colorchange="(value) => (child.value = value)"
                />
              </FormItem>
            </div>
          </CollapsePanel>
        </Collapse>
      </template>
    </template>
  </Form>
</template>

<script lang="ts" setup>
  import { reactive, watch } from 'vue';
  // Components
  import { Form, InputNumber, Input, Slider, Collapse, Switch, Select } from 'ant-design-vue';
  import ColorPanel from './ColorPanel.vue';
  import ColorConfig from './ColorConfig.vue';
  // Const
  import { Components } from '../../../tool/commomSetting';
  const FormItem = Form.Item;
  const CollapsePanel = Collapse.Panel;
  const Component = Components;

  const props = defineProps({
    config: {
      type: Object,
      default: () => ({}),
    },
  });

  const formState = reactive({});
  watch(
    () => props.config,
    (val) => {
      if (val) {
        Object.assign(formState, val);
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>
<style scoped lang="less">
  ::v-deep .ant-input-number {
    width: 100%;
  }

  ::v-deep .ant-form-item-label > label {
    color: #dfdbdb;
  }

  ::v-deep .ant-collapse-content-box {
    background-color: transparent;
  }

  ::v-deep .ant-collapse-header {
    color: #fff !important;
    padding-left: 0 !important;
    border-bottom: 1px solid #2c2a2a;
  }

  ::v-deep .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
  }

  ::v-deep .ant-collapse {
    background-color: transparent;
  }

  ::v-deep .ant-collapse-content {
    background-color: transparent;
    border: none;
  }

  .ant-collapse > .ant-collapse-item {
    border-bottom: 1px solid #242323;
  }

  .ant-collapse {
    border: none;
  }
</style>
