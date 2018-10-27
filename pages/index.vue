<template>
    <div class="index">
        <banner :list="bannerList"></banner>
        <div class="left">
            <quotation :list="quotationList"></quotation>
            <information :subCategoryList='subCategoryList' :allList='allList'></information>
        </div>
        <div class="right">
            <component v-for="(item,index) in pushCategoryList" :key="index" :is="component(item.pushId)" :list="pushCategoryData[item.pushId]"></component>
        </div>
        <toTop></toTop>
    </div>
</template>

<script>
import banner from "~/components/index/banner.vue";
import quotation from "~/components/index/quotation.vue";
import information from "~/components/info/information.vue";
import candy from "~/components/index/candy.vue";
import hotLabel from "~/components/index/hotLabel.vue";
import notice from "~/components/index/notice.vue";
import navigation from "~/components/index/navigation.vue";
import hotVideo from "~/components/index/hotVideo.vue";
import moreActivities from "~/components/index/moreActivities.vue";
import hotProject from "~/components/index/hotProject.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";

export default {
    components: {
        banner,
        quotation,
        information,
        candy,
        hotLabel,
        notice,
        navigation,
        hotVideo,
        moreActivities,
        hotProject,
        toTop
    },
    //seo数据请求服务端渲染
    async asyncData() {
        let [
            pageRes,
            countRes,
            rightbar,
            candyRes,
            annoucement,
            subCategoryList,
            allList,
            quotation,
            navigationRes,
            hotProjectRes
        ] = await Promise.all([
            axios.get("/web/topic"),
            axios.get("/web/banner"),
            axios.get("/web/rightbar"),
            axios.post("http://120.79.0.99/market/api/marketAll/candies"),
            axios.post("http://120.79.0.99/market/api/marketAll/annoucement"),
            axios.get("/web/articlemaps"),
            axios.get("/web/articlemaps", {
                params: { pageIndex: 1 }
            }),
            axios.post(
                "http://120.79.0.99/market/api/marketAll/index",
                `type=bitcoin`
            ),
            axios.get("/web/navigation/blockbarmaps/right"),
            axios.get("/web/tokendetail/banner")
        ]);
        console.log(countRes);

        let pushCategoryList =
            (!rightbar.serviceError && rightbar.data.pushCategoryList) || [];
        pushCategoryList.sort((a, b) => a.pushOrder - b.pushOrder);
        let pushCategoryData =
            (!rightbar.serviceError && rightbar.data.resultMaps) || {};
        pushCategoryData[1] =
            (!candyRes.serviceError && candyRes.data.candies) || [];
        pushCategoryData[3] =
            (!navigationRes.serviceError && navigationRes.data) || [];
        pushCategoryData[6] =
            (!hotProjectRes.serviceError && hotProjectRes.data) || [];
        pushCategoryData[7] =
            (!annoucement.serviceError && annoucement.data.content) || [];

        return {
            topicList: (!pageRes.serviceError && pageRes.data) || [],
            bannerList: (!countRes.serviceError && countRes.data) || [],
            pushCategoryList: pushCategoryList,
            pushCategoryData: pushCategoryData,
            subCategoryList:
                (!subCategoryList.serviceError &&
                    subCategoryList.data.subCategoryList) ||
                [],
            allList:
                (!allList.serviceError &&
                    allList.data.pageAllArticle.content) ||
                [],
            quotationList:
                (!quotation.serviceError && quotation.data.bitcoin) || []
        };
    },

    async fetch({ store }) {
        let promises = [axios.get("/web/topic"), axios.get("/web/footer")];
        let results = await Promise.all(promises);
        let topicList = (!results[0].serviceError && results[0].data) || [];
        let partner =
            (!results[1].serviceError && results[1].data.resultMaps) || [];
        let friendlink =
            (!results[1].serviceError && results[1].data.subCategoryList) || [];
        // console.log(results);

        store.commit("changeTopicList", topicList);
        store.commit("changePartner", partner);
        store.commit("changeFriendlink", friendlink);
    },
    created() {
        // this.PCorWaps()
    },
    methods: {
        // async PCorWaps() {
        //     if (
        //         /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
        //             navigator.userAgent
        //         )
        //     ) {
        //         window.location.href = "http://m.lian2345.com/#/";
        //     } else {
        //         //pc
        //         window.location.href = "http://www.lian2345.com";
        //     }
        // },
        //组件传值
        component(pushId) {
            switch (pushId) {
                case 1:
                    return "candy";
                case 2:
                    return "hot-label";
                case 3:
                    return "navigation";
                case 4:
                    return "hot-video";
                case 5:
                    return "more-activities";
                case 7:
                    return "notice";
                case 6:
                    return "hot-project";
            }
        }
    }
};
</script>

<style scoped>
.index {
    position: relative;
    text-align: center;
    width: 1200px;
    margin: auto;
}

.left {
    margin-top: 30px;
    margin-right: 80px;
    display: inline-block;
    width: 790px;
    vertical-align: top;
}

.right {
    margin-top: 30px;
    display: inline-block;
    width: 330px;
}
</style>
