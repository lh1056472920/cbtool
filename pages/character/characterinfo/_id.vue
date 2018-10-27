<template>

    <div class="main-one">
        <div class="left" v-if="categoryId!=20||active==1">
            <div class="nav_top">
                <nuxt-link v-for="(item,i) in subList" :key="i" :to="`/character/${item.categoryId}`" class="one" v-show="active==item.categoryId">{{item.categoryName}}</nuxt-link>
                <nuxt-link to="/info/1" class="one" v-show="active==1">热门资讯</nuxt-link>
                <span class="two">&nbsp;>&nbsp;{{articleIdinfo.articleName}}</span>
            </div>
            <div class="cut_off_title">
                <span class="now_title">{{articleIdinfo.articleName}}</span>
            </div>
            <!-- <div class="main_shu">
                <span class="mian_now_time iconfont icon-shizhong">{{articleIdinfo.articleTime}}</span>
                <span class="mian_now_view iconfont icon-liulan">浏览量 {{articleIdinfo.articleReader}}</span>
            </div> -->
            <div class="info-list">
                <span>
                    <i class="iconfont icon-shizhong"></i>&nbsp;&nbsp;
                    <em>{{articleIdinfo.articleUpdatetime}}</em>
                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                    <i class="iconfont icon-liulan"></i>&nbsp;&nbsp;
                    <em>浏览量&nbsp;{{articleIdinfo.articleReader}}</em>
                </span>
            </div>
            <div class="main_content">
                <!-- <p class="main_content_one">{{articleIdinfo.articleKeyword}}</p>
                <br> -->
                <p class="main_content_two" v-html="articleIdinfo.articleContent"></p>
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
        <div class="left" v-if="categoryId==20&&active!=1">
            <div class="nav_top">
                <nuxt-link to="/character" class="one" v-show="active!=1&&active!=20">专访人物</nuxt-link>
                <nuxt-link to="/navigation/navCandy/?id=20" class="one" v-show="active!=1&&active==20">币老大圈</nuxt-link>
                <span class="two">&nbsp;>&nbsp;{{articleIdinfo.personageName}}</span>
            </div>
            <div class="cut_off_title">
                <span class="now_title">{{articleIdinfo.personageName}}</span>
            </div>
            <div class="info-list">
                <span>
                    <i class="iconfont icon-shizhong"></i>&nbsp;&nbsp;
                    <em>{{articleIdinfo.personageUpdatetime}}</em>
                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                    <i class="iconfont icon-liulan"></i>&nbsp;&nbsp;
                    <em>浏览量&nbsp;{{articleIdinfo.personageReader}}</em>
                </span>
            </div>
            <div class="main_content">

                <p class="main_content_two" v-html="articleIdinfo.personageContent"></p>

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
            <div @click="jumpToHotarticle(item.articleId)" v-for="(item,i) in articleIdinfoList" :key="i">
                <hotArtical :article-image="articleIdinfoList[i].articleImage" :article-id="articleIdinfoList[i].articleId" :article-name="articleIdinfoList[i].articleName"></hotArtical>
            </div>
            <nuxt-link class="more" to="/info/1">更多资讯</nuxt-link>

        </div>
        <!--回到顶部-->
        <toTop></toTop>
    </div>
</template>
<script>
import hotArtical from "~/components/info/hotArtical.vue";
import toTop from "~/components/video/toTop.vue";
// import hotLabel from "~/components/index/hotLabel.vue";
import axios from "~/plugins/axios.js";

