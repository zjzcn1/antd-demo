import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as antIcons from '@ant-design/icons-vue'
import App from './App';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from '@/routes';

const app = createApp(App);
app.config.productionTip = false;

// antd
app.use(Antd);
Object.keys(antIcons).forEach(key => {
  app.component(key, antIcons[key])
});
app.config.globalProperties.$antIcons = antIcons;

// router
const router = createRouter({
  scrollBehavior(/* to, from, savedPosition */) {
    return { top: 0 }
  },
  history: createWebHashHistory(),
  routes: routes,
});
app.use(router);

// mount
app.mount('#app');
