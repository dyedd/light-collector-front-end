import {
  defineStore
} from 'pinia'
export const useEngineStore = defineStore('enginie', {
  // a function that returns a fresh state
  state: () => {
    return {
      list: [{
          id: 1,
          title: "百度",
          icon: "iconbaidusousuo",
          url: "https://www.baidu.com/s?wd=",
        },
        {
          id: 2,
          title: "必应",
          icon: "iconBing",
          url: "https://cn.bing.com/search?q=",
        },
        {
          id: 3,
          title: "谷歌",
          icon: "iconguge",
          url: "https://www.google.com/search?q=",
        },
        {
          id: 4,
          title: "360",
          icon: "icon360",
          url: "https://www.so.com/s?q=",
        },
      ]
    }
  },
  persist: true,
  getters: {},
  actions: {
    addEngine(data) {
      const {
        title,
        icon,
        url
      } = data;
      this.list.push({
        id: this.list[this.list.length - 1].id + 1,
        url: url,
        icon: icon,
        title: title,
        num: 0
      })
    },
    delEngine(id) {
      // console.log(id);
      let index = this.list.findIndex((item) => item.id == id);
      // console.log(index);
      this.list.splice(index, 1);
    },
  },
})