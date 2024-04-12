export interface statisticsOrdeFilterParams {
    start_end_time: string;
    date_type: string;
    statistic_type: string;
    is_export?: string;
}

export interface statisticsOrdeFilterState {
    sales_data: SalesData;
    sales_statistics_data: SalesStatisticsData;
    errcode: number;
    message: string;
}

export interface SalesData {
    product_payment: number;
    product_payment_growth_rate: string;
    product_refund: number;
    product_refund_growth_rate: string;
    turnover: number;
    turnover_growth_rate: string;
    recharge_amount: number;
    recharge_amount_growth_rate: string;
    balance_payment: number;
    balance_payment_growth_rate: string;
}

export interface SalesStatisticsData {
    horizontal_axis: string[];
    longitudinal_axis: number[];
}
