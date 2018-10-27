<template>
    <div>
        <!-- 交易所 -->
        <div class="candy-main">
            <div class="title">
                <nuxt-link to="/navigation">导航</nuxt-link>
                <span>>更多交易所</span>
            </div>
            <div class="subnav">
                <a href="" v-for="item in subAddCategoryRes" :key="item.categoryId" :data-id='item.categoryId' :class="{active: active===item.categoryId}" @click.stop.prevent="clickItem(item.categoryId)">{{item.categoryName}}</a>
            </div>
            <div class="content">
                <section class="morecandy" v-if="active===23">
                    <ul>
                        <li v-for="(subitem,i) in candy" :key="i">
                            <nuxt-link :to="'/navigation/navCandyDetail/'+subitem.id">
                                <p class="content">
                                    <span class="point"></span>&nbsp;&nbsp;
                                    <span class="text">{{subitem.title}}</span>
                                </p>
                                <p class="message">
                                    <span>
                                        <i class="iconfont icon-shizhong"></i>&nbsp;&nbsp;
                                        <i>{{subitem.time}}</i>
                                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>
                                        <i class="iconfont icon-liulan"></i>&nbsp;&nbsp;
                                        <i>浏览量&nbsp;{{subitem.pageview}}</i>
                                    </span>
                                </p>
                                <div class="getCandy">领糖果</div>
                            </nuxt-link>
                        </li>
                    </ul>
                    <div class="btn-one">
                        <button class="more" @click="moreCandy" :style="isShow">更多糖果</button>
                        <hr :style="isFade" class="deadLine">
                        <p :style="isFade" class="deadLineText">我是有底线的</p>
                    </div>
                </section>
                <section v-if="active==24">
                    <div class="activity-box">
                        <moreActivity v-for="(subitem,i) in subCategoriesActive" :key="i" :event-name='subitem.eventName' :event-time='subitem.eventTime' :event-address='subitem.eventAddress' :event-id='subitem.eventId' :event-img='subitem.column12'></moreActivity>
                    </div>
                    <!-- <div class="btn-one">
                        <button @click="addSize" :style="isShow">查看更多</button>
                        <hr :style="isFade" class="deadLine">
                        <p :style="isFade" class="deadLineText">我是有底线的</p>
                    </div> -->
                </section>
                <section v-if="active!=24&&active!=23&&active!=20&&active!=17&&active!=21&&active!=22" v-for="item in subCategoriesList" :key="item.index" :data-id='item.categoryId' v-show="active===item.categoryId">
                    <div>

                        <p class="subTitle">{{item.threeName}}</p>
                        <div class="box">
                            <div v-if="subitem.blockchainName" v-for="(subitem,i) in resultMapsList[item.threeId]" :key="i">
                                <platform :blockchain-name='subitem.blockchainName' :blockchain-url='subitem.blockchainUrl' :blockchain-keyword='subitem.blockchainKeyword' :blockchain-icon='subitem.blockchainIcon'></platform>
                            </div>
                        </div>

                    </div>

                </section>
                <section v-if="active==20">
                    <div>
                        <div class="box">
                            <nuxt-link :to="{path:'/character/characterinfo',query: {id: subitem.personageId,categoryId:subitem.categoryId,active:subitem.categoryId}}" v-if="subitem.personageName" v-for="(subitem,i) in subCategoriesList" :key="i">
                                <platform :blockchain-name='subitem.personageName' :blockchain-keyword='subitem.personageNameb' :blockchain-icon='subitem.personageImage'></platform>
                            </nuxt-link>
                        </div>

                    </div>

                </section>
                <section v-if="active==17">
                    <div>
                        <div class="box">
                            <div v-if="subitem.blockchainName" v-for="(subitem,i) in subCategoriesList" :key="i">
                                <platform :blockchain-name='subitem.blockchainName' :blockchain-url='subitem.blockchainUrl' :blockchain-keyword='subitem.blockchainKeyword' :blockchain-icon='subitem.blockchainIcon'></platform>
                            </div>
                        </div>

                    </div>

                </section>
                <section v-if="active==21">
                    <div>
                        <div class="box">
                            <div v-if="subitem.blockchainName" v-for="subitem in subCategoriesList" :key="subitem.index">
                                <platform :blockchain-name='subitem.blockchainName' :blockchain-url='subitem.blockchainUrl' :blockchain-keyword='subitem.blockchainKeyword' :blockchain-icon='subitem.blockchainIcon'></platform>
                            </div>
                        </div>

                    </div>

                </section>
                <section v-if="active==22">
                    <div>
                        <div class="box">
                            <div v-if="subitem.blockchainName" v-for="(subitem,j) in subCategoriesList" :key="j">
                                <platform :blockchain-name='subitem.blockchainName' :blockchain-url='subitem.blockchainUrl' :blockchain-keyword='subitem.blockchainKeyword' :blockchain-icon='subitem.blockchainIcon'></platform>
                            </div>
                        </div>

                    </div>

                </section>
            </div>
        </div>
        <toTop></toTop>
    </div>
