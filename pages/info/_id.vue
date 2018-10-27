<template>
    <div class="info">
        <div class="left">

            <nav>
                <a :class="{active: active==0}" @click.stop.prevent="clickItem(0)">所有</a>
                <a v-for="item in subCategoryList" :key="item.categoryId" :class="{active: active==item.categoryId}" @click.stop.prevent="clickItem(item.categoryId)">{{item.categoryName}}</a>

            </nav>
            <div class="footerlist">

                <div class="info-list" v-show="active===0" v-for="(item) in allList2" :key="item.index">
                    <nuxt-link class="loop" :to="{path:'/info/informationmore',query: {id: item.articleId,active:0}}">
                        <div class="info-img">
                            <img class="info-list-img" :src="`${item.articleImage}`" :onerror="actImgDefault" alt="">
                            <span class="info-img-one" v-if="item.categoryId==1">热门</span>
                            <span class="info-img-one" v-if="item.categoryId==2">快讯</span>
                            <span class="info-img-one" v-if="item.categoryId==3">行情</span>
                            <span class="info-img-one" v-if="item.categoryId==4">政策</span>
                            <span class="info-img-one" v-if="item.categoryId==5">人物</span>
                            <span class="info-img-one" v-if="item.categoryId==6">百科</span>
                            <span class="info-img-one" v-if="item.categoryId==7">矿业</span>
                            <span class="info-img-one" v-if="item.categoryId==30||item.categoryId==31">人物</span>
                            
                        </div>
                        <div class="info-describe">
                            <div class="info-describe-title">
                                <span class="info-list-describe-title">{{item.articleName}}
                                </span>
                                <span class="info-describe-content">{{item.articleKeyword}}
                                </span>
                            </div>
                            <div class="info-list-footer">
                                <i class="info-list-footer-time iconfont icon-shizhong"></i>
                                <span>{{item.articleUpdatetime}}</span>
                                <i class="info-list-footer-view iconfont icon-liulan"></i>
                                <span>浏览量 {{item.articleReader}}</span>
                                <i class="comment"></i>
                                <span>评论 {{item.articleIsPublish}}</span>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
                <div class="info-list" v-show="active===item1.categoryId&&active!==2&&active!==0" v-for="(item1,index) in subCategoryList" :key="index">
                    <nuxt-link class="loop" v-for="(item,i) in resultMaps" :key="i" :to="{path:'/info/informationmore',query: {id: item.articleId,active:item1.categoryId}}">
                        <div class="info-img">
                            <img class="info-list-img" :src="`${item.articleImage}`" :onerror="actImgDefault" alt="">

                            <span class="info-img-one" v-if="item.categoryId==1">热门</span>
                            <span class="info-img-one" v-if="item.categoryId==2">快讯</span>
                            <span class="info-img-one" v-if="item.categoryId==3">行情</span>
                            <span class="info-img-one" v-if="item.categoryId==4">政策</span>
                            <span class="info-img-one" v-if="item.categoryId==30||item.categoryId==31">人物</span>
                            <span class="info-img-one" v-if="item.categoryId==6">百科</span>
                            <span class="info-img-one" v-if="item.categoryId==7">矿业</span>
                        </div>
                        <div class="info-describe">
                            <div class="info-describe-title">
                                <span class="info-list-describe-title">{{item.articleName}}
                                </span>
                                <span class="info-describe-content">{{item.articleKeyword}}
                                </span>
                            </div>
                            <div class="info-list-footer">
                                <i class="info-list-footer-time iconfont icon-shizhong"></i>
                                <span>{{item.articleUpdatetime}}</span>
                                <i class="info-list-footer-view iconfont icon-liulan"></i>
                                <span>浏览量 {{item.articleReader}}</span>
                                <i class="comment"></i>
                                <span>评论 {{item.articleIsPublish}}</span>
                            </div>
                        </div>
                    </nuxt-link>
                </div>

                <messageTime v-show="active===2" :list='hotNows' :lists='numli'></messageTime>
            </div>
            <div class="btn-one">
                <button @click="addSize" :style="isShow">查看更多</button>
                <hr :style="isFade" class="deadLine">
                <p :style="isFade" class="deadLineText">我是有底线的</p>
            </div>
            <nuxt-child/>
        </div>
        <div class="right">
            <component v-for="(item,index) in pushCategoryList" :key="index" :is="component(item.pushId)" :list="pushCategoryData[item.pushId]"></component>

            <!-- 热门标签 -->
            <!-- <hotLabel></hotLabel> -->
            <!-- 更多糖果 -->
            <!-- <hotVideo></hotVideo> -->
            <!-- 更多活动 -->
            <!-- <activity></activity> -->
        </div>
        <toTop></toTop>
    </div>
