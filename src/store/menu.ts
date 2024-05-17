import { defineStore } from "pinia";
import type {MainMenu} from "@/types/common/common.d";
export interface useMenus {
	mainMenu:MainMenu[];
    menuActive: boolean
}

export const useMenusStore = defineStore("menus", {
    state: () => {
        return<useMenus> {
            mainMenu: [],
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
