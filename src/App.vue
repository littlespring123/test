<script setup lang="ts">
// import Star from "@/components/App/Star.vue"
import { useStore } from '@/stores';
import Nav from '@/components/Layout/Nav.vue';
import Head from '@/components/Layout/Head.vue';
import String from '@/components/App/String.vue';
import Message from '@/components/Message.vue';
import { storeToRefs } from 'pinia';
import { toRefs, ref, onBeforeMount, onMounted } from 'vue';
import router from '@/router';
import i18n from '@/i18n';
const store = useStore();
const roadShow = ref('');
const { color, backgroundColor, scroller, themeColor } = storeToRefs(store);
const { scrollerColor, scrollerWidth } = toRefs(scroller.value);

const showLayout = ref({
  showNav: true,
  showHead: true
});

sessionStorage.setItem('extendMusic', 'false');

router.afterEach((to, from, next) => {
  console.log(to, 'to');
  // 是否显示layout
  if (Object.keys(to.meta).length !== 0) {
    let { meta } = to;
    showLayout.value = {
      showNav: meta?.menuRender || false,
      showHead: meta?.headerRender || false
    };
  } else {
    showLayout.value = {
      showNav: true,
      showHead: true
    };
  }

  to.name &&
    (() => {
      store.setMenuActive(to.path);
      roadShow.value = i18n.global.t(to.name.toString());
      document.title = roadShow.value;
    })();
  // next();
});

// onMounted(() => {
// 	if (localStorage.get("userInfo")) {
// 		fetchUserInfo()
// 	} else {
// 		router.push("/login")
// 	}
// })
</script>

<template>
  <!-- <Star></Star> -->
  <div class="root" :style="{ color, backgroundColor }">
    <!-- <transtion name="swtich"> -->
    <Nav v-show="showLayout.showNav"></Nav>
    <!-- </transtion> -->
    <div class="content" @keyup.ctrl.backspace="router.back()">
      <Head v-show="showLayout.showHead" :road="roadShow"></Head>
      <!-- 路由切换特效 -->
      <!-- <transtion name="swtich"> -->
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
      <!-- </transtion> -->
    </div>
  </div>
  <Message></Message>
  <Loading />
  <String />
</template>

<style lang="scss">
.root {
  width: 100vw;
  height: calc(100vh);
  display: flex;
  transition: 0.3s;
  overflow: hidden;

  .content {
    // left: 10vw;
    width: 100%;
    position: relative;
  }
}

/* 渐入渐出效果 */
.switch-enter-active,
.switch-leave-active {
  transition: opacity 3s;
}

.switch-enter,
.switch-leave-to {
  opacity: 0;
}

// 滚动条
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}

// 普通盒子类
.my-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.my-box-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  // width: ;
  // width: 30vw;
}

// 边框修饰类
.pink-atmo-box {
  border-radius: 15px;
  box-shadow: 2px 2px 3px 3px rgba(252, 169, 169, 0.3);
  transition: all 0.5s;
}

.pink-atmo-box:hover {
  box-shadow: 3px 3px 4px 3px rgba(252, 169, 169, 0.7);
}

.pink-atmo-box-light {
  border-radius: 15px;
  box-shadow: 1px 1px 1px 1px rgba(252, 169, 169, 0.2);
  transition: all 0.5s;
}

.pink-atmo-box-light:hover {
  box-shadow: 3px 3px 4px 3px rgba(252, 169, 169, 0.5);
}

// 层级类
.back-z-index {
  z-index: 1;
}

.canvas-z-index {
  z-index: 5;
}

.block-z-index {
  position: relative;
  z-index: 10;
}
</style>