</template>

<script>
import axios from "~/plugins/axios.js";
// import information from "~/components/info/information.vue";
import hotVideo from "~/components/index/hotVideo.vue";
import hotLabel from "~/components/index/hotLabel.vue";
import toTop from "~/components/video/toTop.vue";
import moreActivities from "~/components/index/moreActivities.vue";
import messageTime from "~/components/info/messageTime.vue";

export default {
    components: {
        hotVideo,
        moreActivities,
        hotLabel,
        toTop,
        messageTime
    },
    data() {
        return {
            // active: 2,
            allList2: this.allList,
            pageIndex: 1,
            pageSize: 8,
            hotNows: [],
            sizeNum: 0,
            page: 1,
            isShow: "",
            isFade: {
                display: "none"
            },
            numli: [],
            arr1: [],
            actImgDefault:
                'this.src="' +
                require("~/static/images/默认图_首页资讯.jpg") +
                '"'
        };
    },
    head() {
        return {
            title: "区块链新闻资讯_链2345区块链资讯导航"
        };
    },
    created() {},
    mounted() {
        // document.title='是不是这样改'
        this.addSize();
        // this.clickItem()
    },
    async asyncData({ params }) {
        let [dataList, rightbar, hotNows] = await Promise.all([
            axios.get("/web/articlemaps", {
                params: { pageIndex: 1, pageSize: 20 }
            }),
            axios.get("/web/rightbar"),
            axios.post("http://120.79.0.99/market/api/marketAll/consult", `page=1`)
        ]);
        // console.log(hotNows);

        let pushCategoryList =
            (!rightbar.serviceError && rightbar.data.pushCategoryList) || [];
        pushCategoryList.sort((a, b) => a.pushOrder - b.pushOrder);
        let pushCategoryData =
            (!rightbar.serviceError && rightbar.data.resultMaps) || {};
        return {
            resultMaps:
                (!dataList.serviceError && dataList.data.resultMaps) || [],
            subCategoryList:
                (!dataList.serviceError && dataList.data.subCategoryList) || [],
            allList:
                (!dataList.serviceError &&
                    dataList.data.pageAllArticle.content) ||
                [],
            pushCategoryList: pushCategoryList,
            pushCategoryData: pushCategoryData,
            hotNows: hotNows.data.lives,
            active: Number(params.id) || 2
        };
    },
    methods: {
        async clickItem(active) {
            this.pageIndex = 1;
            this.active = active;
            // console.log(this.active);

            this.pageSize = 8;
            this.isShow = "";
            this.isFade = { display: "none" };
            if (this.active === 2) {
                this.page = 1;
                // this.arrnum = 10;
                let { data } = await axios.post(
                    "http://120.79.0.99/market/api/marketAll/consult",
                    `page=${this.page}`
                );
                this.hotNows = data.lives;
            } else {
                if (this.active == 0) {
                    let data1 = await axios.get(`/web/articlemaps`);
                    this.allList2 = data1.data.pageAllArticle.content;
                } else {
                    let data1 = await axios.get(
                        `/web/articlemaps?categoryId=${this.active}`
                    );
                    this.resultMaps = data1.data.data.content;
                }
            }
        },
        async addSize() {
            // this.active=this.$route.query
            // console.log(this.active);
            this.pageIndex += 1;
            let numl = [];
            // let set=[];
            if (this.active === 2) {
                this.page += 1;

                let { data } = await axios.post(
                    "http://120.79.0.99/market/api/marketAll/consult",
                    `page=${this.page}`
                );
                let arr = data.lives;
                this.counts = data.counts || [];
                this.hotNows = this.hotNows.concat(arr);

                if (data.counts < this.page) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
                for (let i = 0; i < this.hotNows.length; i++) {
                    this.arr1.push(this.hotNows[i]["created_at"]);
                }
                for (let j = 1; j < this.arr1.length; j++) {
                    if (
                        new Date(this.arr1[j] * 1000).getDate() !=
                        new Date(this.arr1[j - 1] * 1000).getDate()
                    ) {
                        // console.log(new Date(this.arr1[j] * 1000).getDate());

                        numl.push(this.arr1[j]);
                    }
                }
            }
            let array = Array.from(new Set(numl));
            this.numli = array;
            if (this.active === 0) {
                let { data } = await axios.get(`/web/articlemaps`, {
                    params: { pageIndex: this.pageIndex}
                });
                // console.log(data);

                if (data.pageAllArticle.totalPages < this.pageIndex) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
                this.allList2 = this.allList2.concat(
                    data.pageAllArticle.content
                );
                // console.log(this.allList1);
            } else if (this.active != 2) {
                // console.log(this.pageIndex);

                let { data } = await axios.get(
                    `/web/articlemaps?categoryId=${this.active}`,
                    {
                        params: { pageIndex: this.pageIndex }
                    }
                );
                if (
                    this.active !== 2 &&
                    data.data.totalPages < this.pageIndex
                ) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
                this.resultMaps = this.resultMaps.concat(data.data.content);
                // console.log(this.resultMaps);
            }
        },

        component(pushId) {
            switch (pushId) {
                case 2:
                    return "hot-label";
                case 4:
                    return "hot-video";
                case 5:
                    return "more-activities";
            }
        }
    }
};
</script>


