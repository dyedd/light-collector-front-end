<script setup>
import DragPanelList from "./DragPanelList.vue"
import CreateCategory from "./CreateCategory.vue"
import { PlusOutlined } from '@ant-design/icons-vue';
import { ref } from "vue";
const showCreateCate = ref(false);

</script>
<template>
  <div class="wrapper-content">
    <DragPanelList>
    </DragPanelList>
    <Teleport to="body">
      <create-category v-model:open="showCreateCate"></create-category>
    </Teleport>
    <div class="add">
      <a-button shape="circle" @click="showCreateCate = true">
        <template #icon>
          <plus-outlined />
        </template>
      </a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-content {
  position: relative;
  padding-bottom: 5rem;
}

.add {
  position: absolute;
  top: 0;
  right: 0.4rem;
}
.card {
  padding:0
}
</style>
