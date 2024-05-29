<template>
  <div
    class="select"
    @keydown.ctrl.t="router.push('/addblog')"
    @keyup.enter="getBlog(paginations.pageNum, paginations.pageSize)"
  >
    <Input
      v-model="title"
      width="200px"
      :label="t('blog.title')"
      name="title"
      :placeholder="t('blog.titlePlaceHolder')"
    />
    <Input
      width="200px"
      v-model="tagText"
      :label="t('blog.tag')"
      name="tag"
      :placeholder="t('blog.tagPlaceHolder')"
    />
    <MySelect
      :localdata="selectOptions"
      :label="t('blog.sort')"
      @change="(option:selectOptionItemType) => (paginations.sort = option.value)"
    />
    <Button type="" @click="getBlog(paginations.pageNum, paginations.pageSize)">{{
      t('blog.filter')
    }}</Button>
  </div>
  <template v-if="list.length === 0">
    <Empty></Empty>
  </template>
  <div
    v-else
    v-for="(item, index) in list"
    :key="index"
    class="item block-z-index pink-atmo-box-light"
    @keydown.ctrl.t="router.push('/detail/' + item.id)"
    @click="router.push('/detail/' + item.id)"
  >
    <!-- @keydown.ctrl.t="router.push('/addblog')" -->
    <div>
      {{ item.title }}
    </div>
    <Tag
      v-for="(tagItem, childIndex) in item.tag"
      :key="childIndex"
      :text="tagItem.content"
      class=""
    ></Tag>
    {{ item.lasttime.split('T')[0] }}
  </div>
  <Pagination
    :total="paginations.total"
    :page-size="paginations.pageSize"
    :current-page="paginations.pageNum"
    @page-change="change"
  ></Pagination>
  <FloatBtn :list="btn" right="50px" bootom="50px"></FloatBtn>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { getBlogListApi } from '@/api/blog';
import { useI18n } from 'vue-i18n';
import type { IBlogItem } from './types.d';

import { selectOptionItemType } from '@/components/MyForm/type';
import { IbtnList, IPaginations } from '@/components/types';
const { t } = useI18n();

const router = useRouter();

const list: Ref<IBlogItem[]> = ref([]);

const selectOptions = [
  {
    text: t('blog.select.none'),
    value: 'none'
  },
  {
    text: t('blog.select.hot'),
    value: 'hot'
  },
  {
    text: t('blog.select.new'),
    value: 'new'
  }
];

const btn: Readonly<IbtnList[]> = Object.freeze([
  {
    title: '添加',
    content: '+',
    type: 'text',
    fun: () => {
      router.push('/addblog');
      // router.push("/chat")
    }
  }
]);

// 列表相关
const title: Ref<string> = ref('');
const tagText: Ref<string> = ref('');
const paginations: Ref<IPaginations> = ref({
  pageNum: 1,
  pageSize: 6,
  total: 0,
  sort: ''
});

const getBlog = async (pageNum?: number, pageSize?: number) => {
  const res = await getBlogListApi(
    pageNum,
    pageSize,
    title.value,
    tagText.value,
    paginations.value?.sort
  );
  if (res) {
    list.value = res.records;
    paginations.value = {
      ...paginations.value,
      pageNum: res.current,
      total: res.total
    };
  }
};

const change = (e) => {
  getBlog(e, paginations.value.pageSize);
};

getBlog(paginations.value.pageNum, paginations.value.pageSize);
</script>

<style scoped lang="scss">
.select {
  display: flex;
  align-items: center;
  margin: 16px;
}
.container {
  height: 30vh;
  overflow: auto;
}

.item {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 15px;
  margin: 16px;
  display: flex;
  align-items: center;
  z-index: 15;

  div:first-child {
    margin-right: auto;
  }
}
</style>
