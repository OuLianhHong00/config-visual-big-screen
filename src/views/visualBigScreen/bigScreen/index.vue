<template>
  <div class="p-2">
    <div class="p-4 mb-2 bg-white">
      <BasicForm @register="registerForm" />
    </div>
    <div class="p-2 bg-white">
      <List
        :grid="{ gutter: 5, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4 }"
        :data-source="data"
        :pagination="paginationProp"
      >
        <template #header>
          <div class="text-right">
            <a-button type="primary" @click="handleAdd"> 新增</a-button>
          </div>
        </template>
        <template #renderItem="{ item }">
          <ListItem>
            <Card class="back-img">
              <div class="bg"></div>
              <div
                class="h-[150px] flex justify-center items-center text-[#fff] text-[20px] relative"
                ><span>{{ item.name }}</span></div
              >
              <div class="flex justify-between h-[45px] text-[#fff] relative p-4">
                <div style="color: #fff"> {{ item.updateTime }}</div>
                <div class="text-right">
                  <Tooltip>
                    <template #title>编辑</template>
                    <Icon icon="clarity:note-edit-line" class="mr-5" />
                  </Tooltip>
                  <Tooltip>
                    <template #title>预览</template>
                    <Icon icon="clarity:eye-line" class="mr-5" />
                  </Tooltip>
                  <Popconfirm
                    title="确认删除该大屏吗?"
                    ok-text="确认"
                    cancel-text="取消"
                    @confirm="() => handleDelete(item.id)"
                  >
                    <Tooltip>
                      <template #title>删除</template>
                      <Icon icon="clarity:trash-line" />
                    </Tooltip>
                  </Popconfirm>
                </div>
              </div>
            </Card>
          </ListItem>
        </template>
      </List>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { router } from '/@/router';
  // Components
  import { List, Card, Tooltip, Popconfirm } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { BasicForm, useForm } from '/@/components/Form';

  const ListItem = List.Item;

  //数据
  const data = ref([]);

  //表单
  const [registerForm, { validate }] = useForm({
    schemas: [
      { field: 'type', component: 'Input', label: '名称' },
      { field: 'type', component: 'Input', label: '编码' },
    ],
    labelWidth: 80,
    baseColProps: { span: 6 },
    autoSubmitOnEnter: true,
    submitFunc: handleSubmit,
  });
  //表单提交
  async function handleSubmit() {
    const data = await validate();
    await fetch(data);
  }

  // 自动请求并暴露内部方法
  onMounted(() => {
    fetch();
  });

  async function fetch() {
    // 请求内容p = {}
    data.value = [{ id: '1123', name: 'xxxx数据展示', updateTime: '2020-10-11 10:11:00', img: '' }];
    total.value = 1;
    // const { api, params } = props;
    // if (api && isFunction(api)) {
    //   const res = await api({ ...params, page: page.value, pageSize: pageSize.value, ...p });
    //   data.value = res.items;
    //   total.value = res.total;
    // }
  }
  //分页相关
  const page = ref(1);
  const pageSize = ref(36);
  const total = ref(0);
  const paginationProp = ref({
    showSizeChanger: false,
    showQuickJumper: true,
    pageSize,
    current: page,
    total,
    showTotal: (total) => `总 ${total} 条`,
    onChange: pageChange,
    onShowSizeChange: pageSizeChange,
  });

  function pageChange(p, pz) {
    page.value = p;
    pageSize.value = pz;
    fetch();
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
    fetch();
  }

  async function handleDelete(id) {
    // 删除
    console.log('删除 id', id);
  }

  const handleAdd = () => {
    const href = router.resolve({ name: 'BigScreen' });
    window.open(href['href'], '_blank');
    // router.push('/bigScreen');
  };
</script>
<style scoped lang="less">
  .back-img {
    border: 4px solid #fff;
    overflow: hidden;
  }

  ::v-deep .ant-card-body {
    padding: 0;
  }

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../../../assets/images/bg.jpg');
    background-size: 100%;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
  }
</style>
