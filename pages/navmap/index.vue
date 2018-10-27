<template>
    <div class="webnav">
        <div class="webnav-left">
            <ul class="webnav-left-li">
                <li v-for="(item,i) in topicCategoryList" :key="i">
                    <a href="#">{{item.topicName}}</a>
                </li>
            </ul>
        </div>
        <div class="webnav-right">
            <ul class="webnav-right-li">
                <li v-for="item in topicCategoryList" :key="item.index">
                    <nuxt-link :to="{path:`/navmap/navmaplist`,query:{topicId:item.topicId, categoryId:itemsub.categoryId}}" v-show="item.topicId!=6" v-for="(itemsub,i) in resultMaps[item.topicId]" :key="i" class="webnav-right-span">{{itemsub.categoryName}}</nuxt-link>
                    <nuxt-link :to="{path:`/navmap/navmaplist`,query:{topicId:6, categoryId:32}}" v-show="item.topicId==6" class="webnav-right-span">优质项目</nuxt-link>
                    <nuxt-link :to="{path:`/navmap/navmaplist`,query:{topicId:6, categoryId:33}}" v-show="item.topicId==6" class="webnav-right-span">全部项目</nuxt-link>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
import axios from "~/plugins/axios.js";
export default {
    data() {
        return {
            topicCategoryList: [],
            resultMaps: [],
            topicId: 1
            // pushCategoryList:[]
        };
    },
    created() {
        this.getwebmap();
    },
    methods: {
        async getwebmap() {
            let { data } = await axios.get("/web/sitemap/more");
            // console.log(data);
            this.resultMaps = data.resultMaps || [];
            this.topicCategoryList = data.topicCategoryList || [];
        }
    }
};
</script>

<style scoped>
.webnav {
    width: 1200px;
    margin: 0 auto;
    font-size: 0;
    /* padding: 10px 0; */
    border-top: 2px solid #f25a36;
}

.webnav ul {
    list-style: none;
}

.webnav-left {
    display: inline-block;
    width: 150px;
    margin: 0;
}

.webnav-right {
    padding-left: 20px;
    display: inline-block;
    width: 1050px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.webnav-left-li > li {
    /* width: 150px; */
    height: 90px;
    background-color: #f25a36;
    text-align: center;
    line-height: 90px;
}

.webnav-left-li > li > a {
    color: #fff;
    text-decoration: none;
    font-size: 24px;
}

.webnav-right-li > li {
    display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    width: 1050px;
    height: 90px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.webnav-right-li .webnav-right-span {
    display: inline-block;
    /* width: 120px; */
    height: 40px;
    border: 1px solid #d9d9d9;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    margin-right: 30px;
    font-size: 16px;
    color: #404040;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    padding: 0 15px;
}

.webnav-right-span:hover {
    color: #fff;
    background-color: #f25a36;
    border: 0;
}
</style>
