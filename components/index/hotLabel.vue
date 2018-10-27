<template>
    <div>
        <hr class="separate">
        <h2>热门标签</h2>
        <hr class="dotted">
        <ul class="label-list">
            <li v-for="(item, i) in list" :key="i">
                <nuxt-link :to="`/search?searchText=`+item.labelKeyword">{{item.labelKeyword}}</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "hotLabel",
    props: {
        list: Array
    }
};
</script>
<style scoped>
h2 {
    font-size: 16px;
    padding: 22px 0;
}

.label-list {
    text-align: left;
    /* height: 310px; */
    margin: 8px 0 50px;
}

li {
    /* float: left; */
    
    display:inline-block;
    margin: 28px 12px 0 0;
}

a {
    /* display: block; */
    font-size: 12px;
    border: #d9d9d9 solid 1px;
    border-radius: 20px;
    padding: 8px 18px;
    color: #595959;
}

a:hover {
    color: #fff;
    background-color: #f25a36;
    border: #f25a36 solid 1px;
}
</style>