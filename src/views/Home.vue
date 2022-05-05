<script setup>
import Search from "@/components/Search.vue";
import History from "@/components/History.vue";
import Site from "@/components/Site.vue";
import Weather from "@/components/Weather.vue";
import Diary from "@/components/Diary.vue";
import Content from "@/components/drag/Content.vue";
import { ref } from "vue";
const isComponent = ref([
  Site, Content
])
const comName = ref(Site)
const currentIndex = ref(0)
const spotClick = (value, index) => {
  comName.value = value
  currentIndex.value = index;
}
</script>
<template>
  <main>
    <Diary></Diary>
    <div class="wrapper">
      <Weather></Weather>
      <Search></Search>
      <History></History>
      <div class="list">
        <div class="spot" :class="{ 'active': currentIndex == index }" v-for="(item, index) in isComponent"
          :key="`#${index}`" @click="spotClick(item, index)"></div>
      </div>
      <Transition name="list" appear>
        <KeepAlive>
          <component :is="comName"></component>
        </KeepAlive>
      </Transition>
    </div>
  </main>


</template>
<style lang="scss" scoped>
.list {
  height: 2rem;
  display: flex;
  flex: 1;
  justify-content: center;
  margin-bottom: 2rem;

  .spot {
    width: 1.5rem;
    height: 1.5rem;
    background-color: var(--routine);
    border-radius: 50%;
    margin: .5rem;

    &:hover {
      border: .4rem solid var(--background);
      box-shadow: var(--box-shadowA);
    }
  }

  .active {
    background-color: .4rem solid var(--theme);
    border: .4rem solid var(--background);
    box-shadow: var(--box-shadowA);
  }
}

main {
  background-color: var(--classB);
  backdrop-filter: blur(15px);
  border-radius: var(--radiusB);
  position: relative;

  .wrapper {
    width: 96rem;
    margin: 0 auto;

    @media screen and (max-width:980px) {
      width: 100%;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease-in;
}

.list-enter,
.list-leave-to {
  opacity: 0.8;
  transform: translateX(80px);
}
</style>
