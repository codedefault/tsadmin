<template>
<div class="toolstrip-container">
    <slot name="toolstrip"></slot>
    <template v-if="showAddToWorkbenchBtn">
        <el-tooltip class="item" effect="dark" content="添加到工作台" placement="top">
            <span class="toolstrip-btn-add-to-workbench" @click="handleAddToWorkbench">
                <i class="star icon"></i>
            </span>
        </el-tooltip>
    </template>
    <div class="toolstrip-setting-container">
        <slot name="tsSettings"></slot>
    </div>
</div>
</template>
<script>
export default {
    props: {
        showAddToWorkbenchBtn: {
            type: Boolean,
            default: true
        }
    },
    methods:{
        handleAddToWorkbench(){
            this.$emit('add-workbench');
        }
    }
}
</script>
