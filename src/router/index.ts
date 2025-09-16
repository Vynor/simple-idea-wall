import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "./constantRoutes";

//创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

export default router