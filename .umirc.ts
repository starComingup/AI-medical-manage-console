import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '膀胱癌辅助诊疗系统',
  },
  links: [
    { rel: 'icon', href: "favicon.ico"}
  ],
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    {
        name: '统计',
        path: '/table',
        component: './Table',
    },
  ],
  npmClient: 'npm',
});

