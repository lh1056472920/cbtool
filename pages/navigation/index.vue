<template>
    <div>
        <div class="nav-main clear">
            <div class="left">
                <section>
                    <p class="nav-title">精品推荐</p>
                    <div class="content">
                        <div v-for="item in recommendList.content" :key="item.blockchainId">
                            <platform :blockchain-name='item.blockchainName' :blockchain-url='item.blockchainUrl' :blockchain-keyword='item.blockchainKeyword' :blockchain-icon='item.blockchainIcon'></platform>
                        </div>
                    </div>
                </section>
                <section v-if="item.categoryId!==20&&item.categoryId!==23&&item.categoryId!==24" v-for="item in subCategoriesList" :key="item.categoryId">
                    <p class="nav-title">{{item.categoryName}}
                        <nuxt-link :to="{path:`/navigation/navCandy/`,query:{id:item.categoryId}}" @click.native="computedCnzz(item.categoryName)">更多</nuxt-link>
                    </p>
                    <div class="content">
                        <div v-if="subitem.blockchainName" v-for="(subitem,i) in resultMapsList[item.categoryId].content" :key="i">
                            <platform :blockchain-name='subitem.blockchainName' :blockchain-url='subitem.blockchainUrl' :blockchain-keyword='subitem.blockchainKeyword' :blockchain-icon='subitem.blockchainIcon'></platform>
                        </div>
                    </div>
                </section>
            </div>
            <div class="right">
                <p class="r-title">活动</p>
                <activity v-for="(subitem,i) in activityList" :key="i" :event-name='subitem.eventName' :event-time='subitem.eventTime' :event-id='subitem.eventId' :event-address='subitem.eventAddress' :event-img='subitem.column12'></activity>
                <nuxt-link :to="{path:`/navigation/navCandy/`,query:{id:24}}" @click.native="computedActive" class="more">查看更多</nuxt-link>
            </div>
            <toTop></toTop>
        </div>
    </div>
</template>

<script>
import activity from "~/components/video/activity.vue";
import platform from "~/components/navigation/platform.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
export default {
    components: {
        platform,
        activity,
        toTop
    },
    head() {
        return {
            title: "区块链导航_链2345区块链资讯导航"
        };
    },
    async asyncData({query}) {
        let [recommendRes, blockbarmapsRes, activityRes] = await Promise.all([
            axios.get("/web/navigation/banner", {
                params: { pageIndex: 0, pageSize: 8 }
            }),
            axios.get("/web/navigation/more", {
                // params: { pageIndex: 0, pageSize: 8 }
            }),
            axios.get(`/web/rightbar?topicId=${query.id}`)
        ]);
        // console.log(activityRes);

        return {
            recommendList:
                (!recommendRes.serviceError && recommendRes.data.pageImpl) ||
                [],
            subCategoriesList:
                (!blockbarmapsRes.serviceError &&
                    blockbarmapsRes.data.subCategoryList) ||
                [],
            resultMapsList:
                (!blockbarmapsRes.serviceError && blockbarmapsRes.data.maps) ||
                [],
            activityList:
                (!activityRes.serviceError && activityRes.data.resultMaps[5]) ||
                []
        };
    },
    methods: {
        computedCnzz(categoryName) {
            _czc.push([
                "_trackEvent",
                "区块链导航页",
                "点击更多",
                categoryName
            ]);
        },
        computedActive() {
            _czc.push([
                "_trackEvent",
                "区块链导航页",
                "活动列表",
                "点击查看更多"
            ]);
        }
    }
};
</script>

<style>
.nav-main {
    width: 1200px;
    margin: 0px auto;
}

.nav-main .left {
    float: left;
    width: 790px;
    height: 100%;
    margin-right: 80px;
}

.nav-main .left section {
    width: 100%;
    height: 346px;
    border-top: 2px solid #f25a36;
}

.nav-main .left section .nav-title {
    width: 100%;
    height: 56px;
    text-align: center;
    line-height: 56px;
    margin: 0 auto;
    font-size: 18px;
    position: relative;
    border-bottom: 1px solid #f2f2f2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.nav-main .left section .nav-title a {
    position: absolute;
    font-size: 12px;
    color: #f25a36;
    right: 15px;
}

.nav-main .left section .content {
    width: 100%;
    height: 240px;
}
.nav-main .left section .content > div {
    margin-right: 10px;
    width: 190px;
    display: inline-block;
}
.nav-main .left section .content > div:nth-child(4n) {
    margin-right: 0;
}
.nav-main .right {
    float: right;
    width: 330px;
    height: 100%;
    border-top: 2px solid #f25a36;
}

.nav-main .right .r-title {
    width: 100%;
    height: 58px;
    line-height: 58px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
    color: #404040;
    border-bottom: 1px solid #f2f2f2;
}

.nav-main .right .more {
    display: block;
    margin: 0 auto;
    width: 120px;
    height: 28px;
    color: #f25a36;
    border: 1px solid #f25a36;
    border-radius: 14px;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    cursor: pointer;
}

.nav-main .right .more:hover {
    background-color: #f25a36;
    color: #fff;
}
</style>
