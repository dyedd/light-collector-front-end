<script setup>
import draggable from "vuedraggable"
import { computed, onUpdated, reactive, ref, watch, createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import card from './card.vue'
import { useCategoryStore } from '@/store/categories'
import { useUserStore } from '@/store/user'
import axios from '@/utils/request';
import gitee from '@/utils/gitee';
import { message, Modal } from "ant-design-vue";
const categoryStore = useCategoryStore()
const userStore = useUserStore()
if (userStore.user.categories > 0) {
  axios.get('http/api/category').then((res) => {
    if (res.status == 200) {
      message.success('获取成功')
      // console.log(res.data);
      categoryStore.setInfo(res.data)
    }
  })
}
const cardList = computed({
  get() {
    // return gitee(categoryStore.information,userStore)
    return categoryStore.information
  },
  set(value) {
    categoryStore.setInfo(value)
  }
})
// console.log(cardList.value.length);
const panelLength = computed(() => {
  return `${280 * cardList.value.length}px`
})
const menus = reactive([{
  text: "重命名",
  action: card => {
    modCategory(card['_id'])
  }
}, {
  text: "删除",
  action: card => {
    deleteCategory(card['_id'])
  }
}])
const actions = (menu, card) => {

  if (menu.action) {
    menu.action(card)
  }
}
const modopen = ref(false)
const modcate = reactive({
  title: ''
})
const modCategory = () => {
  modopen.value = true;
}
const confirmmod = (e) => {
  console.log(e);
  console.log(modcate.title);
  const data = {
    id: e['_id'],
    catename: modcate.title
  }
  axios.patch('http/api/category?update=card', data).then((res) => {
    if (res.status == 200) {
      message.success(res.data.msg)
      axios.get('http/api/category').then((res) => {
        if (res.status == 200) {
          categoryStore.setInfo(res.data)
        }
      })
    }
  })
  modopen.value = false;
}
const cancelmod = () => {
  modopen.value = false;
}

const onListDragEnd = (e, l, card) => {
  const { to, from, oldIndex, newIndex } = e
  const toCardId = to.childNodes[0].dataset['cardid']
  const moveData = {
    moveFromId: card.cid,
    moveFromIndex: oldIndex,
    moveToId: parseInt(toCardId),
    moveToIndex: newIndex
  }
  // console.log(moveData);
  axios.patch('http/api/category?move=card', moveData).then((res) => {
    if (res.status == 200) {
      message.success(res.data.msg)
    }
  })

}
const onpanelDragEnd = (e) => {

  const { oldIndex, newIndex } = e
  const moveData = {
    moveFromIndex: oldIndex,
    moveToIndex: newIndex
  }
  console.log(moveData);
  axios.patch('http/api/category?move=list', moveData).then((res) => {
    if (res.status == 200) {
      message.success(res.data.msg)
      // console.log(res.data);
      // categoryStore.setInfo(res.data)
    }
  })

}
const deleteCategory = (id) => {
  Modal.confirm({
    title: '确定删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: '此操作不可逆',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      console.log('OK');
      // console.log({ '_id': id });
      axios.delete('http/api/category', {
        data: {
          '_id': id
        }
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          message.success('删除成功')
          axios.get('http/api/category').then((res) => {
            if (res.status == 200) {
              categoryStore.setInfo(res.data)
            }
          })
        }
      })
    },
    onCancel() {
      console.log('Cancel');
    }
  })
}
</script>
<template>
  <div class="panel-wrapper">
    <draggable class="panel-list" :list="cardList" :style="{ width: panelLength }" group="panel" @end="e => onpanelDragEnd(e)" item-key="_id"
      animation="300">
      <template #item="{ element: card }">
        <a-card class="card" :title="card.name" style="width: 239px;">
          <template #extra>
            <a-dropdown>
              <a class="my-dropdown-link">
                <icon-font type="icons-operation" />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item v-for="menu in menus">
                    <div class="menu" @click="actions(menu, card)">
                      {{ menu.text }}
                    </div>
                  </a-menu-item>

                </a-menu>
              </template>
            </a-dropdown>
          </template>
          <div class="card-wrapper" style="max-height: 661px;">
            <draggable :list="card.repos" group="card" @end="e => onListDragEnd(e, card.repos, card)" animation="300" item-key="index">
              <template #item="{ element: item }">
              <card class="item" :clist="cardList" :cardId="card.cid" :cardInfo="item">
                </card>
              </template>
            </draggable>
            <Teleport to="body">
              <a-modal v-model:visible="modopen" title="修改新的分类" ok-text="确定" cancel-text="取消" @cancel="cancelmod"
                @ok="confirmmod(card)" class="my-modal">
                <a-form ref="modCategory" :model="modcate" layout="vertical" name="form_in_mod">
                  <a-form-item :rules="[{ required: true, message: '分类名称不能为空' }]">
                    <a-input v-model:value="modcate.title" placeholder="请输入分类名称" />
                  </a-form-item>
                </a-form>
              </a-modal>
            </Teleport>
          </div>

        </a-card>
      </template>
    </draggable>
  </div>
</template>
<style lang="scss" scoped>
.panel-wrapper {
  width: calc(100% - 5rem);
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    height: 188px;
    background-color: transparent;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #c4c4c4;
    }
  }
}



.card-wrapper {
  overflow-y: auto;
}


.item {
  cursor: move;
}

.menu {
  cursor: pointer;
  text-align: center;
  padding: 2.5px 0;
  font-size: 14px;
  line-height: 16px;
}

.card {
  display: inline-block;
  vertical-align: top;
  margin-right: 3rem;
  background: hsla(0, 0%, 100%, .3);
  border-bottom-left-radius: 1.6rem;
  border-bottom-right-radius: 1.6rem;
  border-color: transparent;
}

.my-dropdown-link {
  color: var(--main);
  margin-left: .5rem;
}
</style>
<style lang="scss">
.card {
  .ant-card-head {
    cursor: move;
    background: #fff;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    min-height: 3.2rem;
  }

  .ant-card-extra,
  .ant-card-head-title {
    padding: 0;
  }
}
</style>
