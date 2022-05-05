<script setup>
import { useUrlStore } from '@/store/url'
const urlStore = useUrlStore()
let data = urlStore.getList;
const rank = (id)=>{
  urlStore.addNum(id)
  data = urlStore.getList
}
</script>
<template>
  <div class="nav-list">
    <div class="nav-item" v-for="item in data" :key="item">
      <a :href="item.url" target="_blank" @click="rank(item.id)"><img :src="item.src" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav-list {
  text-align: center;
  display: flex;
  flex: 0 0 50%;
  flex-wrap: wrap;
  justify-content: center;
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
</style>
