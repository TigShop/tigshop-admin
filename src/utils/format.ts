import { useConfigStore } from "@/store/config";

// 格式化图片地址
export function imageFormat(path: string | undefined) {
    const config = useConfigStore();
    if (!path) {
        return "";
    }
    if (Number(config.get("storage_type")) > 0) {
        return path.includes("http") !== false ? path : config.get("storage_url") + path;
    } else {
        return path.includes("http") !== false ? path : "" + path;
    }
}
// 格式化金额
export function priceFormat(price: number | undefined, currencyFormat = true) {
    const config = useConfigStore();
    const currency = config.get("dollar_sign") ?? "¥";
    price = price ? price : 0;
    const num = typeof price === "string" ? parseFloat(price) : price;
    if (currencyFormat) {
        return currency + "" + num.toFixed(2);
    } else {
        return num.toFixed(2);
    }
}

// 链接格式化
export function urlFormat(params: string | { path: string; [key: string]: any; platform: string }): string {
    const config = useConfigStore();
    const domain = config.get("pc_domain") ? config.get("pc_domain") : config.get("h5_domain");
    if (typeof params === "string") {
        return domain + params;
    } else {
        switch (params.path) {
            case "product":
                return domain + "/item/?id=" + params.id + "";
            default:
                return domain + params.path;
        }
    }
}
export function urlWapFormat(params: string | { path: string; [key: string]: any }): string {
    const config = useConfigStore();
    const domain = config.get("h5_domain") ? config.get("h5_domain") : "";
    if (typeof params === "string") {
        return domain + params;
    } else {
        switch (params.path) {
            case "product":
                return domain + "/item/?id=" + params.id + "";
            default:
                return domain + params.path;
        }
    }
}
