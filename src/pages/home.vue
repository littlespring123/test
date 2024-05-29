<template>
  <div class="content">
    <p class="tips">Enter your personal details and start journey with us.</p>
    <div class="box">
      <div class="avatar">
        <img class="img" src="../assets/headportrait.jpeg" alt="" />
        <div>littlespring</div>
      </div>
      <div class="list">
        <div class="item">
          <div>{{ t('home.article') }}</div>
          <div>{{ overViewInfo?.articleCount }}</div>
        </div>
        <div class="item">
          <div>{{ t('home.categorize') }}</div>
          <div>{{ overViewInfo?.tagCount }}</div>
        </div>
        <div class="item">
          <div>{{ t('home.viewer') }}</div>
          <div>{{ overViewInfo?.viewCount }}</div>
        </div>
      </div>
      <div class="link">
        <a href="https://121.41.112.199" target="_blank" title="web">
          <Icon name="web" :color="themeColor"></Icon>
        </a>
        <a
          href="https://gitee.com/littlespring123/littlespring-electron"
          target="_blank"
          title="github"
        >
          <Icon name="github" :color="themeColor"></Icon>
        </a>
        <a href="3198662089@qq.com" target="_blank" title="email">
          <Icon name="email" :color="themeColor"></Icon>
        </a>
      </div>
      <Icon
        style="border: none"
        class="enter"
        name="arrow-right-circle"
        @click="router.push('/blog')"
      ></Icon>
      <div class="tools">
        <div class="enter" @click="router.push('/tools')">tools</div>
        <div class="enter" @click="router.push('/music')">music</div>
        <div class="enter" @click="router.push('/blog-index')">blog</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { getOverViewApi } from '@/api/blog';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const router = useRouter();
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);

const overViewInfo = ref({
  articleCount: 0,
  viewCount: 0,
  tagCount: 0
});

const getOverView = async () => {
  const res = await getOverViewApi();
  res && (overViewInfo.value = res);
};

getOverView();
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  transition: 0.3s;
  background-image: url('../assets/home-bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  color: #fff;

  .tips {
    font-size: 25px;
    line-height: 100%;
    text-align: center;
    width: 60%;
    height: 100%;
    transform: translateY(50%);
  }

  .box {
    backdrop-filter: blur(10px);
    border-radius: 10px;
    width: 40%;
    height: 100%;
    right: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: auto;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(14px);

    .avatar {
      display: flex;
      align-items: center;
      flex-direction: column;
      // padding: 10px auto;
      margin: 2vh auto;

      .img {
        border-radius: 10px;
        text-align: center;
        width: 7vw;
        height: 7vw;
      }
    }

    .list {
      display: flex;
      width: 100%;
      // justify-content: space-around;

      .item {
        color: #fff;
        text-align: center;
        border-right: 2px solid v-bind(themeColor);
        // cursor: pointer;
        display: flex;
        flex-direction: column;
        mix-blend-mode: difference;
        font-size: 14px;
        // height: 2rem;
        padding: 2vh 4vw;
        // border: 1px solid red;
        div {
          width: 50px;
        }
      }

      .item:last-child {
        border-right: 0px;
      }
    }

    .link {
      font-size: 16px;
      color: #fff;
      text-align: center;
      padding: 2rem;
      mix-blend-mode: difference;
    }
  }
}

.tools {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px;
  padding: 10px;
}

.enter {
  // width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 4px;
  margin: 0 5px;

  font-size: 24px;
  transition: all 0.5s;
  fill: #fff;
}

.enter:hover {
  cursor: pointer;
  fill: v-bind(themeColor);
  color: v-bind(themeColor);
  border: 1px solid v-bind(themeColor);
  transform: scale(1.2);
}
</style>
