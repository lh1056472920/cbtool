<template>

    <div class="main clear">
        <div class="left">
            <div class="nav_top">
                <!-- <nuxt-link to="/info" v-for="item in subCategoryList" :key="item.index" class="one" v-show="active==item.categoryId">{{item.categoryName}}</nuxt-link> -->

                <nuxt-link to="/info/2" v-show="active!=1" class="one">实时快讯</nuxt-link>
                <nuxt-link to="/info/2" v-show="active==1" class="one">热门资讯</nuxt-link>
                <span class="two">&nbsp;>&nbsp;{{titlel}}</span>
            </div>
            <div class="cut_off_title">
                <span class="now_title">{{titlel}}</span>
            </div>
            <div class="main_shu">
                <span class="mian_now_time ">利多{{cite.up_counts}}</span>
                <span class="mian_now_view ">利空 {{cite.grade}}</span>
            </div>
            <div class="main_content">
                <p class="main_content_one">{{cite.content}}</p>
                <br>
                <!-- <p class="main_content_two" v-html="articleIdinfo.articleContent"></p> -->
            </div>
            <div class="share">
                <div class="bdsharebuttonbox" data-tag="share_1">
                    <span class="text">分享</span>
                    <a class="bds_tsina s-weibo" data-cmd="tsina"></a>
                    <a class="bds_weixin s-weixin" data-cmd="weixin"></a>
                    <a class="bds_sqq s-qq" data-cmd="sqq"></a>
                </div>
            </div>
        </div>
        <div class="right">
            <p class="r-title">热门资讯</p>
            <nuxt-link :to="{path:'/info/informationmore',query: {id: item.articleId,active:1}}" @click="jumpToHotarticle(item.articleId)" v-for="(item,i) in articleIdinfoList" :key="i">
                <hotArtical :article-image="articleIdinfoList[i].articleImage" :article-id="articleIdinfoList[i].articleId" :article-name="articleIdinfoList[i].articleName"></hotArtical>
            </nuxt-link>
            <nuxt-link class="more" to="/info">更多资讯</nuxt-link>
        </div>
    </div>
</template>
<script>
import hotArtical from "~/components/info/hotArtical.vue";

import hotLabel from "~/components/index/hotLabel.vue";
import axios from "~/plugins/axios.js";
import ElementUI from "element-ui";
export default {
    components: {
        hotLabel,
        hotArtical
    },
    data() {
        return {
            id: 0,
            page: 1,
            active: 0
        };
    },
    head() {
        return {
            title: this.titlel + "_链2345区块链资讯导航"
        };
    },
    async asyncData({ query }) {

        let [articleInfo, articlecite] = await Promise.all([
            axios.get("/web/articlepush"),
            axios.post(
                "http://120.79.0.99/market/api/marketAll/consult/detail",
                `id=${query.id}`
            )
        ]);
        return {
            articleIdinfoList:
                (!articleInfo.serviceError &&
                    articleInfo.data.articles.content) ||
                [],
            cite: (!articlecite.serviceError && articlecite.data.detail) || [],
            titlel:
                articlecite.data.detail.content.match(/【(.*)】/) &&
                articlecite.data.detail.content
                    .match(/【(.*)】/)[0]
                    .replace("【", "")
                    .replace("】", "")
        };
    },
    created() {
        // this.gitinfo();
    },
    beforeMount() {
        window._bd_share_main = "";
    },
    mounted() {
        setTimeout(() => {
            window._bd_share_config = {
                common: {
                    bdSnsKey: {},
                    bdText: "", //分享的内容
                    bdUrl: "", //分享的链接
                    bdDesc: "" //分享的摘要
                },
                share: {}
            };
            const s = document.createElement("script");
            s.type = "text/javascript";
            s.src =
                "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" +
                ~(-new Date() / 36e5);
            document.body.appendChild(s);
        }, 20);
    },
    methods: {
        async jumpToHotarticle(articleId) {
            let { data } = await axios.get(`/web/article/${articleId}`);

            this.articleIdinfo = data;
            this.active = 1;
            this.title = data.articleName;
        }
       
    }
};
</script>
<style scoped>
a {
    text-decoration: none;
    color: #404040;
}

.main {
    width: 1200px;
    margin: 0 auto;
}

.left {
    display: inline-block;
    text-align: left;
    width: 790px;
    vertical-align: top;
    margin: 0;
}

.right {
    display: inline-block;
    /* margin-left: 80px; */
    width: 330px;
    margin-top: 44px;
    vertical-align: top;
}

li {
    list-style: none;
}

.nav_top {
    line-height: 44px;
    font-size: 14px;
    color: #d9d9d9;
    border-bottom: 2px solid #f25a36;
}

.main_shu > span {
    margin-right: 20px;
    display: inline-block;
    height: 59px;
    line-height: 59px;
    color: #a6a6a6;
    font-size: 13px;
}

.nav_top .one {
    color: #d9d9d9;
}

.nav_top .one:hover {
    color: #f25a36;
}

.cut_off_title {
    height: 90px;
    font-size: 24px;
    line-height: 90px;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
    color: #404040;
}

.now_title {
    display: block;
    height: 90px;
    overflow: hidden;
}

.main_content {
    color: #404040;
    font-size: 16px;
    line-height: 25px;
}

.main .left .share {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 71px 0 97px 0;
}

.main .left .share span,
.main .left .share a {
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    margin-right: 30px;
    float: left;
}

.main .left .share .text {
    font-size: 16px;
    text-align: center;
    color: #404040;
}

.main .left .share .s-qq {
    background: url("~/static/images/f-contact-qq.png") no-repeat;
}

.main .left .share .s-qq:hover {
    background: url("~/static/images/f-contact-qq-h.png") no-repeat;
    cursor: pointer;
}

.main .left .share .s-weixin {
    background: url("~/static/images/f-contact-wx.png") no-repeat;
}

.main .left .share .s-weixin:hover {
    background: url("~/static/images/f-contact-wx-h.png") no-repeat;
    cursor: pointer;
}

.main .left .share .s-weibo {
    background: url("~/static/images/f-contact-wb.png") no-repeat;
}

.main .left .share .s-weibo:hover {
    background: url("~/static/images/f-contact-wb-h.png") no-repeat;
    cursor: pointer;
}

.right {
    float: right;
    width: 330px;
    height: 100%;
    border-top: 2px solid #f25a36;
}

.right .r-title {
    width: 100%;
    height: 58px;
    line-height: 58px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
    color: #404040;
    border-bottom: 1px solid #f2f2f2;
}

.right .more {
    display: block;
    margin: 20px auto 46px;
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
</style>
