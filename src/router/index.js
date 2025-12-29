import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";

const StatusDashboard = () => import("../views/StatusDashboard.vue");

const routes = [
  { path: "/", redirect: "/status" },
  {
    path: "/status",
    name: "status",
    component: StatusDashboard,
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
