<template>
    <div>
         <div class="video-main clear">
            <div class="left">
                <section v-for="item in subCategoryList" :key="item.categoryId">
                    <div class="tag">
                        <span>{{item.categoryName}}</span>
                        <nuxt-link :to="'/video/moreVideo/'+item.categoryId" @click.native="computedCnzz(item.categoryName)">更多</nuxt-link>
                    </div>
                    <ul class="clear">
                        <li v-for="(subitem,i) in videoList[item.categoryId].content" :key="i">
                          <nuxt-link :to="'/video/videoDetail/'+subitem.videoId">
                            <div class="l-box">
                                <quickView :video-id="subitem.videoId" :video-img="subitem.videoImage" :video-duration="subitem.column13"></quickView>
                            </div>
                            <p>{{subitem.videoName}}</p>
                          </nuxt-link>
                        </li>
                    </ul>
                </section>
            </div>
            <div class="right">
                <p class="r-title">活动</p>
                <activity  v-for="(subitem,i) in resultMapsList" :key="i"
                :event-name='subitem.eventName'
                :event-time='subitem.eventTime'
                :event-id='subitem.eventId'
                :event-address='subitem.eventAddress'
                :event-img='subitem.column12'></activity>
                <nuxt-link :to="{path:`/navigation/navCandy/`,query:{id:24}}" @click.native="computedActive" class="more">查看更多</nuxt-link>
            </div>
            <!--回到顶部-->
            <toTop></toTop>
        </div>
    </div>
</template>

<style>
.video-main {
  width: 1200px;
  margin: 0px auto; }

.video-main .left {
  float: left;
  width: 790px;
  height: 100%;
  margin-right: 80px; }

.video-main .left section {
  border-top: 2px solid #f25a36; }

.video-main .left .tag {
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #f2f2f2; }

.video-main .left .tag span {
  float: left;
  height: 55px;
  line-height: 55px;
  font-size: 18px;
  margin-left: 20px; }

.video-main .left .tag a {
  float: right;
  height: 55px;
  line-height: 55px;
  color: #f25a36;
  margin-right: 20px; }

.video-main .left ul {
  width: 100%;
  height: 318px;
  margin-top: 15px;
  list-style: none; }

.video-main .left li {
  width: 144px;
  height: 140px;
  float: left;
  margin-left: 7px; }

.video-main .left li:hover p {
  color: #f25a36; }

.video-main .left li p {
  font-size: 14px;
  margin: 12px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; }

.video-main .left li:first-child {
  width: 334px;
  margin-left: 0px;
  float: left; }

.video-main .left li:nth-child(5) {
  margin-left: 341px; }

.video-main .left li .l-box {
  width: 144px;
  height: 90px; }

.video-main .left li:first-child .l-box {
  width: 334px;
  height: 230px;
  margin-bottom: 4px; }

.video-main .left li .l-box > div {
  width: 100%;
  height: 100%; }

.video-main .right {
  float: right;
  width: 330px;
  height: 100%;
  border-top: 2px solid #f25a36; }

.video-main .right .r-title {
  width: 100%;
  height: 58px;
  line-height: 58px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  color: #404040;
  border-bottom: 1px solid #F2F2F2; }

.video-main .right .more {
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
  cursor: pointer; }

.video-main .right .more:hover {
  background-color: #f25a36;
  color: #fff; }

</style>

<script>
import activity from "~/components/video/activity.vue";
import quickView from "~/components/video/quickView.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
export default {
  components: {
    quickView,
    toTop,
    activity
  },
  head() {
        return {
            title: "区块链视频_链2345区块链资讯导航"
        };
    },
  async asyncData({query}){
        let [blockbarmapsRes,videoRes] = await Promise.all([
            axios.get(`/web/rightbar?topicId=${query.id}`),
            axios.get("/web/video/more", {params: { pageIndex: 0, pageSize: 7}})
        ])  
        // console.log(blockbarmapsRes.data.resultMaps[query.id]);
        

        return {
          videoList: !videoRes.serviceError && videoRes.data.resultMaps || [],
          subCategoryList: !videoRes.serviceError && videoRes.data.subCategoryList || [],
          resultMapsList: !blockbarmapsRes.serviceError && blockbarmapsRes.data.resultMaps[query.id]|| [],
          // topicId:query.id
        }
    },
    methods: {
        computedCnzz (categoryName) {
            _czc.push(["_trackEvent",'视频页','点击更多',categoryName]);
        },
        computedActive(){
            _czc.push(["_trackEvent",'视频页活动列表','点击查看更多']);
        }
    }
};
</script>
