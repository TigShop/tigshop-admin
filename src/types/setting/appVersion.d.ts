export interface AppVersionFormResult {
    item: AppVersionFormState;
}

export interface AppVersionFormState {
    android_link?: string;
    android_version?: string;
    ios_link?: string;
    ios_version?: string;
    hot_update_type?: number;
    hot_update_link?: string;
}
