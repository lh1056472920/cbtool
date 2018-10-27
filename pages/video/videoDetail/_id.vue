<template>
    <div>
        <div class="vd-main clear">
            <div class="detail-title">
                <nuxt-link to="/video">视频</nuxt-link>
                <span>></span>
                <span>{{videoDetailList.videoName}}</span>
            </div>
            <div class="left">
                <p class="video-title">{{videoDetailList.videoName}}</p>
                <div class="info-list">
                    <span>
                        <i class="iconfont icon-shizhong"></i>&nbsp;&nbsp;
                        <em>{{videoDetailList.videoUpdatetime}}</em>
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                        <i class="iconfont icon-liulan"></i>&nbsp;&nbsp;
                        <em>浏览量&nbsp;{{videoDetailList.videoReader}}</em>
                    </span>
                </div>
                <div style="width:100%;height:444px">
                    <iframe style="width:100%;height:100%" :src='videoDetailList.videoUrl' frameborder=0 allowfullscreen></iframe>
                </div>
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
            <div class="right">
                <p class="r-title">热门视频</p>
                <nuxt-link class="toDetail" :to="'/video/videoDetail/'+item.videoId" v-for="item in hotVideoList" :key="item.videoId">
                    <div class="l-side">
                        <quickView :video-id="item.videoId" :video-img="item.videoImage" :video-duration="item.column13"></quickView>
                    </div>
                    <div class="r-side">
                        <p>{{item.videoName}}</p>
                    </div>
                </nuxt-link>
                <nuxt-link class="more" :to="'/video/moreVideo/'+10">更多视频</nuxt-link>
            </div>
            <toTop></toTop>
        </div>
    </div>
</template>

<script>
import quickView from "~/components/video/quickView.vue";
import hotVideo from "~/components/index/hotVideo.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
export default {
    components: {
        quickView,
        hotVideo,
        toTop
    },
    data() {
        return {
            // title:''
        };
    },
    head() {
        return {
            title: this.title + "_区块链视频_链2345区块链资讯导航"
        };
    },
    async asyncData({ params }) {
        let [videoDetailRes, hotVideoRes] = await Promise.all([
            axios.get(`/web/video/${params.id}`),
            axios.get("/web/video/more", {
                params: { pageIndex: 0, pageSize: 6 }
            })
        ]);
        // console.log(videoDetailRes.data.videoName);

        return {
            videoDetailList:
                (!videoDetailRes.serviceError && videoDetailRes.data) || [],
            hotVideoList:
                (!hotVideoRes.serviceError &&
                    hotVideoRes.data.resultMaps[10].content) ||
                [],
            title: !videoDetailRes.serviceError && videoDetailRes.data.videoName
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
                    bdText: this.videoDetailList.videoName, //分享的内容
                    bdUrl: `http://www.lian2345.com/video/videoDetail/${
                        this.videoDetailList.videoId
                    }`, //分享的链接
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
    }
};
</script>

<style>
.vd-main {
    width: 1200px;
    margin: 10px auto 0;
}

.vd-main .detail-title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: #d9d9d9;
}

.detail-title a {
    color: #d9d9d9;
}

.detail-title a:hover {
    color: #f25a36;
}

.vd-main .left {
    float: left;
    width: 790px;
    height: 100%;
    margin-right: 80px;
    border-top: 2px solid #f25a36;
}

.vd-main .left .video-title {
    width: 100%;
    height: 90px;
    font-size: 24px;
    text-align: center;
    line-height: 90px;
    color: #404040;
}

.vd-main .left .info-list {
    width: 100%;
    height: 61px;
    line-height: 61px;
    font-size: 11px;
    color: #a6a6a6;
}

.vd-main .left .info-list .iconfont {
    font-size: 16px;
}

.vd-main .left #youkuplayer {
    width: 790px;
    height: 444px;
    margin: 0 auto;
}

.vd-main .left .share {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 71px 0 97px 0;
}

.vd-main .left .share span,
.vd-main .left .share a {
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    margin-right: 30px;
    float: left;
}

.vd-main .left .share .text {
    font-size: 16px;
    text-align: center;
    color: #404040;
}

.vd-main .left .share .s-qq {
    background: url("~/static/images/f-contact-qq.png") no-repeat;
}

.vd-main .left .share .s-qq:hover {
    background: url("~/static/images/f-contact-qq-h.png") no-repeat;
    cursor: pointer;
}

.vd-main .left .share .s-weixin {
    background: url("~/static/images/f-contact-wx.png") no-repeat;
}

.vd-main .left .share .s-weixin:hover {
    background: url("~/static/images/f-contact-wx-h.png") no-repeat;
    cursor: pointer;
}

.vd-main .left .share .s-weibo {
    background: url("~/static/images/f-contact-wb.png") no-repeat;
}

.vd-main .left .share .s-weibo:hover {
    background: url("~/static/images/f-contact-wb-h.png") no-repeat;
    cursor: pointer;
}

.vd-main .right {
    float: right;
    width: 330px;
    height: 100%;
    border-top: 2px solid #f25a36;
}

.vd-main .right .r-title {
    width: 100%;
    height: 58px;
    line-height: 58px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
    color: #404040;
    border-bottom: 1px solid #f2f2f2;
}

.vd-main .right a {
    display: block;
    width: 100%;
    height: 90px;
    margin-bottom: 18px;
}

.vd-main .right a.toDetail:hover {
    border-radius: 14px;
    -webkit-box-shadow: 0px 0px 10px rgba(64, 64, 64, 0.3);
    box-shadow: 0px 0px 10px rgba(64, 64, 64, 0.3);
}

.vd-main .right a .l-side {
    width: 144px;
    height: 90px;
    margin-right: 12px;
    position: relative;
    float: left;
}

.vd-main .right a .l-side > div {
    width: 100%;
    height: 100%;
}

.vd-main .right a .r-side {
    width: 167px;
    height: 90px;

    display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.vd-main .right a .r-side p {
    font-size: 14px;
    color: #404040;
}

.vd-main .right .more {
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
