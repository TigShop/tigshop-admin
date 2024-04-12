import request from '@/utils/request';

// 获取秒杀商品列表
export const getMobileSeckillList = (params: object) => {
    return request({
        url: 'demo',
        method: 'get',
        params
    })
}