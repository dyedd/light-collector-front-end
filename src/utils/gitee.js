import * as dayjs from 'dayjs'
import axios from '@/utils/request';
const gitee = (data, userStore) => {

    const update_date = dayjs(userStore.user['updateAt'])
    // console.log(Math.abs(update_date.diff(dayjs(), 'hour')));
    if (Math.abs(update_date.diff(dayjs(), 'hour')) > 24) {
        const refresh_token = userStore.user['gitee_refresh_token']
        axios.post(`giteeUrl/oauth/token?grant_type=refresh_token&refresh_token=${refresh_token}`).then((res) => {
            if (res.status == 200) {
                message.success('获取成功')
                console.log(res.data);
                //   categoryStore.setInfo(res.data)
            }
        })
    } else {
        console.log('yes');
    }
    for (const ele of data) {

        for (const reposArr of ele.repos) {
            console.log(reposArr, 1);
            // api/v5/repos/
            // https://gitee.com/oauth/token?grant_type=refresh_token&refresh_token={refresh_token}
            // console.log(reposArr['full_name']);
            axios.get(`giteeUrl/api/v5/repos/${reposArr['full_name']}`).then((res) => {
                if (res.status == 200) {
                    message.success('获取成功')
                    console.log(res.data);
                    reposArr['created_at'] = res.data['created_at']
                    reposArr['stargazers_count'] = res.data['stargazers_count']
                    console.log(data,3333);
                    return data
                    // created_at stargazers_count
                    //   categoryStore.setInfo(res.data)
                }
            })

        }
    }
}
export default gitee;