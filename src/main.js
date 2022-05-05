import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import {IconFont} from '@/utils/fonts';

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.component("IconFont",IconFont)
app.use(Antd).use(pinia).use(router).mount('#app')