</template>

<script>
import platform from "~/components/navigation/platform.vue";
import personage from "~/components/navigation/personage.vue";
import moreActivity from "~/components/navigation/moreActivity.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
export default {
    components: {
        moreActivity,
        platform,
        personage,
        toTop
    },
    data() {
        return {
            active: 0,
            size: 20,
            isShow: "",
            isFade: {
                display: "none"
            },
            pageIndex: 1,
            candy: [],
            resultMapsList1: [],
            subCategoriesList: [],
            resultMapsList: [],
            subCategoriesActive: []
        };
    },

    async asyncData({ params }) {
        let [addCategoryRes] = await Promise.all([
            axios.get(`/web/navigation/more`)
        ]);

        return {
            subAddCategoryRes:
                (!addCategoryRes.serviceError &&
                    addCategoryRes.data.subCategoryList) ||
                []
        };
    },
    created() {
        // this.clickItem(15);
        this.getCategoryId();
    },
    methods: {
        async getCategoryId() {
            // console.log(Number(this.$route.query.id));

            if (!this.$route.query.id) {
                this.active = 15;
            } else {
                this.active = Number(this.$route.query.id);
            }
            if (this.active == 23) {
                let candylist = await axios.post(
                    `http://120.79.0.99/market/api/marketAll/candies?page=1&size=20`
                );
                // console.log(candylist);
                this.candy = candylist.data.candies;
            } else if (this.active == 24) {
                let { data } = await axios.get(
                    `/web/navigation/more?categoryId=${this.active}`
                );
                this.subCategoriesActive = data.data.content;
                // console.log(data);
                
            } else {
                let { data } = await axios.get(
                    `/web/navigation/more?categoryId=${this.active}`
                );
                this.subCategoriesList = data.data || [];
                this.resultMapsList = data.data2 || [];
            }
            // console.log(this.subCategoriesActive);
        },
        async clickItem(active) {
            this.subCategoriesList = {};
            this.pageIndex = 0;
            this.active = active;
            // console.log(this.active);
            if (active == 23) {
                let candylist = await axios.post(
                    `http://120.79.0.99/market/api/marketAll/candies?page=1&size=20`
                );
                this.candy = candylist.data.candies;
                // console.log(candylist);
            } else if (active == 24) {
                let { data } = await axios.get(
                    `/web/navigation/more?categoryId=${this.active}`
                );
                // console.log(data);
                this.subCategoriesActive = data.data.content;
                // console.log(this.subCategoriesActive);

                if (data.data.content.length < data.data.size) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
            } else {
                let { data } = await axios.get(
                    `/web/navigation/more?categoryId=${this.active}`
                );
                this.subCategoriesList = data.data || [];
                this.resultMapsList = data.data2 || [];
                // console.log(this.subCategoriesList);
            }
        },
        async moreCandy() {
            this.size += 10;
            let { data } = await axios.post(
                `http://120.79.0.99/market/api/marketAll/candies?page=1&size=${this.size}`
            );
            // console.log(data);

            if (data.candies.length < this.size) {
                this.isShow = "display:none";
                this.isFade = "display:block";
            }
            this.candy = data.candies || [];
            // console.log(this.candy);
        },
        async addSize() {
            this.pageIndex += 1;
            let { data } = await axios.get(
                `/web/navigation/more?categoryId=${this.active}&pageIndex=${
                    this.pageIndex
                }`
            );
            // console.log(data);
            if (data.data.totalPages < this.pageIndex) {
                this.isShow = "display:none";
                this.isFade = "display:block";
            }
            this.subCategoriesActive = data.data.content;
        }
    }
};
</script>
<style>
.candy-main ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.candy-main {
    width: 1200px;
    margin: 0px auto;
}

