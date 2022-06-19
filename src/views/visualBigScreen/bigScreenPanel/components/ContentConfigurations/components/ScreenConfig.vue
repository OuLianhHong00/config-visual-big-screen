<template>
  <Form :model="formState" :labelCol="{ span: 7 }" labelAlign="left" :wrapperCol="{ span: 15 }">
    <FormItem label="大屏名称">
      <Input v-model:value="formState.title" />
    </FormItem>
    <FormItem label="大屏描述">
      <Input v-model:value="formState.description" />
    </FormItem>
    <FormItem label="大屏宽度">
      <InputNumber
        v-model:value="formState.width"
        type="number"
        @blur="(e) => handleChange('width', e.target.value)"
      />
    </FormItem>
    <FormItem label="大屏高度">
      <InputNumber
        v-model:value="formState.height"
        type="number"
        @blur="(e) => handleChange('height', e.target.value)"
      />
    </FormItem>
    <FormItem label="颜色/背景">
      <RadioGroup
        v-model:value="formState.selectColor"
        button-style="solid"
        @change="(e) => handleChange('selectColor', e.target.value)"
      >
        <RadioButton :value="true">颜色</RadioButton>
        <RadioButton :value="false">背景</RadioButton>
      </RadioGroup>
    </FormItem>
    <FormItem label="大屏颜色">
      <ColorPanel
        v-model:value="formState.background"
        @change="(value) => handleChange('background', value)"
      />
    </FormItem>
    <FormItem label="大屏背景图">
      <UploadImg @fileChange="handleFileChange" :api="() => {}" />
    </FormItem>
  </Form>
</template>

<script lang="ts" setup>
  import { reactive, watch } from 'vue';
  // Components
  import { Form, InputNumber, Input, RadioGroup, RadioButton } from 'ant-design-vue';
  import ColorPanel from './ColorPanel.vue';
  import UploadImg from './UploadImg.vue';
  const FormItem = Form.Item;

  const emit = defineEmits(['screenChange']);
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({}),
    },
  });

  const formState = reactive({
    title: '新增大屏',
    description: '描述',
    width: 1920,
    height: 1080,
    background: '#232324',
    backgroundImage: undefined,
    selectColor: true,
  });
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

  const handleChange = (type, e) => {
    emit('screenChange', type, e);
  };

  const handleFileChange = (file) => {
    console.log('file', file);
  };
</script>
<style scoped lang="less">
  ::v-deep .ant-input-number {
    width: 100%;
  }

  ::v-deep .ant-form-item-label > label {
    color: #dfdbdb;
  }
</style>
