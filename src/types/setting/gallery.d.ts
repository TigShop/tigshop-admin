export interface GalleryFilterParams {
    errcode:number;
    message:string;
    item: GalleryDetail;
}

export interface GalleryDetail {
    gallery_id?: number;
    parent_id?: number;
    gallery_admin_id?: number;
    gallery_name?: string;
    gallery_sort?: number;
    gallery_thumb?:string;
    store_id?: number;
}
export interface GalleryFormResult {
    errcode:number;
    message:string;
    filter_result: GalleryFormState[];
}

export interface GalleryFormState {
    gallery_id: number;
    parent_id: number;
    gallery_admin_id: number;
    gallery_name: string;
    gallery_sort: number;
    gallery_thumb: string;
    store_id: number;
    gallery_pics: any[]
}
