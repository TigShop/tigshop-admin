import request from '@/utils/request';
import requestExport from '@/utils/export';
import type { newMemberFilterParams, newMemberFilterState } from '@/types/panel/newMembers.d';

// 新增会员数据
export const getAddUserTrends = (params: newMemberFilterParams) => {
    return request<newMemberFilterState>({
        url: 'panel/statistics_user/add_user_trends',
        method: 'get',
        params,
    });
}

export const exportAddUserTrends = (params: newMemberFilterParams) => {
   return requestExport({
       url: 'panel/statistics_user/add_user_trends',
       params,
   })
}