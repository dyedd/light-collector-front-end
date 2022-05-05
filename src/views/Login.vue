<script setup>
import { computed, reactive, ref } from "vue";

import LoginScreen from '@/components/unauthenticated/login.vue';
import RegisterScreen from '@/components/unauthenticated/register.vue';
import { useUserStore } from '@/store/user'
import { useRouter } from "vue-router";
import mybus from "../utils/myBus";
const store = useUserStore()
const router = useRouter();
const props = defineProps({
  open: {
    type: Boolean,
    default: true
  },
})
const emit = defineEmits(['update:open'])
const handleCancel = () => {
  emit("update:open", false)
};
mybus.on("open", () => {
  emit("update:open", false)
});
const activeKey = ref('1')
</script>
<template>
  <a-modal v-model:visible="props.open" @cancel="handleCancel" width="40rem">
    <template #footer>

    </template>
    <div class="container">
      <div class="main">
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="1" tab="登录">
            <login-screen></login-screen>
          </a-tab-pane>

          <a-tab-pane key="2" tab="注册">
            <register-screen></register-screen>
          </a-tab-pane>
        </a-tabs>

      </div>
    </div>

  </a-modal>

</template>

<style lang="scss" scoped>
</style>
<style>
/* .ant-modal-footer {
  display: none;
} */

.ant-modal-content {
  border-radius: 1.5rem !important;
}
</style>