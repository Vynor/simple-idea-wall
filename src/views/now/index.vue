<template>
  <div class="idea-wall">
    <h2>Idea Wall</h2>
    <div class="idea" v-for="idea in ideaStore.ideas" :key="idea.id as string">
      <span>{{ idea.text }}</span>
      <div>
        <el-button icon="Edit" @click="updateIdea(idea.id as string)">编辑</el-button>
        <el-button icon="Delete" @click="deleteIdea(idea.id as string)">删除</el-button>
      </div>
    </div>
    <el-button type="primary" size="large" @click="addNewIdea" icon="Plus">Add New Idea</el-button>
  </div>
  <!-- 对话窗 -->
  <el-dialog
    v-model="dialogVisible"
    :title="!ideaParam.id ? 'Add New Idea' : 'Update Idea'"
    width="500"
  >
    <el-form 
      @submit.prevent
      :rules="rules"
      ref="ideaFormRef"
      :model="ideaParam"
      >
        <el-form-item label="Idea" prop="text">
            <el-input 
              placeholder="请输入新想法"
              v-model="ideaParam.text"
              @keyup.enter="confirm"
            >
            </el-input>
        </el-form-item>
    </el-form>
    <template #footer>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import useIdeaStore from '@/store/modules/ideas';
import { v4 as uuidv4 } from 'uuid';
import type { IdeaData } from '@/store/types';
import { FormInstance } from 'element-plus';

const ideaStore = useIdeaStore();

// 对话框是否显示
let dialogVisible = ref(false)
// 新想法
let ideaParam = reactive<IdeaData>({
    id: null,
    text: ''
})
//表单实例
const ideaFormRef = ref<FormInstance>()

// 添加想法的回调
const addNewIdea = () => {
    dialogVisible.value = true
}

// 取消按钮的回调
const cancel = () => {
    dialogVisible.value = false;
    ideaParam.text = ''
    ideaParam.id = null
}

//确定按钮的回调
const confirm = async() => {
  try{
    await ideaFormRef.value!.validate()
    // 修改
    if (ideaParam.id){
        ideaStore.updateIdea(ideaParam.id, ideaParam.text)
    }else{
        // 添加
        ideaStore.addIdea({
            id: uuidv4(),
            text:ideaParam.text
        });
    }
    cancel()
  }catch (err){
    console.log('验证失败', err)
  }
}

// 更新按钮的回调
const updateIdea = (ideaId: string) => {
    const idea = ideaStore.ideas.find(i => i.id == ideaId)
    if (idea){
        //获取文本
        Object.assign(ideaParam, idea)
        // 显示对话窗
        dialogVisible.value = true
    }
}

//删除按钮的回调
const deleteIdea = (id:string) => {
    ideaStore.removeIdea(id)
}

//自定义校验规则
const validatorIdea = (rule:any, value:any, callback:any) => {
  if (!value || value.trim().length === 0){
    callback(new Error('长度至少是1'))
  }else{
    callback()
  }
}

//表单校验规则
const rules = {
  text: [{required:true, trigger: 'blur', validator:validatorIdea, message:'长度至少为1'}]
}

</script>

<style scoped>
.idea-wall { padding: 20px; }
.idea {
    display: flex;
    justify-content: space-between;
    margin: 5px 0; 
    padding: 10px; 
    background: #f5f5f5; 
    border-radius: 5px; 
}
</style>
