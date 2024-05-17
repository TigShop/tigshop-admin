// 下划线转大驼峰
export function toPascalCase(str: string): string {
    const words = str.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join("");
}
// 首字母转大写
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const fillZero = (value: number) => {
    return value >= 10 ? value : `0${value}`;
};

export const isNumber = (value: unknown): value is number => {
    return typeof value === "number";
};

export function formatDate(value: Date | number | string | undefined | null, isSecond = false): string | undefined {
    if (!value) {
        return undefined;
    }
    const date = value instanceof Date ? value : new Date(value);
    const year = date.getFullYear();
    const month = fillZero(date.getMonth() + 1);
    const day = fillZero(date.getDate());
    const hour = fillZero(date.getHours());
    const minute = fillZero(date.getMinutes());
    const second = fillZero(date.getSeconds());

    return isSecond ? `${year}-${month}-${day} ${hour}:${minute}:${second}` : `${year}-${month}-${day}`;
}

export function getDays(day: any, type: string) {
    const date = new Date();
    if (type === "sub") {
        date.setTime(date.getTime() - 3600 * 1000 * 24 * day);
    }
    if (type === "add") {
        date.setTime(date.getTime() + 3600 * 1000 * 24 * day);
    }
    return date;
}
// 获取assets静态资源
export const getAssetsFile = (url: any) => {
    return new URL(url, import.meta.url).href;
};
export function extractContent(str:string) {
    const keyword:string = "../assets/avatar/";
    const index = str.indexOf(keyword);
    if (index !== -1) {
        return str;
    } else {
        return "";
    }
}
