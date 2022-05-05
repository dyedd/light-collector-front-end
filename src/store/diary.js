import {
  defineStore
} from 'pinia'
export const useDiaryStore = defineStore('diary', {
  // a function that returns a fresh state
  state: () => {
    return {
      list: [{
          id: 1,
          time: "2022/05/04",
          content: "测试",
          screenX: '',
          screenY: '',
          status: '',
        },
        {
          id: 2,
          time: "2022/05/04",
          content: "测试",
          screenX: '',
          screenY: '',
          status: '',
        }, {
          id: 3,
          time: "2022/05/04",
          content: "测试",
          screenX: '',
          screenY: '',
          status: '',
        }, {
          id: 4,
          time: "2022/05/04",
          content: "测试",
          screenX: '',
          screenY: '',
          status: '',
        }, {
          id: 5,
          time: "2022/05/04",
          content: "测试",
          screenX: '',
          screenY: '',
          status: '',
        },
      ]
    }
  },
  persist: true,
  getters: {},
  actions: {
    updateDiary(data) {
      const {
        id,
        screenX,
        screenY
      } = data
      let index = this.list.findIndex((item) => item.id == id);
      this.list[index]['screenX'] = screenX
      this.list[index]['screenY'] = screenY
    },
    delDiary(id) {
      // console.log(id);
      let index = this.list.findIndex((item) => item.id == id);
      // console.log(index);
      this.list.splice(index, 1);
    },
    addDiary(data) {
      console.log(data);
      const {
        content
      } = data;
      let myDate = new Date()
      this.list.push({
        id: this.list.length>0?this.list[this.list.length - 1].id + 1:0,
        time: `${myDate.getFullYear()}/${myDate.getMonth()+1}/${myDate.getDate()}`,
        content: content,
      })
    },
  },
})