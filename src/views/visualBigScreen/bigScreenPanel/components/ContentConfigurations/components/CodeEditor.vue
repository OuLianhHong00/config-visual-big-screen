<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="Modal Title"
    @visible-change="handleVisibleChange"
  >
    <CodeEditor
      :value="codeValue"
      @change="handleValueChange"
      mode="application/json"
      :readonly="readonly"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { CodeEditor } from '/@/components/CodeEditor';

  const props = defineProps({
    value: { type: [Object, String] as PropType<Record<string, any> | string> },
    readonly: { type: Boolean, default: false },
  });
  const codeValue = ref(props.value);

  const [register] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  const handleValueChange = (v) => {
    console.log('v', v);
  };

  const handleVisibleChange = () => {};
</script>
