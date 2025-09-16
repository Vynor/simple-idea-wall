<template>
    <div class="container">
        <h1>Floating Idea</h1>
        <RouterLink to="/now">
            <el-button type="primary" color="#ffc0cb" style="color:white">
                Edit
            </el-button>
        </RouterLink>
        <div
            v-for="idea in dispalyIdea"
            :key="(idea.id as string)"
            class="idea-item"
            :style="{
                left: idea.left + 'px',
                top: idea.top + 'px',
                backgroundColor: idea.color,
            }"
        >
            {{ idea.text }}
        </div>
    </div>
</template>

<script setup lang="ts">
import useIdeaStore from '@/store/modules/ideas';
import useFloatingStore from '@/store/modules/floating';
import { onMounted, reactive } from 'vue';

const ideaStore = useIdeaStore()
const floatingStore = useFloatingStore()
//设置展示数组包含id|text|left|top|color
interface IdeaData {
    id: string, text: string, left: string, top: string, color: string
}
const dispalyIdea = reactive<IdeaData[]>([])
//挂载完毕后使得想法重新布局
onMounted(()=>{
    Object.assign(dispalyIdea, ideaStore.ideas)
    dispalyIdea.forEach(idea => {
        const randomStyle = 
            floatingStore.randomStyle(window.innerWidth - 150, window.innerHeight - 150);
        Object.assign(idea, randomStyle)
    })
})
</script>

<style scoped lang="scss">
.container {
    position: relative;
    width: 100%;
    height: 100vh; // 可改成百分比或父容器高度
    border: 1px solid #eee;
    // background-color: #f5f5f5;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    overflow: hidden;
}

.idea-item {
  position: absolute;
  padding: 8px 12px;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  user-select: none;
  font-size: 30px;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
}
</style>