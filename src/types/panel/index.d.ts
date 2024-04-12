export interface panelIndexFilterState {
    console_data: ConsoleData;
    real_time_data: RealTimeData;
    panel_statistical_data: PanelStatisticalData;
    errcode: number;
    message: string;
}

export interface ConsoleData {
    await_pay: number;
    await_ship: number;
    await_after_sale: number;
    await_comment: number;
}

export interface PanelStatisticalData {
    horizontal_axis: string[];
    longitudinal_axis_access: number[];
    longitudinal_axis_order_num: number[];
    longitudinal_axis_order_amount: number[];
}

export interface RealTimeData {
    today_order_amount: number;
    order_amount_growth_rate: number;
    today_visit_num: number;
    visit_growth_rate: number;
    today_buyer_num: number;
    buyer_growth_rate: number;
    today_view_num: number;
    view_growth_rate: number;
    today_order_num: number;
    order_growth_rate: number;
}
