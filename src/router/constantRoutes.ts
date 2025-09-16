//路由信息
export const constantRoutes = [
    {
        path:'',
        //重定向
        redirect:'/floating'
    },
    {
        path:'/home',
        meta: {
            title: '主页'
        },
        component: () => import('@/views/home/index.vue')
    },
    {
        path:'/now',
        //路由懒加载——按需加载
        component: () => import('@/views/now/index.vue')
    },
    {
        path:'/floating',
        component: () => import('@/views/floating/index.vue')
    }
]