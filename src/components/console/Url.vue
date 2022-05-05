<script setup>
import { useUrlStore } from '@/store/url'
import { message } from 'ant-design-vue';
import { reactive, ref } from 'vue'
import { PlusOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons-vue';
const urlStore = useUrlStore()
let data = urlStore.getList;
const visible = ref(false);
const did = ref(0)
const form = reactive({
  title: '',
  url: '',
  img: ''
})
const title = ref('修改站点')

const rules = {
  name: [{
    required: true,
    message: '请输入名称',
    trigger: "change",
  }],
  url: [{
    required: true,
    message: '请输入网址',
    trigger: "change",
  }],
  img: [{
    required: true,
    message: '请输入图标',
    trigger: "change",
  }],
};

const onClose = () => {
  if (title.value == '修改站点') {
    urlStore.modUrl(did.value, form);
    message.success('修改成功')
  } else {
    if (form.img == '' || form.title == '' || form.img == '') {
      message.error('请填写信息')
    } else {
      urlStore.addUrl(form);
      message.success('添加成功')
      window.location.reload()
    }

  }
  visible.value = !visible.value
};
const condition = ref(false);
const modvisible = ref(0)
const add = () => {
  visible.value = !visible.value
  title.value = '添加站点'
}
const modal = (id) => {
  if (!condition.value) {
    title.value = '修改站点'
    did.value = id;
    // console.log(did.value);
    visible.value = !visible.value
    let index = data.findIndex((item) => item.id == did.value);
    form.title = data[index].title
    form.url = data[index].url
    form.img = data[index].src
  }

}
const del = () => {
  condition.value = true
}
const confirm = () => {
  console.log(modvisible.value);
  urlStore.delUrl(modvisible.value);
  // console.log(id);
  message.success('删除成功');
  modvisible.value = false;
  window.location.reload()
};

const cancel = e => {
  message.info('撤销操作');
};
const handleVisibleChange = id => {
  if (condition.value) {
    modvisible.value = id;
    visible.value = false
    confirm(); // next step
  }
};
</script>
<template>
  <div class="nav-list">
    <div class="nav-item" v-for="item in data" :key="item">
      <a-popconfirm title="确定删除吗？" :visible="modvisible == item.id" @confirm="confirm" @cancel="cancel"
        @visibleChange="handleVisibleChange(item.id)">
        <template #icon>
          <question-circle-outlined style="color: red" />
        </template>
        <a href="javascript:;" @click="modal(item.id)"><img :src="item.src" />
          <p>{{ item.title }}</p>
        </a>
      </a-popconfirm>

    </div>
    <a-drawer :title="title" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }" @close="visible = !visible">
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="名称" name="name">
              <a-input v-model:value="form.title" placeholder="请输入站点名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="网站" name="url">
              <a-input v-model:value="form.url" style="width: 100%" placeholder="请输入网址" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="图标" name="img">
              <a-input v-model:value="form.src" placeholder="请输入图标网址" />
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
      <template #extra>
        <a-space>
          <a-button @click="visible = !visible">取消</a-button>
          <a-button type="primary" @click="onClose">提交</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
  <div class="add">
    <a-button shape="circle" @click="add">
      <template #icon>
        <plus-outlined />
      </template>
    </a-button>
  </div>
  <div class="del">
    <a-button shape="circle" @click="del">
      <template #icon>
        <close-outlined />
      </template>
    </a-button>
  </div>
</template>
<style lang="scss" scoped>
.nav-list {
  text-align: center;
  display: flex;
  flex: 0 0 50%;
  flex-wrap: wrap;
  height: 100vh;
  align-content: flex-start;

  .nav-item {
    width: 8.2rem;
    height: 8.2rem;
    margin: 0 1rem;
  }

  a {
    display: block;
    background-color: var(--background);
    border-radius: var(--radiusB);
    padding-top: .5rem;

    &:hover {
      box-shadow: var(--box-shadowB);
    }
  }

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }

  p {
    color: #666;
  }
}

.add {
  position: absolute;
  top: 1.4rem;
  right: 3.4rem;
}

.del {
  position: absolute;
  top: 1.4rem;
  right: 8.4rem;

  button:hover {
    color: red;
    border-color: red;
  }
}
</style>
