import { defineStore } from 'pinia'
import router from '@/router'
import { useMenusStore } from "@/store/menu";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userInfo: {
                'user_id': '',
                'avatar': '',
                'username': '',
                'auth_list': '',
                'store_id': '',
                'parent_id': '',
                'suppliers_id': '',
                'last_time': '',
            },
            messageCount: 0,
            accessToken: '',
        }
    },
    getters: {
        getAccessToken(state) {
            return state.accessToken;
        }
    },
    actions: {
        logout(jump = true) {
            localStorage.removeItem('accessToken')
            this.messageCount = 0;
            if (jump == true) router.push('/login/');
        },
        setUserInfo(data:any) {
            console.log(data)
            this.userInfo = data
        },
        clearCache() {
            // 清除菜单栏的缓存，刷新页面后会自动更新
            const menus = useMenusStore();
            menus.mainMenu = null;
        },
        setAccessToken(token: string) {
            this.accessToken = token
        },
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: sessionStorage, paths: ['details', 'messageCount'] }, //用sessionStorage存储
            { storage: localStorage, paths: ['accessToken','userInfo'] }, // 用 localstorage存储
        ],
    }
})