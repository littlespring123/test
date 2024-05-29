import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routes from '@/router/routerList';

const router = createRouter({
  history: createWebHashHistory(window.__POWERED_BY_QIANKUN__ ? `/blog/` : '/'),
  // history: createWebHistory(),
  routes: routes
});

export default router;
