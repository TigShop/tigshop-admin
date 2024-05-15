import { defineStore } from "pinia";

export const useMenusStore = defineStore("menus", {
    state: () => {
        return {
            mainMenu: null,
            menuActive: false
        };
    },
    actions: {
        setMenus(data: any) {
            this.mainMenu = data;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            // { storage: sessionStorage, paths: [] }, //用sessionStorage存储
            { storage: localStorage, paths: ["mainMenu"] } // 用 localstorage存储（长效）
        ]
    }
});
