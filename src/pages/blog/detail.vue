<template>
  <div class="root block-z-index" @keydown.ctrl.f="showSearchModel = true">
    <!-- 目录 -->
    <div class="catalogy">
      {{ detail?.title }}
      <div
        v-for="item of valueHtml.toc"
        :id="'catalogy-' + item.id"
        :key="item.id"
        class="item"
        :class="{ active: currentTitle.id === item.id }"
        :style="{
          'padding-left': (item.tag - valueHtml.maxTitle) * 10 + 'px'
        }"
        @click="toTarget(item.id, 'content')"
      >
        <span>{{ item.text }}</span>
        <!-- <a :href="`#content-nav${item.id}`">{{ item.text }}</a> -->
      </div>
    </div>
    <div class="box">
      <div class="head">
        <h2 class="title">{{ detail?.title }}</h2>
        <div class="tags">
          <div>{{ detail?.lasttime }} 浏览量: {{ detail?.count }}</div>
          <Tag v-for="(item, index) in detail?.tag" :key="index" :text="item.content" circle />
          <Input width="80px" v-model="keyWord" placeholder="请输入关键词" />
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
  </div>
  <!-- <Modal :is-mask="false" :show="showSearchModel" @confirm="search" @close="showSearchModel = false"> </Modal> -->
  <FloatBtn :list="btn" right="70px" bootom="70px"></FloatBtn>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IHtmlContent, NodeType } from './types.d';
import { getBlogApi } from '@/api/blog';
import { md2html } from '@/utils/txt2md';
import { useStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { IbtnList } from '@/components/types';
const store = useStore();
const { themeColor } = storeToRefs(store);

// 获取的原文字：
const detail: Ref<any> = ref({});
// 转换后的文字
const valueHtml: Ref<IHtmlContent> = ref({
  content: '',
  toc: [],
  maxTitle: 0
});
const showHtmlContent = ref('');
const router = useRouter();
const { params } = useRoute();

// 检索
const showSearchModel = ref(false);
const keyWord = ref('');

const search = () => {
  // 正则匹配
  let reg: RegExp = new RegExp(keyWord.value, 'gi');
  showHtmlContent.value = valueHtml.value.content.replace(
    reg,
    (key, index: number) =>
      `<span id="search-n${index}" style="color:${themeColor.value}">${key}</span>`
  );
  toTarget('n0', 'search');
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

const toTop = () => {
  toTarget('1');
  // const link = document.createElement("a")
  // link.href = "#content-nav1"
  // document.body.appendChild(link)
  // link.click()
  // document.body.removeChild(link)
};

// 悬浮按钮
const btn: Readonly<IbtnList[]> = Object.freeze([
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
      router.push('/addblog/' + params?.id);
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

const currentTitle: Ref<NodeType> = ref({ id: 0 });
// let selfTitle=ref([])

const getBlogDet = async () => {
  const res = await getBlogApi(Number(params?.id));
  if (res) {
    detail.value = res;
    valueHtml.value = md2html(detail.value.content);
    showHtmlContent.value = valueHtml.value.content;
  }
};
getBlogDet();

// 滚动到目的地
const toTarget = (target: string, content: string = 'content'): void => {
  if (content === 'content') {
    target = '#content-nav' + target;
  } else if (content === 'search') {
    target = '#search-' + target;
  }
  let toElement = document.querySelector(target);
  if (toElement) {
    toElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  }
};

// 监听滚动事件并更新样式
const onScroll = (e: any) => {
  let scrollItems = document.querySelectorAll('.item');
  for (let i = scrollItems.length - 1; i >= 0; i--) {
    // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
    let judge = e.target.scrollTop >= scrollItems[i]?.offsetTop - scrollItems[0]?.offsetTop;
    if (judge) {
      currentTitle.value = { ...currentTitle.value, id: i + 1 };
      break;
    }
  }
};

document.addEventListener('copy', (e) => {
  navigator.clipboard.writeText(e.target?.innerText + '\n©littlespring');
});

// window.addEventListener('scroll', function () {
//     for (let i = toc.length - 1; i >= 0; i--) {
//         const title: NodeType = toc[i];
//         if (title?.scrollTop && title.scrollTop <= window.scrollY) {
//             if (currentTitle.value.id === title.id) {
//                 return;
//             }
//             currentTitle.value = title
//             // Object.assign(currentTitle, title);
//             return;
//         }
//     }
// });
</script>

<style scoped lang="scss">
// @import 'github-markdown-css';
.root {
  width: 100%;
  display: flex;
  max-height: 86vh;
  justify-content: center;

  .box {
    width: 85vw;
    max-height: 85vh;
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

  .catalogy {
    border-right: 1px solid #ccc;
    overflow: hidden;
    scroll-behavior: smooth;
    padding: 10px;
    width: 15vw;
    height: 70vh;

    .item {
      max-width: 50vw;
      overflow: hidden;
      cursor: pointer;
      list-style: none;
      span {
        background: linear-gradient(to right, #000, #000) left bottom no-repeat;
        background-size: 0px 1px;
        transition: 0.5s;
      }

      // a {
      // 	background: linear-gradient(to right, #000, #000) left bottom no-repeat;
      // 	background-size: 0px 1px;
      // 	transition: 0.5s;
      // }
    }

    .item span:hover {
      // color: v-bind(themeColor);
      // background-position: left bottom;
      background-size: 100% 2px;
      // text-decoration: underline;
    }
  }

  // .catalogy:hover {
  //   overflow: auto;
  // }

  .catalogy::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    border-radius: 0;
    transition: background-color 2s ease;
  }

  .catalogy:hover::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0;
    transition: background-color 2s ease;
  }

  .catalogy::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 6px;
    transition: background-color 2s ease;
    // display: none;
    // opacity: 0;
  }

  .catalogy:hover::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 6px;
    transition: background-color 2s ease;
    // display: inline !important;
    // opacity: 1;
  }

  .catalogy::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0);
    transition: background-color 2s ease;
  }

  .catalogy:hover::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.15);
    transition: background-color 2s ease;
  }
}

.active {
  // background-color: v-bind(themeColor);
}
</style>
