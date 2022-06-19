<template>
  <Form :model="formState" :labelCol="{ span: 6 }" labelAlign="left" :wrapperCol="{ span: 15 }">
    <FormItem label="数据类型">
      <Select
        v-model:value="formState.dataType"
        :options="[
          { label: '静态数据', value: 1 },
          { label: '动态数据', value: 2 },
        ]"
      />
    </FormItem>
    <FormItem label="静态数据" v-if="formState.dataType == 1">
      <Button @click="openModal">编辑</Button>
    </FormItem>
    <FormItem label="动态数据" v-if="formState.dataType == 2">
      <Select
        v-model:value="formState.dynamicData"
        :options="[
          { label: '数据集1', value: 1 },
          { label: '数据集2', value: 2 },
        ]"
      />
    </FormItem>
  </Form>
  <CodeEditor @register="register" v-model:value="formState.staticData" mode="application/json" />
</template>

<script lang="ts" setup>
  import { reactive, watch } from 'vue';
  // Components
  import { Form, Select } from 'ant-design-vue';
  import CodeEditor from './CodeEditor.vue';
  import { useModal } from '/@/components/Modal';
  const FormItem = Form.Item;

  // const emit = defineEmits(['positionChange']);
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({}),
    },
  });
  const [register, { openModal }] = useModal();

  const formState = reactive({
    dataType: 1,
    staticData: {},
    dynamicData: 1,
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

  // const handleChange = (type, e) => {
  //   emit('positionChange', type, e.target.value);
  // };
</script>
<style scoped lang="less">
  ::v-deep .ant-input-number {
    width: 100%;
  }

  ::v-deep .ant-form-item-label > label {
    color: #dfdbdb;
  }
</style>
