import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//element-plus的按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/mixins.scss" as *;
        `
      }
    }
  },
  //resolve 是 Vite 配置项，用来 解析模块路径
  //作用：当在代码里import模块时，告诉Vite如何找到模块的真实路径
  resolve: {
    //路径别名
    alias: {
      //__dirname代表文件所在目录   项目src目录
      '@': path.resolve(__dirname, 'src') // @ 映射到 src/
    }
  },
})
