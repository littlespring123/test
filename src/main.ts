import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import hljs from 'highlight.js';
// import MessagePlugin from "@/plugins/MessagePlugin"
// 导入高亮样式
// import "highlight.js/styles/kimbie-light.css";
// import "highlight.js/styles/gradient-light.css";
// import "highlight.js/styles/atom-one-dark-reasonable.css"
// import "highlight.js/styles/obsidian.css";
import 'highlight.js/styles/github-dark.css';
//import "highlight.js/styles/a11y-dark.css"

const pinia = createPinia();

import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';
import Empty from '@/components/Empty.vue';
import FloatBtn from '@/components/FloatBtn.vue';
import Tag from '@/components/Tag.vue';

import Image from '@/components/Media/Image.vue';
import List from '@/components/List/List.vue';
import ListItem from '@/components/List/ListItem.vue';

import Table from '@/components/Table.vue';

import Loading from '@/components/Loading.vue';
import Modal from '@/components/Modal.vue';
import Pagination from '@/components/Pagination.vue';
import Form from '@/components/MyForm/Form.vue';
import Input from '@/components/MyForm/Input.vue';
import MySelect from '@/components/MyForm/MySelect.vue';
import Switch from '@/components/MyForm/Switch.vue';
import Progress from '@/components/Progress.vue';
import TabSelect from '@/components/TabSelect.vue';
import Message from '@/components/Message.vue';
import noticeBar from '@/components/NoticeBar.vue';
import Upload from '@/components/Upload.vue';

// media
import Video from '@/components/Media/Video.vue';
import Audio from '@/components/Media/Auido.vue';

// import VueI18n from 'vue-i18n';
import i18n from './i18n';

// 全局导入组件
const GlobalComponents = (app: any) => {
  const components = {
    TabSelect,
    Progress,
    Message,
    noticeBar,
    Tag,
    Icon,
    MySelect,
    Switch,
    Image,
    Loading,
    Upload,
    Audio,
    Table,
    Modal,
    Pagination,
    Form,
    Input,
    FloatBtn,
    Video,
    List,
    ListItem,
    Button,
    Card,
    Empty
  };
  Object.keys(components).forEach((key: string) => {
    app.component(`${key}`, components[key]);
  });
};

const app = createApp(App);

const render = (props = {}) => {
  const { container } = props;

  // 导入highlight.js及其样式
  app.directive('highlight', (el) => {
    hljs.configure({ useBR: true });
    let blocks: any = el.querySelectorAll('pre');
    blocks.forEach((block: HTMLElement) => {
      hljs.highlightElement(block);
    });
  });

  GlobalComponents(app);
  app
    .use(router)
    .use(pinia)
    .use(i18n)
    .mount(container ? container.querySelector('#app') : '#app');
};

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * bootstrap ： 在微应用初始化的时候调用一次，之后的生命周期里不再调用
 */
export async function bootstrap() {
  console.log('bootstrap');
}

/**
 * mount ： 在应用每次进入时调用
 */
export async function mount(props) {
  console.log('mount', props);
  render(props);
}

/**
 * unmount ：应用每次 切出/卸载 均会调用
 */
export async function unmount() {
  console.log('unmount');
  app.unmount();
}
