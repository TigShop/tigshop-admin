
export interface ProductBatchImageFormState {
    deal_range: number;
    is_replace: number;
    deal_type: number;
    range_ids: number[];
}

export interface ProductBatchExportFormState {
    deal_range: number;
    deal_type: number;
    range_ids: number[];
}

export interface ProductBatchModifyFormState {
    is_auto_cat: number;
    is_auto_brand: number;
    is_change_pic: number;
    is_upload: number;
    file: string;
}