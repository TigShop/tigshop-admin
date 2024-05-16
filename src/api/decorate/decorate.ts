import request from "@/utils/request";
// 获取未完成编辑
export const loadDraftData = (id: number) => {
    return request({
        url: "decorate/decorate/load_draft_data",
        method: "get",
        params: {
            id,
        },
    });
};

export const saveDraft = (data: object) => {
    return request({
        url: "decorate/decorate/save_draft",
        method: "post",
        data,
    });
};
