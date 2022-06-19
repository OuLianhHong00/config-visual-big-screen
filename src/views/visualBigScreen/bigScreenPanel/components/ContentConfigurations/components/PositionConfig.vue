<template>
  <Form :model="formState" :labelCol="{ span: 6 }" labelAlign="left" :wrapperCol="{ span: 15 }">
    <FormItem label="左边距">
      <InputNumber
        class="w-full"
        type="number"
        v-model:value="formState.left"
        @blur="(e) => handleChange('left', e)"
      />
    </FormItem>
    <FormItem label="上边距">
      <InputNumber
        v-model:value="formState.top"
        type="number"
        @blur="(e) => handleChange('top', e)"
      />
    </FormItem>
    <FormItem label="宽度">
      <InputNumber
        v-model:value="formState.width"
        type="number"
        @blur="(e) => handleChange('width', e)"
      />
    </FormItem>
    <FormItem label="高度">
      <InputNumber
        v-model:value="formState.height"
        type="number"
        @blur="(e) => handleChange('height', e)"
      />
    </FormItem>
  </Form>
</template>

<script lang="ts" setup>
  import { reactive, watch } from 'vue';
  // Components
  import { Form, InputNumber } from 'ant-design-vue';
  const FormItem = Form.Item;

  const emit = defineEmits(['positionChange']);
  const props = defineProps({
    position: {
      type: Object,
      default: () => ({}),
    },
  });

  const formState = reactive({
    left: 0,
    top: 0,
    width: 200,
    height: 150,
  });
  watch(
    () => props.position,
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
    emit('positionChange', type, e.target.value);
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
