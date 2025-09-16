import { createApp } from 'vue'
import App from './App.vue'
//引入路由器实例
import router from '@/router/index'
//引入reset样式
import './styles/reset.scss'
// 引入仓库
import pinia from './store'
// pinia持久化插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
//注册路由器插件
app.use(router)
// 挂载pinia
app.use(pinia)
pinia.use(piniaPluginPersistedstate);
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//挂载app组件
app.mount('#app')
