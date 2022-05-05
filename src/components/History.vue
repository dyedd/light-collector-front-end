<script setup>
import { onMounted, ref } from "vue";
import { getStorage, setStorage, removeStorage } from "../utils/storage";
import { useMainStore } from '@/store/main'
import mybus from "../utils/myBus";
const store  = useMainStore()
const isShow = store.history;
const historyList = ref();
const setTOhistory = (word) => {
  historyList.value.unshift(word);
  // 过滤重复的子项
  historyList.value = [...new Set(historyList.value)];
  if (historyList.value.length > 10) {
    historyList.value.length = 10;
  }
  setStorage({
    key: "searchHistory",
    data: historyList.value,
  });
};
if (isShow) {
  mybus.on("setTOhistory", (e) => {
    setTOhistory(e);
  });
}
onMounted(() => {
  getStorage({
    key: "searchHistory",
    success: (data) => {
      historyList.value = data;
    },
  });
});
const deleteHistory = (e) => {
  removeStorage({
    key: "searchHistory",
    data: e,
    success: () => {
      getStorage({
        key: "searchHistory",
        success: (data) => {
          historyList.value = data;
        },
      });
    },
  });
};
const addText = (item) => {
  mybus.emit("add", item);
};
</script>
<template>
  <div class="history_area" v-if="isShow">
    <template v-for="item in historyList" :key="item">
      <a-tag closable @close="deleteHistory(item)" @click="addText(item)">
        {{
          item
        }}
      </a-tag>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.history_area {
  display: flex;
  flex-wrap: wrap;
  .ant-tag {
    border-radius: 20px;
    margin-bottom: 15px;
    background: #f7f7f7;
    border: none;
    cursor: pointer;
  }
}
</style>
