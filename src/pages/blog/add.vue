<template>
  <div class="root block-z-index">
    <div class="inputBox">
      <div @keyup.enter="pushTag">
        <Input
          v-model="blogForm.title"
          :label="t('blog.title')"
          :placeholder="t('blog.titlePlaceHolder')"
          name="title"
          tabindex="0"
          focus
        />
        <Input
          v-model="tagText"
          :label="t('blog.tag')"
          :placeholder="t('blog.tagPlaceHolder')"
          name="tag"
          tabindex="0"
        />
        <Button @keyup.enter="pushTag" @click="pushTag">{{ t('blog.add') }}</Button>
        <Button @click="importFile">{{ t('blog.import') }}</Button>
        <div style="margin: 0 3px 10px 3px">
          <Tag
            v-for="(item, index) in blogForm.tag"
            :key="index"
            :inverted="true"
            size="large"
            :circle="true"
            :text="item?.content ? item?.content : item"
          ></Tag>
        </div>
      </div>

      <div @keydown.ctrl.enter="post" @keydown.ctrl.s="showMD" @keydown.ctrl.p="showMD">
        <textarea
          v-model="blogForm.content"
          class="myTextarea"
          spellcheck="false"
          :placeholder="t('blog.input')"
          cols="100"
          rows="20"
        ></textarea>
      </div>
      <div v-highlight class="preview" v-html="valueMD.content"></div>
      <div class="submitBtn">
        <Button @click="post">{{ t('blog.submit') }}</Button>
        <Button @click="showMD">{{ t('blog.preview') }}</Button>
      </div>
    </div>

    <!-- 目录 -->
    <ul class="catalogy">
      <li
        v-for="item of valueMD.toc"
        :key="item.id"
        :style="{ 'padding-left': item.tag - valueMD.maxTitle + 'em' }"
        @click="toTarget(item.id)"
      >
        <a :href="`#content-nav${item.id}`">{{ item.text }}</a>
      </li>
    </ul>
    <!-- v-html="item.text" -->
  </div>
  <!-- <Modal :show="isModalVisible" @close="isModalVisible = false">
    <div class="" v-html="valueMD.content"></div>
  </Modal> -->
</template>

<script setup lang="ts">
import { getBlogApi, postBlogApi, modifyBlogApi } from '@/api/blog';
import { ref, Ref } from 'vue';
import { md2html } from '@/utils/txt2md';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/index';
import { blogFormType } from './types.d';
import { useI18n } from 'vue-i18n';
import MessagePlugin from '@/plugins/MessagePlugin';
const { t } = useI18n();

const store = useStore();

const { themeColor, color } = storeToRefs(store);

const router = useRouter();
const { params } = useRoute();

// 内容 HTML
const blogForm: Ref<blogFormType> = ref({
  title: '',
  content: '',
  tag: []
});
const valueMD: Ref<string> = ref('');
const tagText: Ref<string> = ref('');

const pushTag = () => {
  tagText.value
    ? (() => {
        blogForm.value.tag.push(tagText.value);
        tagText.value = '';
      })()
    : MessagePlugin({
        title: '输入不能为空',
        icon: 'close',
        text: ''
      });
};

const showMD = () => {
  valueMD.value = md2html(blogForm.value.content);
};

const post = async () => {
  if (blogForm.value.title === '') {
    MessagePlugin({
      title: '标题不能为空',
      icon: 'close',
      text: ''
    });
    return;
  }
  if (params?.id) {
    const res = await modifyBlogApi(
      { title: blogForm.value.title, content: blogForm.value.content, tag: null },
      parseInt(params.id, 10)
    );
    res && router.push('/blog');
  } else {
    const res = await postBlogApi(blogForm.value, store.userInfo.uid);
    res && router.push('/blog');
  }
};

const toTarget = (target: any) => {
  target = '#toc-nav' + target;
  let toElement = document.querySelector(target);
  // toElement.scrollIntoView()
  toElement.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest'
  });
};

const getBlogDet = async () => {
  if (params?.id) {
    const res = await getBlogApi(Number(params?.id));
    res && (blogForm.value = res);
  }
};

// 导入文件，仅支持文件
const importFile = async () => {
  try {
    const handle = await showOpenFilePicker();
    const file = await handle[0].getFile();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = (e.target as any).result;
      blogForm.value.content = text;
    };
    reader.readAsText(file, 'utf-8');
  } catch (error) {
    console.log('err', error);
  }
};

getBlogDet();
</script>

<style scoped lang="scss">
// @import 'github-markdown-css';
.root {
  max-height: 86vh;
  width: 99vw;
  display: flex;
  justify-content: space-around;
  // padding: 6px;
  margin: 10px;

  .inputBox {
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: 80%;

    .preview {
      border: 1px solid #ccc;
      min-height: 30vh;
      max-height: 55vh;
      overflow: hidden;
      padding: 5px 15px;
      scroll-behavior: smooth;
    }

    .preview:hover {
      overflow: auto;
      border: 1px solid v-bind(themeColor);
    }

    .submitBtn {
      display: flex;
      justify-content: center;
    }
  }

  .catalogy {
    width: 18%;
    border: 1px solid #ccc;
    overflow: hidden;
    overflow: auto;
    scroll-behavior: smooth;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    li {
      a {
        background: linear-gradient(to right, #000, #000) left bottom no-repeat;
        background-size: 0px 1px;
        transition: 0.5s;
      }
      a:hover {
        background-size: 100% 2px;
      }
    }
  }

  .catalogy:hover {
    overflow: auto;
    border: 1px solid v-bind(themeColor);
  }
}

// textarea
textarea {
  border: 1px solid v-bind(themeColor);
  outline: none;
  margin: 0;
  appearance: none;
  background-image: none;
  font-size: inherit;
  width: 100%;
}

textarea:focus {
  outline: none;
}

/* 自定义样式 */
.myTextarea {
  height: 40vh;
  display: inline-block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  color: v-bind(color);
  background-color: v-bind(backgroundColor);
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-family: '微软雅黑';
}

/* 提示文字 */
.myTextarea::placeholder {
  color: #c0c4cc;
  font-family: '微软雅黑';
}

/* 鼠标hover */
.myTextarea:hover {
  border-color: v-bind(themeColor);
}

/* 获得焦点 */
.myTextarea:focus {
  border-color: #3677f0;
}
</style>
