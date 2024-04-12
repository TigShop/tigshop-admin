<template>
    <div>
        <div class="title">自定义图标库：</div>
        <div class="link-style">
            <div v-for="(item, index) in icoDefindList" :key="index" :class="{ 'active': selectedItem === definedClass + ' ' + item }" class="list-title"
                @click="selectItem(definedClass + ' ' + item)">
                <div class="right-ico">
                    <em :class="'main_pel_m ' + definedClass + ' ' + item"></em>
                </div>
            </div>
        </div>
        <div class="title" style="margin-top:20px">官方图标库：</div>
        <div class="link-style">
            <div v-for="(item, index) in icoTigList" :key="index" :class="{ 'active': selectedItem === tigClass + ' ' + item }" class="list-title"
                @click="selectItem(tigClass + ' ' + item)">
                <div class="right-ico">
                    <em :class="'main_pel_m ' + tigClass + ' ' + item"></em>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, onMounted } from "vue";
import { useConfigStore } from "@/store/config";
import { getIcon } from "@/api/setting/config"
import { message } from 'ant-design-vue'
import { useLoadCss } from '@/utils/domUtils'
onMounted(() => {
    loadIco()
})
const configStore = useConfigStore();
if (configStore.config.ico_defined_css) {
    useLoadCss(configStore.config.ico_defined_css)
}
const icoTigList = ref([]);
const icoDefindList = ref([]);
const definedClass = ref(<string>'');
const tigClass = ref(<string>'');
const loadIco = async () => {
    try {
        const result = await getIcon();
        icoTigList.value = result.ico_tig
        tigClass.value = result.tig_class
        icoDefindList.value = result.ico_defined
        definedClass.value = result.defined_class
    } catch (error) {
        message.error(error.message);
    } finally {
    }

}
const list = ref(['icon-tongzhi', 'icon-shuaxin1']);
const props = defineProps({
    selected_ico: {
        type: String,
        default: ''
    }
});
const selectedItem = ref(props.selected_ico); // 使用 ref 来存储选中项的值

const selectItem = (value) => {
    selectedItem.value = value; // 更新 selectedItem 的值
    onFormSubmit();
};

const emit = defineEmits(["submitCallback"]);

const onFormSubmit = () => {
    // 弹窗确认按钮提交
    emit("submitCallback", selectedItem.value);
};

defineExpose({
    onFormSubmit
});
</script>
<style lang="less" scoped>
.title {
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 20px;
}

.link-style {
    display: flex;
    gap: 10px;
    flex-direction: row;
    flex-wrap: wrap;

    .list-title {
        width: 60px;
        height: 60px;
        display: flex;
        box-sizing: border-box;
        border-radius: 4px;
        justify-content: start;
        line-height: 60px;
        cursor: pointer;
        border: 1px solid #eee;
        transition: all .3s;

        .right-ico {
            flex: 1;
            text-align: center;
        }

        em {

            font-size: 20px;
        }
    }

    .list-title.active {
        border: 1px solid #428ce8;
        color: #428ce8;
    }

    .box {
        border: 1px solid #eee;
        border-radius: 3px;
        padding: 0 0 4px 0;
        white-space: nowrap;
    }

}
</style>
