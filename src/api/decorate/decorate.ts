import request from "@/utils/request";
// 获取示例模板列表
export const loadDraftData = (id: number) => {
    return request({
        url: "decorate/load_draft_data",
        method: "post",
        data: {
            id,
        },
    });
};

export const saveDraft = (data: object) => {
    return request({
        url: "decorate/save_draft",
        method: "post",
        data,
    });
};
