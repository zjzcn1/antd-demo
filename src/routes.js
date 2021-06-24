const routes = [
  {
    path: '/',
    component: () => import("@/pages/Layout"),
    meta: {hidden: false, leaf: true},
    children: [
      {
        path: '/home',
        name: '11',
        meta: {title: '测试1', icon: 'MenuFoldOutlined'},
        component: () => import("@/pages/403")
      }
    ]
  },
  {
    path: '/',
    name: '01',
    component: () => import("@/pages/Layout"),
    meta: {hidden: false, leaf: false, title: '测试1', icon: 'MenuFoldOutlined'},
    children: [
      {
        path: '/home1',
        name: '112',
        meta: {title: '测试1', icon: 'MenuFoldOutlined'},
        component: () => import("@/pages/404")
      },
      {
        path: '/home2',
        name: '113',
        meta: {title: '测试2', icon: 'MenuFoldOutlined'},
        component: () => import("@/pages/403")
      }
    ]
  },
  {
    path: '/',
    component: () => import("@/pages/Layout"),
    name: '',
    meta: {hidden: true},
    children: [
      {
        path: '/404',
        name: '页面未找到',
        meta: {},
        component: () => import("@/pages/404")
      }
    ]
  },
  {
    path: '/',
    component: () => import("@/pages/Layout"),
    name: '',
    meta: {hidden: true},
    children: [
      {
        path: '/403',
        name: '没有权限',
        meta: {},
        component: () => import("@/pages/403")
      }
    ]
  },
  // {
  //   path: '/:catchAll(.*)',
  //   redirect: {path: '/404'},
  //   meta: {hidden: true},
  // }
];

export default routes;
