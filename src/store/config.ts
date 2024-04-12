import { defineStore } from "pinia";

interface ConfigState {
    page_size: number;
    ico_defined_css: string;
    dollar_sign: string;
    storage_type: number;
    storage_url: string;
    pc_domain: string;
    h5_domain: string;
}

interface State {
    config: ConfigState;
    loaded: boolean;
    isStoreAdmin: boolean;
    domain: string;
}

export const useConfigStore = defineStore("config", {
    state: (): State => ({
        config: {
            page_size: 15,
            ico_defined_css: "//at.alicdn.com/t/c/font_400590_7he137t8862",
            dollar_sign: "¥",
            storage_type: 0,
            storage_url: "",
            pc_domain: "",
            h5_domain: "",
        },
        loaded: false,
        isStoreAdmin: false,
        domain: '',
    }),
    getters: {
        icoDefinedCss: (state: State): string => {
            return "https:" + state.config.ico_defined_css + ".css";
        },
        pageSize: (state: State): number => {
            return Number(state.config.page_size);
        },
    },
    actions: {
        setConfig(data: Partial<ConfigState>) {
            this.config = Object.assign({}, this.config, data);
        },
        getConfig(key: keyof ConfigState): ConfigState[keyof ConfigState] {
            return this.config[key];
        },
        // getConfig的简写方法
        get(key: keyof ConfigState): ConfigState[keyof ConfigState] {
            return this.config[key] as ConfigState[keyof ConfigState];
        },
    },
    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["config"] }],
    },
});
