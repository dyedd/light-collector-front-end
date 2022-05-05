<script setup>
import { ref } from 'vue'
import MoveToModal from "./MoveToModal.vue"
import axios from '@/utils/request';
import { message } from 'ant-design-vue';
import { useCategoryStore } from '@/store/categories'
const categoryStore = useCategoryStore()

const props = defineProps({
  // 传递的card信息
  cardInfo: {
    type: Object,
    default: () => {
      return {
        title: "facebook/react",
        star: "17K",
        version: "v17.0.2",
        date: "1mo",
        id: ""
      }
    }
  },
  cardId: {
    type: String
  },
  clist: {
    type: Object,
  },
})
const emit = defineEmits(['move', 'delete'])
const isOpen = ref(false);
const isModalOpen = ref(false);
const isOperationOpen = () => {
  isOpen.value = !isOpen.value
}
const cardMove = (id) => {
  isOpen.value = false
  isModalOpen.value = true;
}
const cardDelete = (id) => {
  isOpen.value = false
  const moveData = {
    moveFromId: parseInt(props.cardId),
    moveFromIndex: id,
  }
  console.log(moveData);
  axios.patch('http/api/category?delete=card', moveData).then((res) => {
    if (res.status == 200) {
      message.success(res.data.msg)
      axios.get('http/api/category').then((res) => {
        if (res.status == 200) {
          categoryStore.setInfo(res.data)
        }
      })
    }
  })
}


const cancel = e => {
  console.log(e);
  isOpen.value = false
  message.error('取消删除');
};
</script>
<template>
  <div class="card-main" :data-cardid="props.cardId">
    <h3>
      <a :href="`https://github.com/${props.cardInfo.full_name}`" target="_blank">
        {{ props.cardInfo.full_name }}
      </a>
    </h3>
    <div class="card-detail-info">
      <div class="card-detail-info-left">
        <span>
          <icon-font type="iconstar" />{{ props.cardInfo.star ? props.cardInfo.star : "17K" }}
        </span>
        <span>
          <icon-font type="iconguanfangbanben" />{{ props.cardInfo.version ? props.cardInfo.star : "v17.0.2" }}
        </span>
        <span>
          <icon-font type="iconriqi" />{{ props.cardInfo.date ? props.cardInfo.star : "1mo" }}
        </span>
      </div>
      <div class="card-detail-info-right">
        <span @click="isOperationOpen">....</span>
        <ul class="info-operation" v-if="isOpen">
          <li @click="cardMove(props.cardInfo.index)">移动</li>
          <a-popconfirm title="确定删除？" ok-text="是" cancel-text="否" @confirm="cardDelete(props.cardInfo.index)"
            @cancel="cancel">
            <li>删除</li>
          </a-popconfirm>

        </ul>
      </div>
    </div>
    <Teleport to="body">
      <move-to-modal :lname="props.clist" :cardid="props.cardId" :item="props.cardInfo" v-model:open="isModalOpen">
      </move-to-modal>
    </Teleport>
  </div>
</template>
<style lang="scss" scoped>
ul {
  list-style: none;
}

.card-main {
  width: 100%;
  min-height: 8rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: .2rem .2rem .2rem rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;

  .card-detail-info {
    display: flex;
    justify-content: space-between;
    align-content: center;
    font-size: 1.2rem;
    color: #4c4c4c;

    span i {
      margin-right: .3rem;
    }

    .card-detail-info-left {
      display: flex;
      justify-content: space-between;
      align-content: center;
      flex: 1;
      margin-right: 2rem;
    }

    .card-detail-info-right {
      position: relative;
      cursor: pointer;

      .info-operation {
        width: 5.3rem;
        height: 5.6rem;
        position: absolute;
        top: 3.5rem;
        left: -3.5rem;
        background: #ffffff;
        box-shadow: .4rem .4rem .4rem rgba(0, 0, 0, 0.3);
        border-radius: .4rem;
        text-align: center;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        font-size: 1.4rem;
      }
    }
  }

  h3 {
    min-height: 5.6rem;
    font-size: 1.6rem;

    a {
      text-decoration: none;
      color: #000;
    }
  }
}
</style>
<style lang="scss">
.ant-card-body {
  padding: 1rem !important;
}
</style>
