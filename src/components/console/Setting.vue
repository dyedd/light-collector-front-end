<script setup>
import card from './Card.vue'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';
import { useMainStore } from '@/store/main'
import { message } from 'ant-design-vue';
import { useEngineStore } from '@/store/engine'
const store = useMainStore()
const searchForm = reactive({
    title: '',
    icon: '',
    url: "",
});


const formState = reactive({
    history: store.history,
});
const onSubmit2 = () => {
    store.isStartHistory();
    formState.history = store.history;
    window.location.reload();
};
const backArr = ref([
    { id: 1, url: 'https://s2.loli.net/2022/04/16/Cyl5Eaq3DIYf1zo.jpg' },
    { id: 2, url: 'http://pic.qianye88.com/pic/ce3e0371d1b8d45d85ddd46d26781ca3.jpg?imageMogr2/thumbnail/x300/quality/90!' },
    { id: 3, url: 'http://pic.qianye88.com/4kyingshia8a6b276-d61a-3f40-b7ac-3b9d1ad9bfa4.jpg?imageMogr2/thumbnail/x300/quality/90!' }
])
const selectBack = (data) => {
    message.success('更换成功')
    store.setHeadBack(data)
}
const engineStore = useEngineStore()
const engines = engineStore.list
const onSubmit = () => {
    if (searchForm.title == '' || searchForm.icon == '' || searchForm.url == '') {
        message.error('请输入字段')
        return
    }
    engineStore.addEngine(searchForm)
    message.success('添加成功')
}
const isDel = ref(false)
const del = (id) => {
    if (isDel) {
        engineStore.delEngine(id)
        message.success('删除成功')
    }

}
</script>
<template>
    <card cardTitle="搜索引擎">
        <template #body>
            <a-list item-layout="horizontal" :data-source="engines">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <a-list-item-meta :description="item.url">
                            <template #title>
                                <a @click="del(item.id)">{{ item.title }}</a>

                            </template>
                            <template #avatar>
                                <icon-font class="select-icon" :type="item.icon" />
                            </template>
                        </a-list-item-meta>
                    </a-list-item>
                </template>
            </a-list>
            <a-form layout="inline" :model="searchForm">
                <a-form-item>
                    <a-input v-model:value="searchForm.icon" placeholder="图标" />
                </a-form-item>
                <a-form-item>
                    <a-input v-model:value="searchForm.title" placeholder="百度" />
                </a-form-item>
                <a-form-item>
                    <a-input v-model:value="searchForm.url" placeholder="https://www.baidu.com/s?wd=" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" shape="round" @click="onSubmit">提交</a-button>
                </a-form-item>
            </a-form>
        </template>
    </card>
    <card cardTitle="开启历史记录">
        <template #body>
            <a-form layout="vertical" :model="formState">
                <a-form-item label="历史记录">
                    <a-switch v-model:checked="formState.history" />
                </a-form-item>
                <a-form-item justify="center">
                    <a-button type="primary" shape="round" @click="onSubmit2">保存</a-button>
                </a-form-item>
            </a-form>
        </template>
    </card>
    <card cardTitle="自定义壁纸">
        <template #body>
            <template v-for="item in backArr" :key="item.id">
                <a-card class="back" :class="{ border: store.headBack == item.url }" hoverable
                    @click="selectBack(item.url)">
                    <template #cover>
                        <img alt="example" :src="item.url" />
                    </template>
                </a-card>
            </template>
        </template>
    </card>
</template>
<style lang="scss" scoped>
.back {
    display: inline-block;
    margin: .1rem;
    width: 24rem;
}

.border {
    border: 1rem solid var(--theme);
}
</style>