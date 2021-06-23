import { createRouter, createWebHashHistory } from 'vue-router';


import Main from '@/pages/Main.vue';

const routes = [
  {
    title: 'empty',
    path: '/',
    component: Main,
  // },
  // {
  //   title: 'app.global.menu.notfound',
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/views/404/index.vue'),
  }
]

const router = createRouter({
  scrollBehavior(/* to, from, savedPosition */) {
    return { top: 0 }
  },
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routes,
});

export default router;
