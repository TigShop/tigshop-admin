import { defineStore } from 'pinia'
import request from '@/utils/request'
import { getRegionTreeList } from "@/api/setting/region";

export const useRegionStore = defineStore('region', {
    state: () => {
        return {
            allRegion: null,
        }
    },
    getters: {
    },
    actions: {
        getRegionList() {
            if (this.allRegion === null) {
                try {
                    const result = getRegionTreeList({});
                    result.then((result) => {
                        return this.allRegion = result.data
                    })
                } catch (error) {
                } finally {
                }
            } else {
                return this.allRegion
            }
        },
        clearRegion() {
            this.allRegion = null
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['allRegion'] }, // 用 localstorage存储
        ],
    }
})
