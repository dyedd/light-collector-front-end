<script setup>
import card from './Card.vue'
import axios from '@/utils/request';
import { useUserStore } from '@/store/user'
import { useMainStore } from '@/store/main'
import { onMounted, ref } from 'vue';
import { message, notification } from 'ant-design-vue';
import md5 from 'blueimp-md5'
import * as echarts from 'echarts/core';
import { HeatmapChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {
    TitleComponent,
    CalendarComponent,
    TooltipComponent,
    VisualMapComponent,
    GridComponent
} from "echarts/components";
import VChart from "vue-echarts";
const clientID = '4cd5a5790c693f92e09d13b79a7553409a7549107ebe67d40e32e68fc12ba009';
const redirectUri = 'http://localhost:5000/api/oauth/gitee';
const store = useUserStore()
const mainStore = useMainStore()
onMounted(() => {
    // console.log(store.user);
    if (store.user.categories == 1) {
        message.success('授权成功！')
    } else if (store.user.categories > 1) {
        notification['success']({
            message: '已经绑定过了',
            description: '如果想要更新，就再绑定一次',
        });
    }
})
const github = async () => {
    console.log(`https://gitee.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code`);
    window.location.href = `https://gitee.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code`
}
echarts.use([
    TitleComponent,
    CalendarComponent,
    TooltipComponent,
    VisualMapComponent,
    HeatmapChart,
    CanvasRenderer,
    GridComponent,
    UniversalTransition,
    LineChart
]);
const getVirtulData = (year) => {
    year = year || '2022';
    const data = [];
    for (let i = 0; i < store.record.length; ++i) {
        data.push([
            `${store.record[i]['year']}-${store.record[i]['month']}-${store.record[i]['day']}`,
            Math.floor(Math.random() * 10000)
        ])
    }
    console.log(store.record);
    console.log(data);
    return data;
}
const option = ref({
    title: {
        left: 'center',
        text: '2022年登录记录'
    },
    visualMap: {
        show: false,
        min: 0,
        max: 10000
    },
    calendar: {
        range: '2022'
    },
    series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtulData('2022')
    }
})
let day
if (store.record.length > 7) {
    day = store.record.slice(-7, -1)
} else {
    day = store.record
}

const day7 = {}
day7['x'] = []
day7['y'] = []
console.log(day);
const len = store.record.length > 7 ? 7 : store.record.length
console.log(len);
for (let i = 0; i < len; ++i) {
    day7['x'].push(`${day[i]['month']}-${day[i]['day']}`)
    day7['y'].push(day[i]['hours'])
}
console.log(day7);
const option2 = ref({
    title: {
        left: 'center',
        text: '最近7天登录时间'
    },
    xAxis: {
        type: 'category',
        data: day7['x']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: day7['y'],
            type: 'line'
        }
    ]
})
</script>
<template>
    <card cardTitle="账号绑定">
        <template #body>
            <a-button type="primary" shape="circle" size="large" @click="github">
                <template #icon>
                    <icon-font class="select-icon" type="icongitee2" />
                </template>
            </a-button>
        </template>
    </card>
    <v-chart class="chart" :option="option" />
    <v-chart class="chart" :option="option2" />
</template>
<style lang="scss">

.chart {
    height: 400px;
}
</style>