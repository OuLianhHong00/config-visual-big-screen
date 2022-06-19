<!-- 自定义配色 -->
<template>
  <Form
    ref="formRef"
    :model="dynamicValidateForm"
    :labelCol="{ span: 0 }"
    :wrapperCol="{ span: 24 }"
    class="!mt-2"
  >
    <FormItem
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      label=" "
      :name="['domains', index, 'value']"
      :rules="{
        required: true,
        message: '颜色不可为空',
        trigger: 'change',
      }"
    >
      <ColorPanel
        v-model:value="domain.value"
        class="!w-[80%] mr-3"
        @change="(value) => (domain.value = value)"
      />
      <Icon
        icon="ant-design:delete-outlined"
        color="#fff"
        size="18"
        class="ml-[14px] cursor-pointer"
        @click="removeDomain(domain)"
      />
    </FormItem>
    <FormItem>
      <Button type="dashed" class="w-[80%]" @click="addDomain">
        <Icon icon="ant-design:plus-outlined" />
        新增
      </Button>
    </FormItem>
    <FormItem>
      <Button type="primary" html-type="submit" @click="submitForm">确定</Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, UnwrapRef } from 'vue';
  // Components
  import { Form, Button } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import ColorPanel from './ColorPanel.vue';
  // Util
  import { uniqueId } from 'lodash-es';
  const FormItem = Form.Item;

  interface Domain {
    value: string;
    key: number;
  }
  const props = defineProps({
    value: {
      type: Array,
      default: () => [],
    },
  });
  const emit = defineEmits(['colorchange']);

  const formRef = ref();
  const dynamicValidateForm: UnwrapRef<{ domains: Domain[] }> = reactive({
    domains: [],
  });

  if (props.value.length > 0) {
    const data: Domain[] = props.value.map((item) => {
      return {
        key: uniqueId(),
        value: item as string,
      };
    });
    dynamicValidateForm.domains = data;
  }
  const submitForm = () => {
    formRef.value
      .validate()
      .then(() => {
        const colors = dynamicValidateForm.domains.map((item) => item.value);
        emit('colorchange', colors);
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  const removeDomain = (item: Domain) => {
    let index = dynamicValidateForm.domains.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.domains.splice(index, 1);
    }
  };
  const addDomain = () => {
    dynamicValidateForm.domains.push({
      value: '',
      key: Date.now(),
    });
  };
</script>
<style>
  .dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
  }

  .dynamic-delete-button:hover {
    color: #777;
  }
</style>
