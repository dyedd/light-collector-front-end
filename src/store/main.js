import {
  defineStore
} from 'pinia'
export const useMainStore = defineStore('main', {
  state: () => {
    return {
      history: false,
      headBack:'https://s2.loli.net/2022/04/16/Cyl5Eaq3DIYf1zo.jpg',
    }
  },
  persist: true,
  getters: {

  },
  actions: {
    isStartHistory() {
      this.history = !this.history
    },
    setHeadBack(data){
      this.headBack = data;
    },
    setCss(data){
      this.cssSetting = data
    }
  },
})