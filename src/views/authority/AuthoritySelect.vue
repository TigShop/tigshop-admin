<template>
    <div class="right-body">
        <div class="title">
            <div class="left-div">
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isCheckAll"
                  @change="handleCheckAll">
                    <span style="font-weight: 500">全选</span>
                </el-checkbox>
            </div>
            <div class="right-div">权限列表</div>
        </div>
        <a-spin :spinning="loading" style="width:100%;margin-top:100px"></a-spin>
        <template v-if="!loading">
            <div v-for="item in authorityList" :key="item.authority_id" class="info">
                <div class="left-div">
                    <el-checkbox
                      v-model="item.is_check"
                      :indeterminate="item.indeterminate"
                      @change="() => handleCheck(item)">
                        <span style="font-weight: 500">{{ item.authority_name }}</span>
                    </el-checkbox>
                </div>
                <div class="right-div">
                    <div v-for="value in item.children" :key="value.authority_id">
                        <el-checkbox
                          v-model="value.is_check"
                          @change="() => handleCheck(item, value)">
                            <span>{{ value.authority_name }}</span>
                        </el-checkbox>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {AuthorityFormState} from "@/types/authority/authority";
import {getAllAuthority} from "@/api/authority/authority";
import {message} from "ant-design-vue";

const loading = ref<boolean>(true);
const checkAll = ref(false);
const isCheckAll = ref(false);
const props = defineProps({
    modelValue: {type: Array, default: []}
})
const emit = defineEmits(['update:modelValue'])
const authorityList = ref<AuthorityFormState[]>([]);

const handleCheckAll = () => {
    isCheckAll.value = false
    authorityList.value.forEach(item => {
        item.is_check = checkAll.value;
        item.indeterminate = false;
        if (item.children) {
            item.children.forEach(child => {
                child.is_check = checkAll.value;
            });
        }
    });
    getSelectedAuthoritySn()
};

const handleCheck = (parent:any, child?:any) => {
    if (child) {
        // 处理子项目点击
        const allChecked = parent.children.every((c:any) => c.is_check);
        const anyChecked = parent.children.some((c:any) => c.is_check);
        parent.is_check = allChecked;
        parent.indeterminate = !allChecked && anyChecked;
    } else {
        // 处理父项目点击
        if (parent.children) {
            parent.children.forEach((c:any) => {
                c.is_check = parent.is_check;
            });
        }
        parent.indeterminate = false; // 点击父项目时移除不确定状态
    }
    // 更新全选状态
    checkAll.value = authorityList.value.every(p => p.is_check);
    isCheckAll.value = !checkAll.value && authorityList.value.some(p => p.is_check || p.indeterminate);
    getSelectedAuthoritySn()
};


const getSelectedAuthoritySn = () => {
    // 当全选为真时，直接返回 ['all']
    let selectedSn:any = []; // 定义一个空数组来存储被选中项的 authority_sn
    if (checkAll.value) {
        selectedSn = ['all']
    } else {
        // 遍历 authorityList 来检查哪些项被选中了
        authorityList.value.forEach(parentItem => {
            if (parentItem.is_check) {
                selectedSn.push(parentItem.authority_sn); // 收集被选中的父项 authority_sn
            }
            if (parentItem.children && parentItem.children.length > 0) {
                // 如果父项未被选中，检查其子项
                parentItem.children.forEach(childItem => {
                    if (childItem.is_check) {
                        selectedSn.push(childItem.authority_sn); // 收集被选中的子项 authority_sn
                    }
                });
            }
        });
    }
    emit('update:modelValue', selectedSn)


}

const getAllAuthorityList = async () => {
    try {
        const result = await getAllAuthority({type: 1});
        authorityList.value = result.item;
        addProperties(authorityList.value);
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};

function addProperties(arr:any) {
    arr.forEach((item:any) => {
        item.is_check = false;
        if (item.children && item.children.length > 0) {
            item.indeterminate = false;
            addProperties(item.children);
        }
    });
}


onMounted(() => {
    getAllAuthorityList().then(() => {
        if (props.modelValue) {
            if (props.modelValue.includes('all')) {
                checkAll.value = true;
                handleCheckAll(); // 这将选中所有项
            } else {
                // 遍历 authorityList 并检查 props.modelValue 中的每个项
                authorityList.value.forEach(parentItem => {
                    // 检查父项是否应该被选中
                    if (props.modelValue.includes(parentItem.authority_sn)) {
                        parentItem.is_check = true;
                    }
                    // 如果有子项，同样检查每个子项
                    if (parentItem.children && parentItem.children.length > 0) {
                        parentItem.children.forEach(childItem => {
                            if (props.modelValue.includes(childItem.authority_sn)) {
                                childItem.is_check = true;
                                parentItem.indeterminate = true; // 如果任何子项被选中，设置父项为半选状态
                            }
                        });
                    }
                });
                if (props.modelValue.length > 0) {
                    isCheckAll.value = true
                }
            }
        }
    });
});
</script>

<style lang="less" scoped>
.right-body {
    display: flex;
    width: 100%;
    flex-direction: column;

    .title {
        height: 60px;
        background-color: #F5F6FA;
        display: flex;
        flex-direction: row;
        padding: 16px;
        box-sizing: border-box;
        font-weight: 500;
    }

    .left-div {
        min-width: 170px;
        font-weight: 500;
    }

    .info {
        padding: 16px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #f0f0f0;
    }

    .right-div {
        display: flex;
        width: 100%;
        flex-wrap: wrap; /* 允许项目换行 */
        justify-content: flex-start; /* 项目在主轴上的对齐方式 */
    }

    .right-div > div {
        width: calc(25% - 10px); /* 四个项目占满 100% 宽度，减去一些边距 */
    }
}
</style>
