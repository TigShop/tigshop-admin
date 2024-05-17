<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <div class="notice-warp">
                        <p> 提示：</p>
                        <p> 1、导出的文件可编辑后进行修改后再通过“商品批量上传”或“商品批量修改修改”功能完成批量导入或修改</p>
                        <p> 2、LYECS系统解决了CSV导入导出时的','号和'"'号的问题，所以商品描述和商品介绍处可以不用再对这些符合进行额外处理！</p>
                    </div>
                    <div class="lyecs-form-table">
                        <el-form :model="formState" label-width="auto">
                            <el-form-item label="处理范围">
                                <SelectGoodsRange v-model:rangeType="formState.deal_range"  v-model:rangeIds="formState.range_ids" type="productBatch"></SelectGoodsRange>
                            </el-form-item>
                            <el-form-item label=" ">
                                <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit()" :loading="Exportloading">提交</el-button>
                                <el-button ref="submitBtn" class="form-submit-btn">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@/style/css/list.less'
import {onMounted, reactive, ref} from 'vue';
import SelectGoodsRange from "@/components/select/src/SelectGoodsRange.vue";
import {ProductBatchExportFormState} from '@/types/product/productBatch.d';
import {productBatchExportSubmit} from '@/api/product/productBatch';
import { message } from "ant-design-vue";
import requestExport from "@/utils/export";
const formState = reactive<ProductBatchExportFormState>({   //初使化用于查询的参数
    deal_range: 0,
    deal_type: 0,
    range_ids: []
});
const Exportloading = ref<boolean>(false)
const onSubmit = async () => {
    if(formState.deal_range == 1 && formState.range_ids.length < 1){
        message.error('请选择分类');
        return;
    }
    if(formState.deal_range == 2 && formState.range_ids.length < 1){
        message.error('请选择品牌');
        return;
    }
    if(formState.deal_range == 3 && formState.range_ids.length < 1){
        message.error('请选择商品');
        return;
    }
    Exportloading.value = true;
    try {
        const result = await productBatchExportSubmit({...formState});
        Exportloading.value = false;
        requestExport(result,'商品批量导出')
      await productBatchExportSubmit({...formState});
    } catch (error:any) {
        message.error(error.message);
    }
};


</script>
<style lang="less" scoped>
.notice-warp {
    background-color: #eef2ff;
    border-radius: 9px;
    padding: 15px;
    margin-bottom: 20px;
    line-height: 24px;
}

.lyecs-form-table {
    padding: 14px 0;
    background: #fff;
    border-radius: 6px;
    display: flex;
    align-content: center;
    margin-left: 30px;
}
</style>
