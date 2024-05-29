<template>
  <div class="root" @keydown.ctrl.t="router.push('/addblog')">
    <div class="list" @keyup.enter="getBlog(paginations.pageNum, paginations.pageSize)">
      <div class="input">
        <Input
          v-model="title"
          :label="t('blog.title')"
          width="120px"
          :placeholder="t('blog.titlePlaceHolder')"
        />
      </div>
      <template v-if="list.length === 0">
        <Empty></Empty>
      </template>
      <div
        v-else
        v-for="(item, index) in list"
        :key="index"
        :class="{ hightLight: curIndex === index }"
        class="item block-z-index pink-atmo-box-light"
        @keydown.ctrl.t="router.push('/detail/' + item.id)"
        @click="
          () => {
            getBlogDet(item.id);
            curIndex = index;
          }
        "
      >
        <!-- @keydown.ctrl.t="router.push('/addblog')" -->
        <div>
          {{ item.title }}
        </div>
        <!-- <Tag
          v-for="(tagItem, childIndex) in item.tag"
          :key="childIndex"
          :text="tagItem.content"
          class=""
        ></Tag> -->
        {{ item.lasttime.split('T')[0] }}
      </div>

      <Pagination
        :total="paginations.total"
        :page-size="paginations.pageSize"
        :current-page="paginations.pageNum"
        @page-change="change"
        :showInfo="false"
      ></Pagination>
    </div>

    <div v-if="!isEmpty(detail)" class="box">
      <div class="head">
        <h2 class="title">{{ detail?.title }}</h2>
        <div class="tags">
          <div>{{ detail?.lasttime }} 浏览量: {{ detail?.count }}</div>
          <Tag v-for="(item, index) in detail?.tag" :key="index" :text="item.content" circle />
          <Input v-model="keyWord" width="180px" placeholder="请输入关键词" />
          <Button type="primary" @click="search">搜索</Button>
        </div>
      </div>
      <div
        v-highlight
        class="detail-content markdown-body"
        @scroll="onScroll"
        v-html="showHtmlContent"
      ></div>
    </div>

    <div v-else>
      <Empty></Empty>
    </div>
  </div>

  <FloatBtn :list="btn" right="50px" bootom="50px"></FloatBtn>
</template>

<script setup lang="ts">
import { isEmpty } from '@/utils/tool';
import { onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { getBlogListApi } from '@/api/blog';
import { md2html } from '@/utils/txt2md';
import { getBlogApi } from '@/api/blog';
import { useI18n } from 'vue-i18n';
import type { IBlogItem, IHtmlContent, NodeType } from './types.d';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores';
import { IbtnList, IPaginations } from '@/components/types';
const store = useStore();
const { themeColor } = storeToRefs(store);
const { t } = useI18n();

const router = useRouter();

// 当前打开的项
const curIndex: Ref<number> = ref(-1);

const list: Ref<IBlogItem[]> = ref([]);

const btn: Readonly<IbtnList[]> = Object.freeze([
  {
    title: '新增',
    content: '+',
    type: 'text',
    fun: () => {
      router.push('/addblog');
    }
  },
  {
    title: '检索',
    content: 'search',
    type: 'icon',
    fun: () => {
      showSearchModel.value = true;
    }
  },
  {
    title: '修改',
    content: 'modify',
    type: 'icon',
    fun: () => {
      router.push('/addblog/' + list.value[curIndex.value]?.id);
    }
  },
  {
    title: '下载',
    content: 'download',
    type: 'icon',
    fun: () => download()
  },
  {
    title: '返回',
    content: 'arrow-left',
    type: 'icon',
    fun: () => router.back()
  },
  {
    title: '回到顶部',
    content: 'arrow-up',
    type: 'icon',
    fun: () => toTop()
  }
]);

// 列表相关
const title: Ref<string> = ref('');
const tagText: Ref<string> = ref('');
const paginations: Ref<IPaginations> = ref({
  pageNum: 1,
  pageSize: 15,
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

const change = (e: number) => {
  getBlog(e, paginations.value.pageSize);
};

// blog详情
const getBlogDet = async (id: number) => {
  const res = await getBlogApi(id);
  if (res) {
    console.log(res);
    detail.value = res;
    valueHtml.value = md2html(detail.value?.content || '');
    showHtmlContent.value = valueHtml.value.content;
  }
};

// 获取的原文字：
const detail: Ref<Partial<IBlogItem>> = ref({});
// 转换后的文字
const valueHtml: Ref<IHtmlContent> = ref({
  content: '',
  toc: [],
  maxTitle: 0
});
const showHtmlContent: Ref<string> = ref('');

// 检索
const showSearchModel: Ref<boolean> = ref(false);
const keyWord: Ref<string> = ref('');

const search = () => {
  // 正则匹配
  let reg: any = new RegExp(keyWord.value, 'gi');
  showHtmlContent.value = valueHtml.value.content.replace(
    reg,
    (key: string, index: number) =>
      `<span id="search-n${index}" style="color:${themeColor.value}">${key}</span>`
  );
  toTarget('n0', 'search');
  // showSearchModel.value = false
};

// 下载文档
const download = () => {
  const blob = new Blob([detail.value?.content + '\n©littlespring'], { type: 'text/plain' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = detail.value?.title + '.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

// 滚动到目的地
const toTarget = (target: any, content: string = 'content') => {
  if (content === 'content') target = '#content-nav' + target;
  else if (content === 'search') target = '#search-' + target;

  let toElement = document.querySelector(target);
  if (toElement) {
    toElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  }
};

const toTop = () => {
  toTarget('1');
  // const link = document.createElement("a")
  // link.href = "#content-nav1"
  // document.body.appendChild(link)
  // link.click()
  // document.body.removeChild(link)
};

const currentTitle: Ref<NodeType> = ref({ id: 0 });

// 监听滚动事件并更新样式
const onScroll = (e: any) => {
  let scrollItems: NodeListOf<Element> = document.querySelectorAll('.item');
  for (let i = scrollItems.length - 1; i >= 0; i--) {
    // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
    let judge = e.target.scrollTop >= scrollItems[i]?.offsetTop - scrollItems[0]?.offsetTop;
    if (judge) {
      currentTitle.value = { ...currentTitle.value, id: i + 1 };
      break;
    }
  }
};

onMounted(() => getBlog(paginations.value.pageNum, paginations.value.pageSize));
</script>

<style scoped lang="scss">
.root {
  display: flex;
  height: 100%;
  overflow: hidden;
}

// blog列表
.list {
  height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  .input {
    margin: 12px;
    width: 80%;
  }
}

// 列表高亮
.hightLight {
  background-color: lightblue;
}

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

// blog详情
.box {
  width: 85vw;
  max-height: 85vh;

  // border: 1px solid #ccc;
  // max-width: 70vw;
  padding: 4px;

  .head {
    display: flex;
    flex-direction: column;
    text-align: left;
    border-bottom: 1px solid #ccc;
    margin-bottom: 3px;

    .tags {
      margin: 10px 0;
      div {
        margin: 4px;
      }
    }
  }

  .detail-content {
    padding: 10px;
    max-height: 70vh;
    overflow: hidden;
    scroll-behavior: smooth;
    // border: 1px solid #ccc;
  }
  .detail-content:hover {
    overflow: auto;
  }
}
</style>
