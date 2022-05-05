import {
    defineStore
  } from 'pinia'
  export const useCategoryStore = defineStore('category', {
    state: () => {
      return {
        information: [{
            "_id": "F6150067326c5f0d4d1056422",
            "name": "未分类",
            "repos": [],
            "uid": 9999,
            "createdAt": "2022-04-21T05:34:43.048Z",
            "updatedAt": "2022-04-21T06:33:12.411Z"
          },
          {
            "_id": "F615009d926c5f0d4d1056425",
            "name": "未分类",
            "repos": [
              {
                "full_name": "Dye/lanstar",
                "index": 0
              },
              {
                "full_name": "Dye/lanstar",
                "index": 1
              },
              {
                "full_name": "Dye/lanstar",
                "index": 2
              },
            ],
            "uid": "KaysenLai",
            "createdAt": "2022-04-21T05:49:13.221Z",
            "updatedAt": "2022-04-21T05:49:13.221Z"
          },
          {
            "_id": "F61500a5926c5f0d4d1056426",
            "name": "未分类",
            "repos": [
              {
                "full_name": "Dye/lanstar",
                "index": 0
              },
              {
                "full_name": "Dye/lanstar",
                "index": 1
              },
              
            ],
            "uid": 99999,
            "createdAt": "2022-04-21T05:51:21.196Z",
            "updatedAt": "2022-04-21T05:51:21.196Z"
          },
      
          {
            "_id": "F615015fb1e193378055a1916",
            "name": "前端",
            "repos": [
              {
                "full_name": "Dye/lanstar",
                "index": 0
              }
            ],
            "uid": 9999,
            "createdAt": "2022-04-21T06:40:59.391Z",
            "updatedAt": "2022-04-21T06:42:48.695Z"
          }],
      }
    },
    // persist: true,
    getters: {
  
    },
    actions: {
      setInfo(data) {
        this.information = data
      },
      addInfo(data) {
        this.information.push(data)
      }
    },
  })