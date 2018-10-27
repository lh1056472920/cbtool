<template>
    <div>
        <!-- 糖果详情 -->
        <div class="main clear">
            <div class="title">
                <nuxt-link to="/navigation">区块链导航</nuxt-link>
                <span>></span>
                <nuxt-link :to="{path:`/navigation/navCandy/`,query:{id:24}}">活动</nuxt-link>
                <span>>正文</span>
            </div>
            <!-- 左部模块 -->
            <div class="left">
                <p class="cd-title">{{resultMapsList1.eventName}} </p>
                <div class="info-list">
                    <span>
                        <i class="iconfont icon-shizhong"></i>&nbsp;&nbsp;
                        <em>{{resultMapsList1.eventTime}}</em>
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                        <i class="iconfont icon-liulan"></i>&nbsp;&nbsp;
                        <em>浏览量&nbsp;{{resultMapsList1.eventReader}}</em>
                    </span>
                </div>
                <section>
                    <div v-html="resultMapsList1.eventContent"></div>
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
                <p class="r-title">活动</p>
                <activity v-for="(subitem,index) in resultMapsList" :key="index" :event-name='subitem.eventName' :event-time='subitem.eventTime' :event-id='subitem.eventId' :event-address='subitem.eventAddress' :event-img='subitem.column12'></activity>
                <nuxt-link :to="{path:`/navigation/navCandy/`,query:{id:24}}" class="more">查看更多</nuxt-link>
            </div>
            <!-- 回到顶部 -->
            <toTop></toTop>
        </div>

    </div>
</template>

<script>
import activity from "~/components/video/activity.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
export default {
    components: {
        activity,
        toTop
    },
    data() {
        return {
            id: "",
            // title: ""
        };
    },
    head() {
        return {
            title: this.title +"_活动_链2345区块链资讯导航"
        };
    },
    async asyncData({ params }) {
        let [data, dataList] = await Promise.all([
            axios.get(`/web/rightbar?topicId=5`),
            axios.get(`/web/event/${params.id}`)
        ]);
        // console.log(dataList);

        return {
            resultMapsList:
                (data &&
                    data.data.code != -1 &&
                    data.data.resultMaps[5]) ||
                [],
            resultMapsList1:
                (dataList && dataList.data.code != -1 && dataList.data) || [],
            title: dataList.data.eventName
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
            // this.clickItem();
            window._bd_share_config = {
                common: {
                    bdSnsKey: {},
                    bdText: "", //分享的内容
                    bdUrl: "", //分享的链接
                    bdDesc: this.resultMapsList.eventName //分享的摘要
                },
                share: {}
            };
            const s = document.createElement("script");
            s.type = "text/javascript";
            s.src =
                "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" +
                ~(-new Date() / 36e5);
            document.body.appendChild(s);
        }, 200);
    },
    methods: {
        // clickItem(eventName) {
        // }
    }
};
</script>

<style>
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
    border-bottom: 1px solid #d9d9d9;
    width: 100%;
    height: 90px;
    font-size: 24px;
    text-align: center;
    line-height: 90px;
    color: #404040;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    display: block;
    /* margin: 0 auto; */
    font-size: 16px;
    color: #404040;
    line-height: 30px;
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
    border-top: 2px solid #f25a36;
}

.main .right .r-title {
    width: 100%;
    height: 58px;
    line-height: 58px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
    color: #404040;
    border-bottom: 1px solid #f2f2f2;
}

.main .right .more {
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

.main .right .more:hover {
    background-color: #f25a36;
    color: #fff;
}
section > div img {
    display: block;
    margin: 0 auto;
    max-width: 600px;
    /* height: 100%; */
    /* height: 300px; */
}
</style>
