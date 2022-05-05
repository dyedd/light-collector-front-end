<script setup>
import { reactive, ref, computed } from "vue";
import {
    UserOutlined,
    LockOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useUserStore } from '@/store/user'
import axios from '@/utils/request';
import { setStorage } from '@/utils/storage';
import mybus from "@/utils/myBus";
import {
    getStorage,
} from "@/utils/storage"
const store = useUserStore()
const formState = reactive({
    username: "",
    password: "",
});
const rules = {
    username: [
        {
            required: true,
            message: "请输入用户名",
            trigger: "change",
        },
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: "chnage",
        },
    ],
};
const onSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            axios.post("http/api/login", formState).then((res) => {
                if (res.data.code == 500) {
                    message.error(res.data.msg)
                } else {
                    setStorage({
                        key: "token",
                        data: res.data.token,
                    });
                    message.success(res.data.msg)
                }
            });
            // formRef.value.resetFields();
            mybus.emit("open", false);

            window.location.reload()
        })
        .catch((error) => {
            message.error(error)
            console.log("error", error);
        });
};
const formRef = ref();
const disabled = computed(() => {
    return !(formState.username && formState.password);
});
</script>
<template>
    <a-form :model="formState" layout="vertical" :rules="rules" ref="formRef">
        <a-form-item has-feedback name="username" label="用户名">
            <a-input v-model:value="formState.username" placeholder="账号：admin">
                <template #prefix>
                    <user-outlined class="icon" type="user" />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item name="password" label="密码">
            <a-input-password v-model:value="formState.password" placeholder="密码：123456">
                <template #prefix>
                    <LockOutlined class="icon" type="user" />
                </template>
            </a-input-password>
        </a-form-item>
        <a-button :disabled="disabled" htmlType="submit" shape="round" block type="primary" @click="onSubmit">确定
        </a-button>
    </a-form>
</template>
<style>
</style>