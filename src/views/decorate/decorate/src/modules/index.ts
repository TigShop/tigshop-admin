export { default as CommonTitle } from './src/CommonTitle.vue';
import { ModuleFrameType, ModuleTitleType } from '@/types/decorate/decorate.d';
import { imageFormat } from "@/utils/format";
import { cloneDeep } from 'lodash';

// 模块设置默认值
export const defaultFrame = {
    'text_color': '',
    'item_background_color': '',
    'background_color': '#ffffff',
    'inner_padding': 0,
    'item_height': 35,
    'item_radius': 3,
    'box_radius': 0,
    'box_padding': 10,
    'box_padding_top': 5,
    'box_padding_bottom': 5,
}
// 格式化模块设置
export const formatFrame = (frame: ModuleFrameType) => {
    return {
        'inner_padding': 'padding:' + frame.inner_padding + 'px;',
        'box_padding': 'padding-left:' + frame.box_padding + 'px;padding-right:' + frame.box_padding + 'px;',
        'box_padding_top': 'padding-top:' + frame.box_padding_top + 'px;',
        'box_padding_bottom': 'padding-bottom:' + frame.box_padding_bottom + 'px;',
        'background_color': frame.background_color ? 'background-color:' + frame.background_color + ';' : '',
        'box_radius': 'border-radius:' + frame.box_radius + 'px;',
    }
}
// 标题默认值
export const defaultTitle = {
    'show_title': 0,
    'title_style': 1,
    'title_align': 1,
    'title_background': '',
    'title_background2': '',
    'title_background_pic': {
        'pic_url': '',
        'pic_thumb': '',
    },
    'title_radius': 0,
    'title_text': '标题内容',
    'title_color': '',
    'desc_text': '描述内容',
    'desc_color': '#aaaaaa',
    'show_more': 0,
    'more_link': [],
    'more_color': '#aaaaaa',
    'format': {
        'title_background': '',
        'title_radius': '',
    }
}
// 商品默认值
export const defaultProducts = {
    'product_select_type': 1,
    'product_ids': [],
    'product_category_id': [],
    'product_number': 0,
    'product_tag': ''
}
// 公告图标图片
export const defaultIcoPic = {
    'pic_url': '',
    'pic_thumb': '',
}
// 背景图
export const defaultBackgroundPic = {
    'pic_url': '',
    'pic_thumb': '',
}
// 格式化标题
export const formatTitle = (title: ModuleTitleType) => {
    return {
        'title_background': title.title_background ? 'background-color:' + title.title_background + ';' : '',
        'title_radius': 'border-radius:' + title.title_radius + 'px ' + title.title_radius + 'px ' + '0 0;',
    }
}
// 合并默认值
export const mergeDefaultModule = (module:any, defaultModule:any) => {
    defaultModule=cloneDeep(defaultModule);
    Object.keys(defaultModule).forEach(key => {
        if (module[key] === undefined || module[key] === null || module[key] === '') {
            module[key] = defaultModule[key];
        }
    });
}

