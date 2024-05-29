<!-- 403.vue -->
<template>
  <div class="error-page">
    <h1>403</h1>
    <p>禁止访问</p>
    <p class="error-text">对不起，您没有足够的权限访问此页面。</p>
    <div class="actions">
      <router-link to="/" class="back-home">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
}

.error-page h1 {
  font-size: 2em;
  margin-bottom: 0;
}

.error-text {
  font-size: 1em;
  margin-top: 1em;
}

.actions {
  margin-top: 2em;
}

.back-home {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}
</style>
