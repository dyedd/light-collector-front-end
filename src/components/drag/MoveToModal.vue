<script setup>
import { ref, reactive, computed } from 'vue';
import axios from '@/utils/request';
import { message } from 'ant-design-vue';
import { useCategoryStore } from '@/store/categories'
const categoryStore = useCategoryStore()
const props = defineProps({
  open: {
    type: Boolean,
    default: true
  },
  item: {
    type: Object,
    required: true
  },
  lname: {
    type: Object,
    required: true
  },
  cardid: {
    type: String,
    required: true
  },
})
const categorys = computed(() => {
  const lst = []
  for (const item of props.lname) {
    lst.push({ name: item.name, id: item['cid'] })
  }
  return lst
})
const moveTo = ref(props.cardid)
const emit = defineEmits(['update:open'])
const cancelModal = () => {
  emit("update:open", false)
}
// for (const item of props.lname) {
//   if(props.lname)
// }
console.log(props.ltem);
// const moveTo = ref("")
const confirm = () => {
  if (moveTo.value == "") {
    message.info("没有填写分类")
    return;
  }
  // console.log(moveTo.value);
  const moveData = {
    moveFromId: parseInt(props.cardid),
    moveFromIndex: props.item['index'],
    moveToId: parseInt(moveTo.value),
    moveToIndex: 0
  }
  console.log(moveData);
  // console.log(moveData);
  axios.patch('http/api/category?move=card', moveData).then((res) => {
    if (res.status == 200) {
      message.success(res.data.msg)
      emit("update:open", false)
      axios.get('http/api/category').then((res) => {
        if (res.status == 200) {
          categoryStore.setInfo(res.data)
        }
      })
    }
  })

}
</script>
<template>
  <a-modal v-model:visible="props.open" :title="`将${props.item['full_name']}移动到`" ok-text="确定" cancel-text="取消"
    @cancel="cancelModal" @ok="confirm" class="my-modal">

    <a-radio-group v-model:value="moveTo" name="radioGroup">
      <template v-for="item in categorys" :key="item.id">
        <a-radio name="item" :value="item.id">{{ item.name }}</a-radio>
      </template>
    </a-radio-group>
  </a-modal>
</template>


<style lang="scss">
.my-modal {
  border-radius: 15px;
}
</style>
