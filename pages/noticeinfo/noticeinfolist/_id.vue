<template>

  <div class="notice-main clear">
    <div class="left">
      <div class="nav_top">
        <nuxt-link to="/noticeinfo" class="one">公告</nuxt-link>
        <span class="two">&nbsp;>&nbsp;公告详情</span>
      </div>
      <div class="main_content">
        <span class="main_content_one">{{annoucementData.announcement}}</span>
        <!-- <br> -->
        <p class="main_content_two" v-html="annoucementData.data"></p>
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
      <nuxt-link class="more" to="/info">更多资讯</nuxt-link>

    </div>
    <toTop></toTop>
  </div>

</template>
<script>
import hotArtical from "~/components/info/hotArtical.vue";

// import hotLabel from "~/components/index/hotLabel.vue";
import axios from "~/plugins/axios.js";
import toTop from "~/components/video/toTop.vue";

export default {
    // props:{
    //   list:Array
    // },
    components: {
        // hotLabel
        hotArtical,
        toTop
    },
    data() {
        return {
            Id: 0,
            annoucement: [],
            annoucementData: {}
        };
    },
    beforeMount() {
        window._bd_share_main = "";
    },
    created() {
        this.getarticleId();
    },
    async asyncData() {
        let [articleInfo] = await Promise.all([axios.get("/web/articlepush")]);

        return {
            articleIdinfoList:
                (!articleInfo.serviceError &&
                    articleInfo.data.articles.content) ||
                []
        };
    },
    methods: {
        async getarticleId() {
            this.Id = Number(this.$route.params.id);
            // console.log(this.Id);

            let { data } = await axios.post(
                `http://120.79.0.99/market/api/marketAll/annoucement/detail`,
                `id=${this.Id}`
            );
            // console.log(data);
            // console.log(1111);
            
            this.annoucementData = (data && data.detail) || {};
            // console.log(this.annoucementData);
        },
        jumpToHotarticle(articleId) {
            this.$router.push({
                path: "/info/informationmore",
                query: {
                    id: articleId,
                    active: 1
                }
            });
        }
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
    }
};
</script>
<style >
.notice-main a {
    text-decoration: none;
    color: #404040;
}

.notice-main {
    width: 1200px;
    margin: 0 auto;
}

.notice-main .left {
    display: inline-block;
    text-align: left;
    width: 790px;
    vertical-align: top;
    margin: 0;
}

/* .right {
  display: inline-block;
  margin-left: 80px;
  width: 330px;
  margin-top: 44px;
  vertical-align: top;
} */
.notice-main li {
    list-style: none;
}

.notice-main .nav_top {
    line-height: 44px;
    font-size: 14px;
    color: #d9d9d9;
    border-bottom: 2px solid #f25a36;
}

.notice-main .nav_top span {
    vertical-align: baseline;
}

.notice-main .nav_top .one {
    color: #d9d9d9;
}

.notice-main .nav_top .one:hover {
    color: #f25a36;
}

.notice-main .now_title {
    display: block;
    height: 90px;
    overflow: hidden;
}

.notice-main .main_content {
    color: #404040;
    font-size: 16px;
    line-height: 30px;
}
.notice-main span.main_content_one {
    display: block;
    width: 100%;
    text-align: center;
    line-height: 90px;
    font-size: 24px;
    color: #404040;
    overflow: hidden;
}
.notice-main .main_content h1 {
    text-align: center;
    line-height: 90px;
    font-size: 23px;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 22px;
}

.notice-main .main_content .art-head {
    font-size: 14px;
    margin-bottom: 24px;
    vertical-align: middle;
}

.notice-main .main_content .art-head img {
    margin-right: 12px;
}

.notice-main .main_content a {
    color: #2dbe89;
}

.notice-main .left .share {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 71px 0 97px 0;
}

.notice-main .left .share span,
.notice-main .left .share a {
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    margin-right: 30px;
    float: left;
}

.notice-main .left .share .text {
    font-size: 16px;
    text-align: center;
    color: #404040;
}

.notice-main .left .share .s-qq {
    background: url("~/static/images/f-contact-qq.png") no-repeat;
}

.notice-main .left .share .s-qq:hover {
    background: url("~/static/images/f-contact-qq-h.png") no-repeat;
    cursor: pointer;
}

.notice-main .left .share .s-weixin {
    background: url("~/static/images/f-contact-wx.png") no-repeat;
}

.notice-main .left .share .s-weixin:hover {
    background: url("~/static/images/f-contact-wx-h.png") no-repeat;
    cursor: pointer;
}

.notice-main .left .share .s-weibo {
    background: url("~/static/images/f-contact-wb.png") no-repeat;
}

.notice-main .left .share .s-weibo:hover {
    background: url("~/static/images/f-contact-wb-h.png") no-repeat;
    cursor: pointer;
}

.notice-main .right {
    float: right;
    width: 330px;
    height: 100%;
    margin-top: 44px;
    border-top: 2px solid #f25a36;
}

.notice-main .right .r-title {
    width: 100%;
    height: 58px;
    line-height: 58px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
    color: #404040;
    border-bottom: 1px solid #f2f2f2;
}

.notice-main .right .more {
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

.notice-main .right .more:hover {
    background-color: #f25a36;
    color: #fff;
}
.notice-main .main_content .main_content_two  img{
  width: 790px;
}
.notice-main .main_content .main_content_two  >div>div> img {
    width: 16px;
    height: 16px;
}
</style>
