<script setup>
import { useUserStore } from '@/store/user'
import { onMounted } from 'vue'
import axios from '@/utils/request';
import {
  getStorage,
} from "@/utils/storage"
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const userStore = useUserStore()

onMounted(() => {
  getStorage({
    key: "token",
    success: (token) => {
      if (token) {
        axios.get("http/api/self").then((res) => {
          // if (res.data['code'] == 403) return;
          if (res.data != '') {
            userStore.setUser(res.data)
          }
        })

      }
    }
  })


})
</script>

<template :style="cssSetting">
  <router-view name="Header" />
  <router-view name="login" />
  <router-view name="console" />
  <router-view />
  <!-- <footer>Copyright © 2022 dyedd出品</footer> -->
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  border-radius: 5px;
}

footer {
  left: 0;
  right: 0;
  bottom: 0;
  color: #999;
  padding: 1em 0;
  position: fixed;
  font-size: 0.875em;
  text-align: center;
}
</style>
