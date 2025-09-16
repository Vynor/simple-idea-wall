import { defineStore } from "pinia";
import type { IdeaData } from "../types";
import { v4 as uuidv4 } from "uuid";
// 管理idea相关的仓库
const useIdeaStore = defineStore('Idea',{
    // 开启本地持久化插件，默认数据从localstorage搞
    state: () => ({
        ideas:[
            {
                id: uuidv4(),
                text: '摸鱼'
            },
            {
                id: uuidv4(),
                text: '吃饭'
            },
            {
                id: uuidv4(),
                text: '学习'
            },
            {
                id: uuidv4(),
                text: '想念'
            },
            {
                id: uuidv4(),
                text: '发呆'
            },
        ]
    } as {ideas: IdeaData[]}),
    actions: {
        // 新加想法
        addIdea(idea: IdeaData) {
            this.ideas.unshift(idea)
        },
        // 删除想法
        removeIdea(id: string){
            this.ideas = this.ideas.filter((idea) => idea.id !== id)
        },
        // 修改想法
        updateIdea(id: string, text: string) {
            const target = this.ideas.find((idea) => idea.id === id)
            if (target) target.text = text
        }
    },
    persist:{
        key:'idea-store'
    }
})

export default useIdeaStore;