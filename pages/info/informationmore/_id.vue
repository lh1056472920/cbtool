<template>

  <div class="infoDetail-main clear">
    <div class="left">
      <div class="nav_top">
        <nuxt-link :to="`/info/${item.categoryId}`" v-for="item in subCategoryList" :key="item.index" class="one" v-show="active==item.categoryId">{{item.categoryName}}</nuxt-link>
        <nuxt-link to="/info/0" class="one" v-show="active==0">所有</nuxt-link>
        <span class="two">&nbsp;>&nbsp;{{articleIdinfo.articleName}}</span>
      </div>
      <div class="cut_off_title">
        <span class="now_title">{{articleIdinfo.articleName}}</span>
      </div>
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
    <div class="right">
      <p class="r-title">热门文章</p>
      <div :to="{path:'/info/informationmore',query: {id: item.articleId,active:1}}" @click="jumpToHotarticle(item.articleId)" v-for="(item,i) in articleIdinfoList" :key="i">
        <hotArtical :article-image="articleIdinfoList[i].articleImage" :article-id="articleIdinfoList[i].articleId" :article-name="articleIdinfoList[i].articleName"></hotArtical>
      </div>
      <nuxt-link class="more" to="/info/1">更多文章</nuxt-link>
    </div>
    <toTop></toTop>
  </div>
</template>
<script>
import hotArtical from "~/components/info/hotArtical.vue";
import toTop from "~/components/video/toTop.vue";
import hotLabel from "~/components/index/hotLabel.vue";
import axios from "~/plugins/axios.js";

export default {
    components: {
        hotLabel,
        hotArtical,
        toTop
    },
    data() {
        return {
          // title:''
    //         Id: 0,
    //         articleIdinfo: [],
    //         active: 0,
    //         articleId: 0
        };
    },
    // created() {
    //     this.getarticleId();
    // },
    head() {
        return {
            title: this.title + "_链2345区块链资讯导航"
        };
    },
    async asyncData({ query }) {
        
        let [datainfo, articleInfo, subList] = await Promise.all([
            axios.get(`/web/article/${query.id}`),
            axios.get("/web/articlepush"),
            axios.get("/web/articlemaps", {
                params: { pageIndex: 1, pageSize: 10 }
            })
        ]);
        // console.log(query.id);
        return {
            articleIdinfo: (!datainfo.serviceError && datainfo.data) || {},
            articleIdinfoList:
                (!articleInfo.serviceError &&
                    articleInfo.data.articles.content) ||
                [],
            active: query.active,
            subCategoryList:
                (!subList.serviceError && subList.data.subCategoryList) || [],
                title:!datainfo.serviceError&&datainfo.data.articleName
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
            this.active = this.$route.query.active;

            let { data } = await axios.get(`/web/article/${articleId}`);

            this.articleIdinfo = data;
            this.title=data.articleName;
            // console.log(this.articleIdinfo);
            
            this.active = 1;
            //    console.log(this.active);
        }
    }
};
</script>
<style>
i,
em {
    font-style: normal;
}

a {
    text-decoration: none;
    color: #404040;
}

.infoDetail-main {
    width: 1200px;
    margin: 0 auto;
}

.infoDetail-main .left {
    display: inline-block;
    text-align: left;
    width: 790px;
    vertical-align: top;
    margin: 0;
}

.infoDetail-main .right {
    display: inline-block;
    margin-left: 80px;
    width: 330px;
    margin-top: 44px;
    vertical-align: top;
}

li {
    list-style: none;
}

.infoDetail-main .nav_top {
    line-height: 44px;
    font-size: 14px;
    color: #d9d9d9;
    border-bottom: 2px solid #f25a36;
}

/* .main_shu > span {
    margin-right: 20px;
    display: inline-block;
    height: 59px;
    line-height: 59px;
    color: #a6a6a6;
    font-size: 13px;
} */
.infoDetail-main .info-list {
    width: 100%;
    height: 61px;
    line-height: 61px;
    font-size: 11px;
    color: #a6a6a6;
}
.main_content .main_content_two img {
    margin: 0 auto;
    max-width: 600px;
    display: block;
    /* height: 100%; */
    /* height: 300px; */
}
.main_content .main_content_two iframe {
    margin: 0 auto;
    width: 600px;
    height: 300px;
    display: block;
    /* height: 100%; */
    /* height: 300px; */
}
.main_content .main_content_two a{
    color: blue;
}
.infoDetail-main .info-list .iconfont {
    font-size: 16px;
}

.infoDetail-main .nav_top .one {
    color: #d9d9d9;
}

.infoDetail-main .nav_top .one:hover {
    color: #f25a36;
}

.infoDetail-main .cut_off_title {
    height: 90px;
    font-size: 24px;
    line-height: 90px;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
    color: #404040;
}

.infoDetail-main .now_title {
    display: block;
    height: 90px;
    overflow: hidden;
}

.infoDetail-main .main_content {
    color: #404040;
    font-size: 16px;
    line-height: 30px;
    text-indent: 2em;
}

.infoDetail-main .main_content .main_content_two > p {
    margin-bottom: 30px;
}

.infoDetail-main .left .share {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 71px 0 97px 0;
}

.infoDetail-main .left .share span,
.infoDetail-main .left .share a {
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    margin-right: 30px;
    float: left;
}

.infoDetail-main .left .share .text {
    font-size: 16px;
    text-align: center;
    color: #404040;
}

.infoDetail-main .left .share .s-qq {
    background: url("~/static/images/f-contact-qq.png") no-repeat;
}

.infoDetail-main .left .share .s-qq:hover {
    background: url("~/static/images/f-contact-qq-h.png") no-repeat;
    cursor: pointer;
}

.infoDetail-main .left .share .s-weixin {
    background: url("~/static/images/f-contact-wx.png") no-repeat;
}

.infoDetail-main .left .share .s-weixin:hover {
    background: url("~/static/images/f-contact-wx-h.png") no-repeat;
    cursor: pointer;
}

.infoDetail-main .left .share .s-weibo {
    background: url("~/static/images/f-contact-wb.png") no-repeat;
}

.infoDetail-main .left .share .s-weibo:hover {
    background: url("~/static/images/f-contact-wb-h.png") no-repeat;
    cursor: pointer;
}

.infoDetail-main .right {
    float: right;
    width: 330px;
    height: 100%;
    border-top: 2px solid #f25a36;
}

.infoDetail-main .right .r-title {
    width: 100%;
    height: 58px;
    line-height: 58px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
    color: #404040;
    border-bottom: 1px solid #f2f2f2;
}

.infoDetail-main .right .more {
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

.infoDetail-main .more:hover {
    background-color: #f25a36;
    color: #fff;
}
</style>
