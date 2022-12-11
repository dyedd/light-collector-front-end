import {
  defineStore
} from 'pinia'
import { setStorage } from '@/utils/storage';
export const useUserStore = defineStore('user', {
  // a function that returns a fresh state
  state: () => {
    return {
      user: {
        isLogin: false
      },
      integral: 10,
      record: [{
        year: 2022,
        month: 2,
        day: 21,
        hours: 18,
        minutes: 30,
      },{
        year: 2022,
        month: 3,
        day: 21,
        hours: 18,
        minutes: 30,
      },{
        year: 2022,
        month: 4,
        day: 21,
        hours: 19,
        minutes: 30,
      }]
    }
  },
  // persist: true,
  getters: {},
  actions: {
    setLocalStage(token){
      setStorage({
        key: "token",
        data: token,
    });
    },
    setUser(data) {
      this.user = {
        ...this.user,
        isLogin: true,
        ...data
      }
    },
    addIntegral() {
      this.integral += 10
    },
    addRecord() {
      const myData = new Date()
      this.record.push({
        year: myData.getFullYear(),
        month: myData.getMonth() + 1,
        day: myData.getDate(),
        hours: myData.getHours(),
        minutes: myData.getMinutes()
      })
      console.log(this.record);
    }
  },
})