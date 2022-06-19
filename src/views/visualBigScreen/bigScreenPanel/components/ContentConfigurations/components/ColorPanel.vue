<template>
  <Input v-model:value="pureColor" placeholder="主题色HEX" disabled>
    <template #prefix>
      <ColorPicker
        v-model:pureColor="pureColor"
        format="hex6"
        shape="circle"
        useType="both"
        v-model:gradientColor="gradientColor"
        @pureColorChange="changeColor"
      /> </template
  ></Input>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  // Components
  import { Input } from 'ant-design-vue';
  import { ColorPicker } from 'vue3-colorpicker';
  import 'vue3-colorpicker/style.css';

  const props = defineProps({
    value: {
      type: [String],
      default: '#71afe5',
    },
  });
  const emit = defineEmits(['change']);

  const pureColor = ref(props.value || '#ffffff');
  const gradientColor = ref('linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)');

  watch(
    () => props.value,
    (val) => {
      pureColor.value = val;
    },
  );

  const changeColor = () => {
    emit('change', pureColor.value);
  };
</script>
