import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

/** 静态路由（无需权限） */
const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { title: "首页" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { title: "登录", noAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: { title: "404" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  // 切换路由时滚动到顶部
  scrollBehavior: () => ({ top: 0 }),
});

// ======================== 路由守卫 ========================

/** 不需要登录的白名单路由 */
const whiteList = ["/login"];

router.beforeEach((to, _from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title || ""} - ${import.meta.env.VITE_APP_TITLE}`;

  const token = localStorage.getItem("token");

  if (token) {
    // 已登录，访问登录页则跳转首页
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    // 未登录，在白名单中则放行，否则跳转登录
    if (whiteList.includes(to.path) || to.meta.noAuth) {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
  }
});

export default router;
