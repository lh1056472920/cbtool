<template>
  <div>
    <!-- 糖果详情 -->
    <div class="main clear">
      <div class="title">
        <nuxt-link to="/navigation">区块链导航</nuxt-link>
        <span>></span>
        <nuxt-link to="/navigation/navCandy/20">人物</nuxt-link>
        <span>>正文</span>
      </div>
      <!-- 左部模块 -->
      <div class="left">
        <p class="cd-title" v-if="item.personageId===id" v-for="item in resultMapsList" :key="item.personageId">{{item.personageName}}</p>
        <div class="info-list" v-if="item.personageId===id" v-for="item in resultMapsList" :key="item.index">
          <span>
            <i class="iconfont icon-shizhong"></i>&nbsp;&nbsp;
            <em>{{item.personageUpdatetime}}</em>
          </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
            <i class="iconfont icon-liulan"></i>&nbsp;&nbsp;
            <em>浏览量&nbsp;{{item.personageReader}}</em>
          </span>
        </div>
        <section v-if="item.personageId===id" v-for="(item,i) in resultMapsList" :key="i">
          <div v-html="item.personageContent"></div>
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
      <div class="right morecharacter">
        <!-- <div class="morecharacter"> -->
        <hr class="separate">
        <h2>人物</h2>
        <ul>
          <li v-for="(item,index) in personInfo" :key="index">
            <!-- <nuxt-link :to="{path:'/character/characterinfo',query: {id: item.personageId,categoryId:item.categoryId}}" class="morecharacter-list"> -->
            <nuxt-link :to="`/navigation/navPersonDetail/${item.personageId}`"  @click="jumpToHotarticle(item.personageId)" class="morecharacter-list">

              <div class="morecharacter-img">
                <img class="morecharacter-list-img" :src="`${item.personageImage}`" alt="">
              </div>
              <div class="morecharacter-describe">
                <div class="morecharacter-describe-title">
                  <span class="morecharacter-list-describe-title">{{item.personageName}}
                  </span>
                  <p class="morecharacter-list-describe-introduce">{{item.personageNameb}}</p>
                  <span class="morecharacter-describe-content" v-html="item.personageContent">
                  </span>
                </div>
              </div>
            </nuxt-link>
          </li>
        </ul>
        <nuxt-link to="/navigation/navCandy/20">
          <p class="toMore">更多人物</p>
        </nuxt-link>
        <!-- </div> -->

        <!-- <nuxt-link to="/navigation/navCandy/20" class="more">更多人物</nuxt-link> -->
      </div>
      <!-- 回到顶部 -->
      <toTop></toTop>
    </div>

  </div>
</template>

<script>
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
export default {
    components: {
        toTop
    },
    data() {
        return {
            id: "",
            personInfo: []
            // resultMapsList1: this.resultMapsList
        };
    },
    async asyncData() {
        let { data } = await axios.get(`/web/navigation/blockbarmaps`, {
            params: { pageIndex: 0, pageSize: 100 }
        });
        // console.log(data);
        
        return {
            resultMapsList:
                (data && data.code != -1 && data.resultMaps[20].content) || []
        };
    },
    beforeMount() {
        window._bd_share_main = "";
    },
    created() {
        this.id = Number(this.$route.params.id);
        this.jumpToHotarticle();
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
            // this.active = this.$route.query.active;

            let { data } = await axios.get(`/web/navigation/blockbarmaps`, {
                params: { pageIndex: 0, pageSize: 3 }
            });
            this.personInfo = data.resultMaps[20].content || [];
        }
    }
};
</script>

<style>
.main {
  width: 1200px;
  margin: 10px auto 0; }

.main .title {
  width: 1200px;
  height: 42px;
  margin: 0 auto;
  line-height: 42px;
  color: #d9d9d9;
  font-size: 14px; }

