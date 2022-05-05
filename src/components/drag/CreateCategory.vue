<script setup>
import { ref, reactive } from 'vue';
import { useCategoryStore } from '@/store/categories'
import { useUserStore } from '@/store/user'
import axios from '@/utils/request';
import { notification } from 'ant-design-vue';
const categoryStore = useCategoryStore()
const userStore = useUserStore()
const props = defineProps({
  open: {
    type: Boolean,
    default: true
  },
})
const emit = defineEmits(['update:open'])
const submitData = reactive({
  "title": ""
})
const createCategory = ref()
const confirm = () => {
  emit("update:open", false)
  createCategory.value
    .validateFields()
    .then(values => {
      const data = {
        "name": submitData.title,
        "repos": [],
        "uid": userStore.user['_id'],
      }
      axios.post('http/api/category',data).then(res=>{
        console.log(res);
        if(res.status == 200){
          notification.open({
            message: '添加成功'
          })
          axios.get('http/api/category').then((res) => {
            if (res.status == 200) {
              categoryStore.setInfo(res.data)
            }
          })
        }
      })

    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
}
const cancelModal = () => {
  emit("update:open", false)
}
</script>
<template>
  <a-modal v-model:visible="props.open" title="创建新的分类" ok-text="确定" cancel-text="取消" @cancel="cancelModal" @ok="confirm"
    class="my-modal">
    <a-form ref="createCategory" :model="submitData" layout="vertical" name="form_in_modal">
      <a-form-item :rules="[{ required: true, message: '分类名称不能为空' }]">
        <a-input v-model:value="submitData.title" placeholder="请输入分类名称" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>



<style lang="scss" scoped>
</style>
