<script setup>
import {
  HomeOutlined, SettingOutlined, MenuOutlined, 
  UserOutlined
} from '@ant-design/icons-vue';
import { ref } from "vue";
import { useRouter } from 'vue-router'
const selectedKeys = ref(['home'])
const collapsed = ref(false)
const router = useRouter()
const menuClick = (e) => {
  router.push('/')
  if (e.key == "home") {
    router.push('/')
    return
  }
  router.push(`/console/${e.key}`)
}
</script>
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="menuClick">
        <a-menu-item key="home">
          <home-outlined />
          <span class="nav-text">回到首页</span>
        </a-menu-item>
        <a-menu-item key="setting">
          <setting-outlined />
          <span class="nav-text">个性设置</span>
        </a-menu-item>
        <a-menu-item key="url">
          <menu-outlined />
          <span class="nav-text">我的网址</span>
        </a-menu-item>
        <a-menu-item key="account">
          <user-outlined />
          <span class="nav-text">我的账号</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff',padding: 0 }">
      </a-layout-header>
      <a-layout-content :style="{ margin: '0px 16px'}">
      <div style="margin: 16px 0"></div>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style lang="scss" scoped>
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>