.main .title a {
  color: #d9d9d9; }

.main .title a:hover {
  color: #f25a36; }

.main .left {
  float: left;
  width: 790px;
  height: 100%;
  margin-right: 80px; }

.main .left .cd-title {
  width: 100%;
  height: 90px;
  font-size: 24px;
  text-align: center;
  line-height: 90px;
  color: #404040; }

.main .left .info-list {
  width: 100%;
  height: 61px;
  line-height: 61px;
  font-size: 11px;
  color: #a6a6a6; }

.main .left .info-list .iconfont {
  font-size: 16px; }

.main .left section p {
  font-size: 16px;
  color: #404040;
  line-height: 20px; }

.main .left .share {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 71px 0 97px 0; }

.main .left .share span,
.main .left .share a {
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  margin-right: 30px;
  float: left; }

.main .left .share .text {
  font-size: 16px;
  text-align: center;
  color: #404040; }

.main .left .share .s-qq {
  background: url("~/static/images/f-contact-qq.png") no-repeat; }

.main .left .share .s-qq:hover {
  background: url("~/static/images/f-contact-qq-h.png") no-repeat;
  cursor: pointer; }

.main .left .share .s-weixin {
  background: url("~/static/images/f-contact-wx.png") no-repeat; }

.main .left .share .s-weixin:hover {
  background: url("~/static/images/f-contact-wx-h.png") no-repeat;
  cursor: pointer; }

.main .left .share .s-weibo {
  background: url("~/static/images/f-contact-wb.png") no-repeat; }

.main .left .share .s-weibo:hover {
  background: url("~/static/images/f-contact-wb-h.png") no-repeat;
  cursor: pointer; }

.main .left .share .s-toutao {
  background: url("~/static/images/f-contact-tt.png") no-repeat; }

.main .left .share .s-toutao:hover {
  background: url("~/static/images/f-contact-tt-h.png") no-repeat;
  cursor: pointer; }

.main .right {
  float: right;
  width: 330px;
  height: 100%;
  /* border-top: 2px solid rgba(242, 90, 54, 1); */ }

li {
  list-style: none; }

h2 {
  text-align: center; }

.morecharacter h2 {
  font-size: 16px;
  padding: 22px 0;
  margin-bottom: 8px; }

.morecharacter-list {
  /* padding: 8px 15px 8px 0; */
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  
  display: -ms-flexbox;
  display: flex;display: -moz-box;display: -webkit-flex;
  height: 100%;
  box-sizing: border-box; }

.morecharacter-list:hover {
  background-color: #f8f8f8; }

.morecharacter-list:hover .morecharacter-list-describe-title {
  color: #f25a36; }

.morecharacter-img {
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  height: 146px;
  cursor: pointer;
  margin-right: 12px; }

.morecharacter-img .morecharacter-list-img {
  width: 110px;
  height: 100%;
  border-radius: 4px; }

.morecharacter-describe {
  -webkit-box-flex: 2;
      -ms-flex: 2;
          flex: 2;
  position: relative;
  right: 0;
  overflow: hidden;
  text-align: left;
  cursor: pointer; }

.morecharacter-list-describe-title {
  display: block;
  color: #404040;
  font-size: 18px;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  cursor: pointer; }

.morecharacter-list-describe-introduce {
  font-size: 12px;
  color: #a6a6a6;
  margin-top: 9px;
  margin-bottom: 17px; }

.morecharacter-describe-content {
  display: block;
  color: #595959;
  font-size: 13px;
  height: 81px;
  word-wrap: break-word;
  word-break: break-all;
  line-height: 16px;
  
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden; }

.morecharacter-describe-content p,
.morecharacter-describe-content img {
  display: none; }

.morecharacter-describe-content p:first-child {
  display: block; }

.morecharacter .toMore {
  display: block;
  width: 120px;
  height: 28px;
  margin: 20px auto 46px;
  border: 1px solid #f25a36;
  border-radius: 20px;
  color: #f25a36;
  font-size: 12px;
  text-align: center;
  line-height: 28px; }

.morecharacter .toMore:hover {
  background-color: #f25a36;
  color: #fff; }

</style>
