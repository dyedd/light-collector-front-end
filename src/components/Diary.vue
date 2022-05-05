<script setup>
import draggle from "@/utils/draggable";
import { useDiaryStore } from '@/store/diary'
import { useUserStore } from '@/store/user'
import { onMounted, ref, watch } from "vue";
const vDraggable = draggle
const diaryStore = useDiaryStore() 
const userStore = useUserStore() 
const list = diaryStore.list;
const close = (id)=>{
    console.log(id);
    diaryStore.delDiary(id)
}
</script>
<template>
    <template v-if="userStore.user.isLogin" v-for="item in list" :key="item.id">

        <div class="draggable-item" :data-id="item.id" v-draggable @dblclick="close(item.id)">
            <div class="head">
                <span>{{ item.time }}</span>
            </div>
            <div class="body">
                <div class="content">
                    <p>{{ item.content }}</p>
                </div>
            </div>
        </div>
    </template>

</template>
<style lang="scss" scoped>
.draggable-item {
    background-color: #f2ce2b;
    position: absolute;
    width: 200px;
    border-bottom-left-radius: 20px 500px;
    border-bottom-right-radius: 500px 30px;
    border-top-left-radius: 100px 20px;
    border-top-right-radius: 20px 100px;
    box-shadow: 0 2px 10px 1px rgb(0 0 0 / 20%);
    user-select: none;
    font-size: 14px;
    color: var(--background);
    z-index: 9999;

    .head {
        pointer-events: none;
        height: 42px;
        line-height: 42px;
        padding: 10px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--classD);
        color: var(--background);
    }

    .body {
        height: 158px;
        padding: 10px;

        .content {
            max-height: 100%;
            overflow-y: auto;
            word-wrap: break-word;
            line-height: 24px;
        }
    }


}
.close {
    margin-left: 6rem;
}
</style>