.candy-main .title {
    width: 1200px;
    height: 42px;
    margin: 0 auto;
    line-height: 42px;
    color: #d9d9d9;
    font-size: 14px;
}

.candy-main .title a {
    color: #d9d9d9;
}

.candy-main .title a:hover {
    color: #f25a36;
}

.candy-main .content {
    width: 1200px;
}

.candy-main .content a {
    display: inline-block;
    /* width: 993px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.candy-main .subnav {
    width: 1200px;
    height: 55px;
    margin: 0 auto;
    border-top: 2px solid #f25a36;
    border-bottom: 1px solid #f2f2f2;
}

.candy-main .subnav a {
    display: inline-block;
    vertical-align: top;
    height: 55px;
    color: #404040;
    font-size: 18px;
    font-family: "PingFangSC-Light";
    height: 55px;
    line-height: 55px;
    margin-right: 30px;
    text-decoration: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.candy-main .subnav a:hover {
    color: #f25a36;
}

.candy-main .subnav a.active {
    color: #f25a36;
    border-bottom: 2px solid #f25a36;
}

.candy-main section {
    width: 100%;
    /* height: 465px; */
}
/* .candy-main section div {
    line-height:20px;
} */
.candy-main p.subTitle {
    font-size: 18px;
    width: 100%;
    height: 55px;
    line-height: 55px;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
}

.candy-main .box {
    width: 100%;

    margin-bottom: 50px;
}
.candy-main .box > div {
    display: inline-block;
}
.candy-main .box > div,
.candy-main section .box > a {
    margin-right: 12px;
}

.candy-main .box > div:nth-child(6n),
.candy-main section .box > a:nth-child(6n) {
    margin-right: 0;
}

.candy-main .activity-box {
    /* display: inline-block; */
    width: 100%;
    margin-top: 16px;
    /* width: 290px; */
    /* float: left; */

    /* display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    -ms--webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-lines: multiple;
    -moz-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-lines: multiple;
    -moz-flex-wrap: wrap;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start; */
}

.candy-main .activity-box > div {
    display: inline-block;
    width: 290px;
    margin-right: 13px;
}

.candy-main .activity-box > div:nth-child(4n) {
    margin-right: 0;
}

.candy-main .morecandy li {
    width: 100%;
    padding-top: 15px;
    height: 92px;
    position: relative;
}

.candy-main .morecandy li a {
    display: block;
    width: 100%;
    height: 100%;
}

.candy-main .morecandy .more {
    display: block;
    margin: 20px auto 50px;
    width: 200px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-radius: 30px;
    font-size: 18px;
    border: 1px solid #f25a36;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #f25a36;
}

.candy-main .morecandy .more:hover {
    background-color: #f25a36;
    color: #fff;
}

.btn-one {
    width: 100%;
    height: 90px;

    display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -webkit--moz-box-pack: center;
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

.deadLine {
    max-width: 600px;
    margin: 0 auto;
    background-color: #f2f2f2;
    height: 1px;
    position: absolute;
    top: 40px;
}

.deadLineText {
    display: block;
    width: 200px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    position: absolute;
    top: 20px;
    margin: 0 auto;
    /* margin: 19px 0 50px; */
    color: #a6a6a6;
    background-color: #fff;
}

.candy-main .morecandy li:hover .text {
    color: #f25a36;
}

.candy-main .morecandy li .content {
    margin-top: 23px;
    margin-bottom: 13px;
}

.candy-main .morecandy li .text {
    display: inline-block;
    width: 974px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.candy-main .morecandy li .message {
    padding-left: 20px;
    color: #a6a6a6;
    font-size: 11px;
}

.candy-main .morecandy li .message i {
    font-size: 11px;
}

.candy-main .morecandy li .message .iconfont {
    font-size: 16px;
}

.candy-main .morecandy li .point {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #f25a36;
}

.candy-main .morecandy li .pre-title {
    color: #f25a36;
}

.candy-main .morecandy li .getCandy {
    width: 90px;
    height: 30px;
    border: 1px solid #f25a36;
    color: #f25a36;
    text-align: center;
    line-height: 30px;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
    border-radius: 30px;
}

.candy-main .morecandy li .getCandy:hover {
    background-color: #f25a36;
    color: #fff;
}

.threeCategory {
    border-bottom: 2px solid #f25a36;
}

.threeCategory:last-child {
    border-bottom: none;
}
</style>