<style scoped>
nav {
    width: 100%;
    height: 55px;
    font-size: 14px;
    color: #404040;
    display: inline-block;
    line-height: 55px;
    border-top: 2px solid #f25a36;
    cursor: pointer;
    text-align: left;
    border-bottom: 1px solid #f2f2f2;
}

nav a {
    padding: 15px;
    color: #404040;
    text-decoration: unset;
    font-size: 18px;
    margin: 0;
}

nav a:hover {
    color: #f25a36;
}

nav a.active {
    color: #f25a36;
    border-bottom: #f25a36 solid 2px;
}

.info {
    margin: 0px auto;
}

.footerlist {
    text-align: left;
    width: 100%;
    margin: 0px auto;
}

.info {
    width: 1200px;
    text-align: center;
    margin: auto;
}

.left {
    margin-right: 80px;
    display: inline-block;
    width: 790px;
    vertical-align: top;
}

.right {
    display: inline-block;
    width: 330px;
    vertical-align: top;
}

.btn-one {
    width: 100%;
    height: 106px;

    position: relative;
}

button {
    width: 160px;
    height: 37px;
    border: #f25a36 solid 1px;
    margin: 19px 0 50px;
    color: #f25a36;
    background-color: transparent;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
}

button:hover {
    background-color: #f25a36;
    color: #fff;
}

.deadLine {
    display: inline-block;
    width: 390px;
    background-color: #f2f2f2;
    height: 1px;
    position: absolute;
    top: 38px;
    left: 200px;
}

.deadLineText {
    width: 160px;
    height: 37px;
    text-align: center;
    line-height: 37px;
    position: absolute;
    top: 20px;
    left: 315px;
    color: #a6a6a6;
    background-color: #fff;
}

.info-list .loop {
    width: 100%;
    display: block;
    height: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-top: 1px solid #ccc;
    border-top: 1px solid #f2f2f2;
}

.info-list a.loop:hover {
    background-color: #f8f8f8;
}

.info-list .loop:hover .info-list-describe-title {
    color: #f25a36;
}

.info-img {
    display: inline-block;
    width: 260px;
    position: relative;
    height: 100%;
    cursor: pointer;
}
.info-list-img {
    border-radius: 8px;
}

.info-img .info-img-one {
    display: block;
    width: 42px;
    height: 16px;
    border-radius: 8px;
    position: absolute;
    bottom: 8px;
    left: 8px;
    background-color: #000;
    opacity: 0.5;
    text-align: center;
    line-height: 16px;
    font-size: 11px;
    color: #fff;
}

.info-img .info-list-img {
    height: 150px;
    width: 260px;
}

.info-describe {
    margin-left: 20px;
    position: relative;
    right: 0;
    text-decoration: unset;
    display: inline-block;
    width: 504px;
    vertical-align: top;
}

.info-list .loop:hover {
    background-color: #f8f8f8;
}

.info-list .loop:hover .info-list-describe-title {
    color: #f25a36;
}

.info-list-describe-title {
    display: block;
    color: #404040;
    font-size: 18px;
    height: 50px;
    line-height: 25px;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    cursor: pointer;
    font-weight: 600;
}

.info-describe-content {
    margin-top: 5px;
    display: block;
    color: #a6a6a6;
    font-size: 13px;
    line-height: 18px;
    text-align: none;
    cursor: pointer;
    height: 53px;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.info-list-footer {
    position: absolute;
    width: 100%;
    bottom: -40px;
}

.info-list-footer > span {
    font-size: 13px;
    color: #a6a6a6;
    display: inline-block;
    margin-right: 42px;
}

.info-list-footer i {
    display: inline-block;
    margin-right: 12px;
    font-size: 13px;
    color: #a6a6a6;
}

.info-list-footer i.comment {
    width: 16px;
    height: 14px;
    background: url("~/static/images/comment.png") no-repeat;
}
</style>
