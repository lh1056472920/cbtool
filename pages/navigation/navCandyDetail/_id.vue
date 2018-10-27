<template>
    <div>
        <!-- 糖果详情 -->
        <div class="main clear">
            <div class="title">
                <nuxt-link to="/navigation">区块链导航</nuxt-link>
                <span>></span>
                <nuxt-link :to="{path:`/navigation/navCandy/`,query:{id:23}}">糖果</nuxt-link>
                <span>>正文</span>
            </div>
            <!-- 左部模块 -->
            <div class="left">
                <p class="cd-title">{{resultMapsList.title}}</p>
                <div class="info-list">
                    <span>
                        <i class="iconfont icon-shizhong"></i>&nbsp;&nbsp;
                        <em>{{resultMapsList.uptime}}</em>
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                        <i class="iconfont icon-liulan"></i>&nbsp;&nbsp;
                        <em>浏览量&nbsp;{{resultMapsList.pageview}}</em>
                    </span>
                </div>
                <section>
                    <div v-html="resultMapsList.data" class="content"></div>
                </section>
                <!-- 分享 -->
                <!-- <div class="share">
          <span class="text">分享</span>
          <span class="s-qq"></span>
          <span class="s-weixin"></span>
          <span class="s-weibo"></span>
          <span class="s-toutao"></span>
        </div> -->
                <div class="share">
                    <div class="bdsharebuttonbox" data-tag="share_1">
                        <span class="text">分享</span>
                        <a class="bds_tsina s-weibo" data-cmd="tsina"></a>
                        <a class="bds_weixin s-weixin" data-cmd="weixin"></a>
                        <a class="bds_sqq s-qq" data-cmd="sqq"></a>
                    </div>
                </div>
            </div>
            <!-- 右部模块 -->
            <div class="right">
                <component v-for="(item,index) in pushCategoryList" :key="index" :is="component(item.pushId)" :list="pushCategoryData[item.pushId]"></component>
                <!-- <candy></candy> -->
            </div>
            <!-- 回到顶部 -->
            <toTop></toTop>
        </div>

    </div>
</template>

<script>
import candy from "~/components/index/candy.vue";

// import candy from "~/components/index/candy.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
export default {
    components: {
        candy,
        toTop
    },
    data() {
        return {
            id: ""
        };
    },
    head() {
        return {
            title: this.title + "_糖果_链2345区块链资讯导航"
        };
    },
    async asyncData({ params }) {
        let [data1, rightbar, candyRes] = await Promise.all([
            axios.post(
                `http://120.79.0.99/market/api/marketAll/candies/detail`,
                `id=${params.id}`
            ),
            axios.get("/web/rightbar"),
            axios.post("http://120.79.0.99/market/api/marketAll/candies")
        ]);
        // console.log(data1);

        let pushCategoryList =
            (!rightbar.serviceError && rightbar.data.pushCategoryList) || [];
        pushCategoryList.sort((a, b) => a.pushOrder - b.pushOrder);
        let pushCategoryData =
            (!rightbar.serviceError && rightbar.data.resultMaps) || {};
        pushCategoryData[1] =
            (!candyRes.serviceError && candyRes.data.candies) || [];
        return {
            resultMapsList: (!data1.serviceError && data1.data.detail) || {},
            pushCategoryList: pushCategoryList,
            // pushCategoryData: pushCategoryData.components,
            pushCategoryData: pushCategoryData,
            title: data1.data.detail.title
        };
    },
    beforeMount() {
        window._bd_share_main = "";
    },
    created() {
        this.id = Number(this.$route.params.id);
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
        component(pushId) {
            switch (pushId) {
                case 1:
                    return "candy";
            }
        }
    }
};
</script>

<style>
i,
em {
    font-style: normal;
}

.main {
    width: 1200px;
    margin: 10px auto 0;
}

.main .title {
    width: 1200px;
    height: 42px;
    margin: 0 auto;
    line-height: 42px;
    color: #d9d9d9;
    font-size: 14px;
}

.main .title a {
    color: #d9d9d9;
}

.main .title a:hover {
    color: #f25a36;
}

.main .left {
    float: left;
    width: 790px;
    height: 100%;
    margin-right: 80px;
}

.main .left .cd-title {
    width: 100%;
    height: 90px;
    font-size: 24px;
    text-align: center;
    line-height: 90px;
    color: #404040;
}

.main .left .info-list {
    width: 100%;
    height: 61px;
    line-height: 61px;
    font-size: 11px;
    color: #a6a6a6;
}

.main .left .info-list .iconfont {
    font-size: 16px;
}

.main .left section p {
    font-size: 16px;
    color: #404040;
    line-height: 30px;
    font-weight: 300;
    margin-bottom: 30px;
}

.main .left section p a {
    color: #2dbe89;
}

section > div.content {
    width: 790px;
}

section .content h2,
h3,
section .content strong {
    font-weight: 400;
    /* color: red; */
}
section .content img {
    display: block;
    margin: 0 auto;
    max-width: 600px;
    /* height: 100%; */
    /* height: 300px; */
}
.main .left section a {
    color: #2dbe89;
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

.main .right {
    float: right;
    width: 330px;
    height: 100%;
}

.candy {
    text-align: center;
}
</style>
