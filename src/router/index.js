import { createRouter, createWebHistory } from "vue-router";

const StatusDashboard = () => import("../views/StatusDashboard.vue");
const SplashView = () => import("../views/SplashView.vue");

const routes = [
  { path: "/", redirect: "/splash" },
  {
    path: "/splash",
    name: "splash",
    component: SplashView,
  },
  {
    path: "/status",
    name: "status",
    component: StatusDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
