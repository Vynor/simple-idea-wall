import { defineStore } from "pinia";
import { constantColors } from "./constantColors";
//与漂浮想法相关的仓库
const useFloatingStore = defineStore('floating', () => {
    // 随机颜色
    const colors = constantColors
    const randomStyle = (containerWidth:number, containerHeight:number) =>{
        const style = {
            left: Math.random() * containerWidth,
            top: Math.random() * containerHeight,
            color: colors[Math.floor(Math.random() * colors.length) ]
        }
        return style
    }
    return {
        colors,
        randomStyle
    }
})

export default useFloatingStore;