export default {
    components: {
        // hotLabel,
        hotArtical,
        toTop
    },
    data() {
        return {
            Id: 0,
            articleIdinfo: [],
            categoryId: 0,
            active: 0,
            subList: [],
            title: ""
        };
    },
    head() {
        return {
            title: this.title + "_链2345区块链资讯导航"
        };
    },
    created() {
        this.getarticleId();
        this.getarticleIdinfo();
    },
    async asyncData() {
        let [articleInfo] = await Promise.all([axios.get("/web/articlepush")]);
        // console.log(articleInfo);

        return {
            articleIdinfoList:
                (!articleInfo.serviceError &&
                    articleInfo.data.articles.content) ||
                []
        };
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
                    bdUrl: `http://www.lian2345.com/character/characterinfo?id=${this.Id}&categoryId=${this.categoryId}&active=${this.active}`, //分享的链接
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
        getarticleId() {
            this.Id = Number(this.$route.query.id);
            this.categoryId = Number(this.$route.query.categoryId);
            this.active = Number(this.$route.query.active);
        },
        async getarticleIdinfo() {
            let { data } = await axios.get("/web/topic/person/more", {
                params: { pageIndex: 1, pageSize: 20 }
            });
            this.subList = data.subCategoryList;
            if (this.categoryId != 20) {
                let { data } = await axios.get(`/web/article/${this.Id}`);
                this.articleIdinfo = data;
                this.title = data.articleName;
            } else if (this.categoryId == 20) {
                let { data } = await axios.get(`/web/personage/${this.Id}`);
                this.articleIdinfo = data;
                this.title = data.personageName;
            }
        },

        async jumpToHotarticle(articleId) {
            // console.log(articleId);

            let { data } = await axios.get(`/web/article/${articleId}`);

            this.articleIdinfo = data;
            this.tilte=data.personageName;
            this.active = 1;
        }
    }
};
</script>


<style >
.main-one a {
    text-decoration: none;
    color: #404040;
}

.main-one {
    width: 1200px;
    margin: 0 auto;
}

.main-one .left {
    display: inline-block;
    text-align: left;
    width: 790px;
    vertical-align: top;
    margin: 0;
    min-height: 1500px;
}

.main-one li {
    list-style: none;
}

.main-one .main_content_two {
    line-height: 60px;
}

.main-one .main_content .main_content_two img {
    margin: 0 auto;
    /* height: 100%; */
    max-width: 600px;
    display: block;
}
.main_content .main_content_two iframe {
    margin: 0 auto;
    width: 600px;
    height: 300px;
    display: block;
    /* height: 100%; */
    /* height: 300px; */
}
.main-one .nav_top {
    line-height: 44px;
    font-size: 14px;
    color: #d9d9d9;
    border-bottom: 2px solid #f25a36;
}

.main-one .left .info-list {
    width: 100%;
    height: 61px;
    line-height: 61px;
    font-size: 11px;
    color: #a6a6a6;
}

.main-one .left .info-list .iconfont {
    font-size: 16px;
}

.main-one .nav_top .one {
    color: #d9d9d9;
}

.main-one .nav_top .one:hover {
    color: #f25a36;
}

.main-one .cut_off_title {
    height: 90px;
    font-size: 24px;
    line-height: 90px;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
    color: #404040;
}

.main-one .now_title {
    display: block;
    height: 90px;
    overflow: hidden;
}

.main-one .main_content {
    color: #404040;
    font-size: 16px;
    line-height: 25px;
}
.main-one .left .share {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 71px 0 97px 0;
}

.main-one .left .share span,
.main-one .left .share a {
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    margin-right: 30px;
    float: left;
}

.main-one .left .share .text {
    font-size: 16px;
    text-align: center;
    color: #404040;
}

.main-one .left .share .s-weixin {
    background: url("~/static/images/f-contact-wx.png") no-repeat;
}

.main-one .left .share .s-weixin:hover {
    background: url("~/static/images/f-contact-wx-h.png") no-repeat;
    cursor: pointer;
}

.main-one .left .share .s-weibo {
    background: url("~/static/images/f-contact-wb.png") no-repeat;
}

.main-one .left .share .s-weibo:hover {
    background: url("~/static/images/f-contact-wb-h.png") no-repeat;
    cursor: pointer;
}
.main-one .left .share .s-qq {
    background: url("~/static/images/f-contact-qq.png") no-repeat;
}
/* .main-one .left .share .s-weixin  */
.main-one .left .share .s-qq:hover {
    background: url("~/static/images/f-contact-qq-h.png") no-repeat;
    cursor: pointer;
}

.main-one .right {
    float: right;
    width: 330px;
    height: 100%;
    margin-top: 44px;
    border-top: 2px solid #f25a36;
    vertical-align: top;
}

.main-one .right .r-title {
    width: 100%;
    height: 58px;
    line-height: 58px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
    color: #404040;
    border-bottom: 1px solid #f2f2f2;
}

.main-one .right .more {
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
/* footer.onef {
    height: 80px;
} */
</style>
