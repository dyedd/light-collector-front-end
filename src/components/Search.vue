<script setup>
import { onMounted, reactive, ref } from "vue";
import { useEngineStore } from '@/store/engine'
import mybus from "../utils/myBus";
const value = ref("");

const defaultUrl = ref("https://www.baidu.com/s?wd=");
const engineStore = useEngineStore()
const engines = engineStore.list
const defaultEng = ref(engineStore.list[0]['icon']);
const current = ref([engineStore.list[0]['icon']]);
const enMenu = ref(false);
const visible = ref(false);
const handleMenuClick = (e) => {
  enMenu.value = false;
  if (e.key == "custom") {
    visible.value = true;
  } else {
    defaultEng.value = e.key;
    defaultUrl.value = engines.filter(({ icon }) => {
      return icon == e.key;
    })[0].url;
  }

};
const onSearch = (searchValue) => {
  mybus.emit("setTOhistory", searchValue);
  window.open(defaultUrl.value + searchValue);
};
onMounted(() => {
  mybus.on('add', (item) => {
    value.value = item
  })
})


</script>
<template>
  <div class="search-wrapper">
    <div class="search-box">
      <a-input-search v-model="value" bordered="false" placeholder="搜索...🧐" class="search" @search="onSearch">
        <template #prefix>
          <a-tooltip placement="top" title="切换搜索引擎" arrow-point-at-center>
            <div class="select-area" @click="enMenu = true">
              <icon-font :type="defaultEng" />
            </div>
          </a-tooltip>
          <a-menu v-if="enMenu" v-model:selectedKeys="current" mode="horizontal" class="search-menu"
            @Click="handleMenuClick">
            <a-menu-item v-for="item in engines" :key="item.icon">
              <a-tooltip placement="top" :title="`切换搜索引擎为 ${item.title}`" arrow-point-at-center>
                <a href="javascript:;">
                  <icon-font class="select-icon" :type="item.icon" />
                  {{ item.title }}
                </a>
              </a-tooltip>
            </a-menu-item>
          </a-menu>
        </template>
        <template #enterButton>
          <a-button>
            <icon-font type="iconsousuo" />
          </a-button>
        </template>
      </a-input-search>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  height: 3.2rem;
}

.search-box {
  position: absolute;
  top: calc(-6.2rem * 0.5);
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  z-index: -1;
}

.search {
  transition: all 0.2s;
  padding: 1rem;
  background-color: var(--background);
  border-radius: 3rem;
  box-shadow: var(--box-shadowA);
  margin-bottom: 1rem;

  &:hover {
    border-color: transparent !important;
    box-shadow: var(--box-shadowB);
  }

  &:focus {
    box-shadow: var(--box-shadowB) !important;
    outline: none;
  }
}

.select-area {
  .anticon {
    font-size: 1.5em;
  }
}

.select-icon {
  font-size: 2rem;
}

.modal-item {
  background: var(--classB);
  border-radius: 1.6rem;
  margin-right: .4rem;
  padding: .5rem 1rem;
  max-width: 100%;

  a {
    color: var(--main);
  }

}

.modal-body {
  h3 {
    color: var(--routine);
  }

  & h3:last-of-type {
    margin-top: 2rem;
  }
}
</style>
<style lang="scss">
.search {
  .ant-input {
    margin: {
      left: 1rem;
    }
  }
}

.ant-input-search-button {
  border: none !important;
  box-shadow: none !important;

  &:hover {
    color: var(--theme);
  }
}

.ant-input-group-addon {
  background: none !important;
}

[ant-click-animating-without-extra-node="true"]::after {
  box-shadow: none !important;
}

.ant-input-affix-wrapper {
  border: none !important;

}

.ant-input-affix-wrapper-focused {
  box-shadow: none !important;
}

.search-menu {
  position: absolute;
  z-index: 999;
  border-radius: .8rem;
  box-shadow: var(--box-shadowB) !important;
  padding: .3rem !important;
  margin-left: -2.5rem !important;
  min-width: 40rem;
  max-width: 80rem;
}
</style>
