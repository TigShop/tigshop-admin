import request from '@/utils/request';
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
   return request({
       url: 'panel/statistics_user/add_user_trends',
       method: "get",
       responseType: 'arraybuffer',
       params,
   })
}