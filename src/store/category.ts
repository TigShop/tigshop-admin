import { defineStore } from 'pinia'
import request from '@/utils/request'

export const useCategoryStore = defineStore('category', {
    state: () => {
        return {
            allCategory: null,
        }
    },
    getters: {
    },
    actions: {
        /*
            //用法：
            new Promise(async () => {
                options.value = await store.getCategoryList();
            });
        */
        getCategoryList(flag: string) {
            if (this.allCategory === null || flag) {
                return new Promise((resolve) => {
                    request({
                        url: 'product/category/get_all_category',
                        method: 'get',
                        params: {
                        }
                    }).then((result: any) => {
                        this.allCategory = result.data
                        resolve(result.data);
                    })
                });
            } else {
                return this.allCategory
            }
        },
        clearCategory() {
            this.allCategory = null
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: sessionStorage, paths: [] }, //用sessionStorage存储
            { storage: localStorage, paths: ['allCategory'] }, // 用 localstorage存储
        ],
    }
})
