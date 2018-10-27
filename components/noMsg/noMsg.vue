<template>
    <div class="noMsg" v-show="list.length === 0">
        {{msgText}}
    </div>
</template>

<script>
export default {
    name: "noMsg",
    props: {
        list: Array,
        msg: String
    },
    data() {
        return {
            msgText: this.msg || "暂无数据"
        }
    }
}
</script>

<style scoped>
.noMsg{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
</style>
