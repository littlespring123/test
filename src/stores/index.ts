import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { setLanguage } from '@/i18n';
import { ILoading } from '@/components/types';

export const useStore = defineStore('main', () => {
  // 全局保存
  const save2Local = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getFromLocal = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || 'null');
  };

  // 导航栏高亮
  const menuActive = ref('');
  const setMenuActive = (value: string) => {
    menuActive.value = value;
  };

  // 用户信息
  const userInfo = ref({
    uid: '',
    id: '',
    name: ''
  });

  const setUserInfo = (data: any) => {
    userInfo.value = data;
  };

  // 用户博客信息
  // userBlog: {
  //   count: 100,
  //   viewCount: 100,
  //   github: 'www.wwww',
  //   office: 'asasass',
  // },

  // 设置相关
  // 主题设置
  const themeColor = ref(localStorage.getItem('themeColor') || '#007AFF');
  const color = ref(localStorage.getItem('color') || '#000');
  const backgroundColor = ref('#fff');
  const setColor = (colorObj: any) => {
    setThemeColor(colorObj?.themeColor || '#007AFF');
    color.value = colorObj?.color || '#000';
    backgroundColor.value = colorObj?.backgroundColor || '#fff';
  };
  const setThemeColor = (color: string) => {
    themeColor.value = color;
  };

  // 滚动条设置
  const scroller = ref({
    scrollerColor: '#ccc',
    scrollerWidth: 3
  });
  const setScroller = (data: { scrollerColor: string; scrollerWidth: number }) => {
    scroller.value = data;
  };

  // 夜间模式设置
  const darkMode = ref(false);
  const setDarkMode = (value: boolean) => {
    darkMode.value = value;
    if (value) {
      color.value = '#fff';
      backgroundColor.value = '#000';
    } else {
      color.value = '#000';
      backgroundColor.value = '#fff';
    }
  };

  // 语言设置
  const languageMode = ref(localStorage.getItem('languageMode') || 'cn');
  const setLanguageMode = (mode: 'en' | 'cn') => {
    languageMode.value = mode;
    setLanguage(mode);
  };

  // 加载中
  const loadingInfo: Ref<ILoading> = ref({
    show: false,
    icon: 'loading',
    duration: 1000,
    text: '加载中',
    handle: true
  });
  const setLoading = (info: ILoading) => {
    if (info?.show === true && !info?.handle) {
      setTimeout(() => {
        setLoading({ ...loadingInfo.value, show: false });
      }, loadingInfo.value.duration);
    }
    loadingInfo.value = {
      ...loadingInfo.value,
      ...info
    };
  };

  // message设置
  // message的值
  const message = ref({
    show: false,
    text: '',
    icon: 'success',
    duration: 2000
  });

  /**
   * 设置通知信息
   * @param text 文本信息
   * @param duration 停留时间
   * @param icon 图标
   */
  const setMessage = (text: string, duration: number = 1000, icon: string = 'none') => {
    message.value = {
      show: true,
      text,
      icon,
      duration
    };
  };

  // const setSuccessMsg = (text = "成功", duration = 2000) => {
  //   message.value = {
  //     show: true,
  //     text,
  //     icon: "success",
  //     duration,
  //   };
  // };
  // const setFailMsg = (text = "失败", duration = 2000) => {
  //   message.value = {
  //     show: true,
  //     text,
  //     icon: "fail",
  //     duration,
  //   };
  // };

  // blog设置
  const blogSet = ref({
    pagesize: 5
  });

  const setBlogSet = () => {};

  // 界面设置
  const windowSet = ref({
    height: 300,
    width: 300
  });

  const setWindowSet = () => {};

  // layout设置
  const showHead = ref(true);
  const showNav = ref(true);
  const setShowHead = (value: boolean) => {
    showHead.value = value;
  };
  const setSHowNav = (value: boolean) => {
    showHead.value = value;
  };

  return {
    userInfo,
    message,
    themeColor,
    color,
    backgroundColor,
    scroller,
    blogSet,
    darkMode,
    menuActive,
    windowSet,
    loadingInfo,
    languageMode,
    showHead,
    showNav,
    setMessage,
    setScroller,
    getFromLocal,
    save2Local,
    setMenuActive,
    setWindowSet,
    setBlogSet,
    setColor,
    setLoading,
    setLanguageMode,
    // setMessage,
    // setFailMsg,
    // setSuccessMsg,
    setThemeColor,
    setUserInfo,
    setDarkMode,
    setShowHead,
    setSHowNav
  };
});
// watch(
//   pinia.state,
//   (state) => {
//     // 每当状态发生变化时，将整个 state 持久化到本地存储。
//     localStorage.setItem('piniaState', JSON.stringify(state));
//   },
//   { deep: true },
// );
