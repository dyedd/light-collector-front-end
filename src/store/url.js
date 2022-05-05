import {
  defineStore
} from 'pinia'
import bilibili from "@/assets/icon/bilibili.png";
import zhihu from "@/assets/icon/zhihu.png";
import Baidu from "@/assets/icon/baidu.svg";
import taobao from "@/assets/icon/taobao.png";
import it from "@/assets/icon/it.png";
import github from "@/assets/icon/github.png";
import niuke from "@/assets/icon/niuke.png";
import boss from "@/assets/icon/boss.png";
export const useUrlStore = defineStore('url', {
  // a function that returns a fresh state
  state: () => {
    return {
      list: [{
          id: 1,
          url: "https://www.bilibili.com/",
          src: bilibili,
          title: "哔哩哔哩",
          num: 0
        },
        {
          id: 2,
          url: "https://www.zhihu.com/",
          src: zhihu,
          title: "知乎",
          num: 0
        },
        {
          id: 3,
          url: "https://www.baidu.com",
          src: Baidu,
          title: "百度",
          num: 0
        },
        {
          id: 4,
          url: "https://www.taobao.com/",
          src: taobao,
          title: "淘宝",
          num: 0
        },
        {
          id: 5,
          url: "https://www.ithome.com/",
          src: it,
          title: "IT之家",
          num: 0
        },
        {
          id: 6,
          url: 'https://github.com/dyedd',
          src: github,
          title: "Github",
          num: 4
        },
        {
          id: 7,
          url: "https://www.nowcoder.com/",
          src: niuke,
          title: "牛客网",
          num: 2
        },
        {
          id: 8,
          url: "https://www.zhipin.com/",
          src: boss,
          title: "Boss直聘",
          num: 0
        }
      ]
    }
  },
  persist: true,
  getters: {
    getList() {
      return Object.values(this.list).sort((x, y) => {
        return y.num - x.num
      })
    }
  },
  actions: {
    addNum(id) {
      const res = this.list.find((v) => v.id == id)
      res.num++;
    },
    modUrl(id, data) {
      const res = this.list.find((v) => v.id == id)
      const {
        url,
        src,
        title
      } = data
      res.url = url;
      res.src = src;
      res.title = title;
    },
    addUrl(data) {
      const {
        url,
        src,
        title
      } = data
      this.list.push({
        id: this.list[this.list.length - 1].id + 1,
        url: url,
        src: src,
        title: title,
        num: 0
      })
    },
    delUrl(id) {
      // console.log(id);
      let index = this.list.findIndex((item) => item.id == id);
      // console.log(index);
      this.list.splice(index,1);
    },
  },
})