interface IMeta {
  headerRender?: boolean;
  menuRender?: boolean;
  keepAlive?: boolean; // 不需要缓存
}

interface IRoute {
  path: string; // 配置路由路径
  component?: any; // 配置用于渲染的 React 组件路径
  wrappers?: string[]; // 配置路由的高阶组件封装，输入值为高阶组件路径
  redirect?: string; // 配置路由跳转
  exact?: boolean; // 表示是否严格匹配，即 location 是否和 path 完全对应上
  actionId?: string; // 用于控制当前页面访问权限，默认不做限制
  title?: string; // 当前菜单名，无默认值，必填，不填则表示不展示
  icon?: string; // 当前菜单的左侧 icon，可选 antd 的 icon name 和 url，可不填
  headerRender?: boolean; // 是否展示顶栏，默认为true
  footerRender?: boolean; // 是否展示页脚，默认为true
  menuRender?: boolean; // 是否展示菜单，默认为true
  menuHeaderRender?: boolean; // 是否展示菜单顶栏，默认为true
  hideChildrenInMenu?: boolean; // 是否隐藏子菜单
  hideInMenu?: boolean; // 隐藏自己和子菜单
  hideInBreadcrumb?: boolean; // 在面包屑中隐藏
  flatMenu?: boolean; // 在菜单中只隐藏此项，子项往上提，仍旧展示，默认为false  routes?: IRoute[]; // 配置子路由
  hiden?: boolean;
  meta?: IMeta; // 配置路由的元信息
  [k: string]: unknown;
}

const routes: IRoute[] = [
  {
    path: '/',
    icon: 'home',
    title: 'nav.home',
    meta: {
      headerRender: false,
      menuRender: false,
      keepAlive: false // 不需要缓存
    },
    component: () => import('@/pages/home.vue')
  },
  {
    name: 'nav.blogIndex',
    path: '/blog-index', // blog集成页面
    icon: 'blog',
    title: 'nav.blog',
    meta: {
      headerRender: true,
      menuRender: false
    },
    component: () => import('@/pages/blog/index.vue')
  },
  {
    name: 'nav.blog',
    path: '/blog',
    icon: 'blog',
    title: 'nav.blog',
    component: () => import('@/pages/blog/blog.vue')
  },
  {
    name: 'nav.blogDetail',
    path: '/detail/:id',
    title: 'nav.detail',
    hiden: true,
    meta: {
      headerRender: true,
      menuRender: false
    },
    component: () => import('@/pages/blog/detail.vue')
  },
  {
    name: 'nav.blogAdd',
    path: '/addblog/:id?',
    title: 'nav.add',
    hiden: true,
    meta: {
      headerRender: true,
      menuRender: false
    },
    component: () => import('@/pages/blog/add.vue')
  },
  // music
  {
    name: 'nav.music',
    path: '/music',
    icon: 'music',
    title: 'nav.music',
    meta: {
      headerRender: true,
      menuRender: false
    },
    component: () => import('@/pages/Music/music.vue')
  },
  {
    name: 'nav.musicExtend',
    path: '/extends',
    icon: '',
    title: '',
    meta: {
      headerRender: false,
      menuRender: false
    },
    hiden: true,
    component: () => import('@/pages/Music/extends.vue')
  },
  {
    name: 'nav.game',
    path: '/game',
    icon: 'game',
    title: 'nav.game',
    meta: {
      headerRender: true,
      menuRender: false
    },
    hiden: true,
    component: () => import('@/pages/game/index.vue')
  },
  {
    name: 'nav.tools',
    path: '/tools',
    icon: 'tools',
    title: 'nav.tools',
    component: () => import('@/pages/tools/index.vue')
  },
  {
    name: 'nav.largeFile',
    path: '/large-file',
    icon: 'file',
    title: 'nav.largeFile',
    hiden: true,
    meta: {
      headerRender: true,
      menuRender: false
    },
    component: () => import('@/pages/tools/FileUpload.vue')
  },
  {
    name: 'nav.image',
    path: '/image',
    icon: 'question',
    title: 'nav.image',
    hiden: true,
    meta: {
      headerRender: true,
      menuRender: false
    },
    component: () => import('@/pages/tools/Image.vue')
  },
  {
    name: 'nav.genshindic',
    path: '/genshindic',
    title: 'nav.tools',
    hiden: true,
    meta: {
      headerRender: false,
      menuRender: false
    },
    component: () => import('@/pages/other/GenshinDic.vue')
  },
  {
    name: 'nav.todo',
    path: '/todo',
    icon: 'question',
    title: 'nav.todo',
    hiden: true,
    component: () => import('@/pages/tools/TodoList.vue')
  },
  {
    name: 'nav.code',
    path: '/code',
    icon: '',
    title: 'nav.code',
    hiden: true,
    component: () => import('@/pages/tools/code.vue')
  },
  {
    name: 'nav.board',
    path: '/board',
    icon: '',
    title: 'nav.board',
    hiden: true,
    meta: {
      headerRender: false,
      menuRender: false
    },
    component: () => import('@/pages/tools/Board.vue')
  },
  // 个人中心
  {
    name: 'nav.login',
    path: '/login',
    title: 'nav.login',
    hiden: true,
    meta: {
      headerRender: false,
      menuRender: false
    },
    component: () => import('@/pages/center/login.vue')
  },
  {
    name: 'nav.set',
    path: '/set',
    title: 'nav.set',
    hiden: true,
    component: () => import('@/pages/center/set.vue')
  },
  {
    name: 'nav.center',
    path: '/center',
    title: '',
    hiden: true,
    component: () => import('@/pages/center/index.vue')
  },
  {
    name: 'nav.test',
    path: '/test',
    title: '',
    hiden: true,
    component: () => import('@/pages/other/test.vue')
  },
  {
    name: 'nav.test2',
    path: '/test2',
    title: '',
    hiden: true,
    meta: {
      headerRender: false,
      menuRender: false
    },
    component: () => import('@/pages/other/test222.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    title: '',
    hiden: true,
    component: () => import('@/pages/other/404.vue')
  }
];

export default routes;
