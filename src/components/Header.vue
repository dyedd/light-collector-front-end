<script setup>
import { CaretDownOutlined } from '@ant-design/icons-vue';
import { useMainStore } from '@/store/main'
import { useUserStore } from '@/store/user'
import { useDiaryStore } from '@/store/diary'
import { useRouter } from 'vue-router'
import { computed, onMounted, reactive, ref } from 'vue';
import Login from '@/views/Login.vue'
import axios from '../utils/request';
import md5 from 'blueimp-md5'
import { message } from 'ant-design-vue';
import { removeALLStorage } from "../utils/storage";
const store = useMainStore()
const userStore = useUserStore()
const diaryStore = useDiaryStore()
const router = useRouter()

const isLoginOpen = ref(false);
const checkLogin = () => {
  if (userStore.user.isLogin) {
    router.push('/console/setting')
  } else {
    isLoginOpen.value = true
  }
}
const hitokoto = ref({})
onMounted(() => {
  axios.get("https://v1.hitokoto.cn", {
    encode: "json"
  }).then((res) => {
    hitokoto.value = res.data
  })
})
const img = computed(() => {
  return `url(${store.headBack})`
})
const open = ref(false)
const qiandao = () => {
  userStore.addIntegral()
  userStore.addRecord()
  message.success('签到成功')
}

const submitData = reactive({
  "content": ""
})
const cancelModal = () => {
  open.value = !open.value
}
const confirm = () => {
  console.log(222);
  diaryStore.addDiary({
    content: submitData.content
  })
  open.value = !open.value
  window.location.reload()
}
const quit = () => {
  console.log(1)
  removeALLStorage({
    key: "token",
    success: () => { }
  });
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();
      document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();
    }
  }
  location.reload()
}
</script>
<template>
  <header :style="{ backgroundImage: img }">
    <!-- <header > -->
    <div class="wrapper">
      <template v-if="userStore.user.isLogin">
        <div class="action-btn" title="便签~" @click="open = !open">
          <icon-font type="iconbianqian" />
        </div>
        <div class="action-btn" title="签到~" @click="qiandao">
          <icon-font type="iconqiandao" />
        </div>
      </template>
      <div class="login-header" @click="checkLogin" v-if="!userStore.user.isLogin">
        <img src="@/assets/avatar.jpg" alt="user avatar" @click="checkLogin" />
        <span>未登录</span>
      </div>
      <a-dropdown v-if="userStore.user.isLogin">
        <a class="my-dropdown-link">
          <div class="login-header" @click="checkLogin">
            <img :src="`https://cravatar.cn/avatar/${md5(userStore.user.email)}?d=mp`" alt="user avatar"
              @click="checkLogin" />
            <span>{{ userStore.user.username }}</span>
          </div>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="quit">
              <span>退出</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

    </div>
    <div class="hitokoto">
      <a :href="`https://hitokoto.cn/?uuid=${hitokoto.uuid}`" target="_blank">{{ hitokoto.hitokoto }}</a>
    </div>
  </header>
  <Teleport to="body">
    <Login v-model:open="isLoginOpen"></Login>
  </Teleport>
  <Teleport to="body">
    <a-modal v-model:visible="open" title="创建新的便签" ok-text="确定" cancel-text="取消" @cancel="cancelModal" @ok="confirm"
      class="my-modal">
      <a-form ref="createCategory" :model="submitData" layout="vertical" name="form_in_modal">
        <a-form-item :rules="[{ required: true, message: '便签名称不能为空' }]">
          <a-textarea v-model:value="submitData.content" placeholder="请输入便签内容" />
        </a-form-item>
      </a-form>
    </a-modal>
  </Teleport>
</template>

<style lang="scss" scoped>
header {
  height: 25rem;
  /* background-image: url("https://s2.loli.net/2022/04/16/Cyl5Eaq3DIYf1zo.jpg"); */
  background-attachment: fixed;
  background-size: cover;
  background-position: 50%;

  .wrapper {
    display: flex;
    justify-content: flex-end;
    padding: 0 2rem;
  }

  .action-btn {
    line-height: 5rem;
    cursor: pointer;
    margin: 1rem 2rem 0 0;
    background: #fff;
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    text-align: center;

    &:hover {
      transform: scale(1.2);
    }

    .anticon {
      font-size: 2.5rem;
    }
  }
}
.my-dropdown-link {
  color: #000;
}
.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  margin-top: 1rem;
  width: 15.6rem;
  height: 4rem;
  border-radius: 5rem;
  background: #fff;
  cursor: pointer;

  img {
    margin: 0;
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
  }

  span {
    margin-left: 2rem;
    font-size: 1.6rem;
  }
}

.hitokoto {
  margin-top: 2rem;
  font-weight: 400;
  font-size: 2.4rem;
  text-align: center;

  a {
    color: #fff;
    text-decoration: none;
    text-shadow: 0 0 1px #000;
  }
}
</style>