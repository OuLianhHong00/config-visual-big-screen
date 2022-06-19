<template>
  <Upload
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    v-model:file-list="fileList"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :customRequest="customRequest"
    :remove="removeFile"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading" />
      <plus-outlined v-else />
    </div>
  </Upload>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  //Components
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  //Hooks
  import { useMessage } from '/@/hooks/web/useMessage';
  // Utils
  import { isFunction } from '/@/utils/is';
  import { warn } from '/@/utils/log';

  interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
    type?: string;
    size: number;
    originFileObj: any;
    percent?: number;
  }

  const props = defineProps({
    /**
     * Whether to display text
     */
    maxSize: { type: Number, default: 300 },
    /**
     * Whether to refresh the interface when changing
     */
    reload: { type: Boolean },
    api: {
      type: Function as PropType<PromiseFn>,
      default: null,
      required: true,
    },
    uploadParams: {
      type: Object as PropType<any>,
      default: () => {},
    },
    originImgUrl: {
      type: String,
      default: '',
    },
  });

  const { createMessage } = useMessage();
  const emit = defineEmits(['fileChange']);

  const fileList = ref<any>([]);
  const loading = ref<boolean>(false);
  const imageUrl = ref<string>(props.originImgUrl);

  const beforeUpload = (file: FileItem) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      createMessage.error('只能上传jpg或png的图片!');
      return false;
    }
    const isLt2M = file.size / 1024 < props.maxSize;
    if (!isLt2M) {
      createMessage.error(`上传的文件不能大于${props.maxSize}KB`);
      return false;
    }
    return isJpgOrPng && isLt2M;
  };

  const customRequest = async (dataT) => {
    const { api } = props;
    if (!api || !isFunction(api)) {
      return warn('上传文件api需要为一个函数');
    }
    try {
      const { data } = await props.api?.(
        {
          data: {
            ...(props.uploadParams || {}),
          },
          file: dataT.file,
          name: 'file',
          filename: dataT.file.name,
        },
        function onUploadProgress(progressEvent: ProgressEvent) {
          const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          dataT.onProgress({ percent: complete }, dataT.file);
        },
      );
      dataT.onSuccess({ url: data?.data }, dataT.file);
      emit('fileChange', data.data);
      return {
        success: true,
        error: null,
        response: data,
      };
    } catch (e) {
      createMessage.error('upload error');
      return {
        success: false,
        error: e,
      };
    }
  };
  const removeFile = () => {
    console.log('fileList', fileList);
  };
</script>
<style>
  .avatar-uploader > .ant-upload {
    width: 142px;
    height: 80px;
    padding: 0 !important;
  }

  .avatar-uploader .ant-upload.ant-upload-select-picture-card > .ant-upload {
    padding: 0 !important;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
