<script setup>
import { reactive, ref, computed,inject } from "vue";
import mybus from "@/utils/myBus";
import { useUserStore } from '@/store/user'
import { message } from "ant-design-vue";
import axios from '@/utils/request';
const store = useUserStore()
const formState = reactive({
    name: "",
    password: "",
    password2: "",
    email: "",
});
let validateEmail = async (rule, value) => {
    let reg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    if (value === "") {
        return Promise.reject("请输入邮箱");
    } else {
        if (!reg.test(value)) {
            return Promise.reject("格式错误");
        }
        return Promise.resolve();
    }
};
let validatePassword = async (rule, value) => {
    if (value === "") {
        return Promise.reject("请再次输入密码");
    } else {
        if (value != formState.password) {
            return Promise.reject("两次密码不一致");
        }
        return Promise.resolve();
    }
};
const rules = {
    name: [
        {
            required: true,
            message: "请输入用户名",
            trigger: "change",
        },
    ],
    email: [
        {
            required: true,
            validator: validateEmail,
            trigger: "change",
        },
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: "change",
        },
    ],
    password2: [
        {
            required: true,
            validator: validatePassword,
            trigger: "change",
        },
    ],
};
const onSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            axios.post("http/api/user", formState).then((res) => {
                if (res.data.code == 500) {
                    message.error(res.data.msg)
                } else {
                    message.success(res.data.msg)
                }
            });
            formRef.value.resetFields();
            mybus.emit("open", false);
            location.reload()
        })
        .catch((error) => {
            message.error(error)
            console.log("error", error);
        });

};
const formRef = ref();
const disabled = computed(() => {
    return !(formState.name && formState.email && formState.password && formState.password2);
});
</script>
<template>
    <a-form :model="formState" :rules="rules" ref="formRef" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item has-feedback name="name" label="用户名称">
            <a-input v-model:value="formState.name" placeholder="创建一个用户名">
            </a-input>
        </a-form-item>
        <a-form-item has-feedback name="email" label="注册邮箱">
            <a-input v-model:value="formState.email" placeholder="输入一个邮箱">
            </a-input>
        </a-form-item>
        <a-form-item name="password" label="注册密码">
            <a-input-password v-model:value="formState.password" placeholder="输入密码">
            </a-input-password>
        </a-form-item>
        <a-form-item name="password2" label="重复密码">
            <a-input-password v-model:value="formState.password2" placeholder="再次确定密码">
            </a-input-password>
        </a-form-item>
        <a-button :disabled="disabled" shape="round" htmlType="submit" block type="primary" @click="onSubmit">确定
        </a-button>

    </a-form>
</template>