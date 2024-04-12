import { requestUrl } from "@/utils/request";

export function requestExport(config: any) {
    let jsonStr;
    console.log('config', config)
    if (config.params) {
        jsonStr = JSON.stringify(config.params);
    } else {
        jsonStr = JSON.stringify(config.data);
    }
    let strLength = jsonStr.length;
    let subStr = jsonStr.substring(1, strLength - 1);
    let finalStr = subStr.replace(/"/g, "").replace(/:/g, "=").replace(/,/g, "&");
    window.open(requestUrl.prefix + "/" + config.url + "?" + finalStr);
}

export default requestExport;
