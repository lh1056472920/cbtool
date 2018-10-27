<template>

    <div class="coinall">
        <div class="coin-title">
            <span class="coin-title-coin">优质项目展示</span>
        </div>
        <div class="impcoin">
            <ul>
                <li class="impcoin-list" v-for="(item1,index) in impcoin" :key="index">
                    <div class="impcoin-list-li">
                        <img :src="`${item1.image}`" :onerror="actImgDefault" alt="">
                        <div class="impcoin-list-text">
                            <p>{{item1.englishName}}</p>
                            <div v-html="item1.projectIntroduction"></div>
                            <nuxt-link :to="'quotation/quotationDetail/name='+item1.name+'&code='+item1.code.split(' ')[0]+'&id=coin'" class="checkDetail">查看详情</nuxt-link>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="allcoin">
            <span class="allcoin-coin">全部项目展示</span>
            <div class="sou">
                <input type="text" name="search" autocomplete="off" placeholder="请输入币种名称" v-model="searchText" @keyup.13="clickItem('search')">
                <span :style="isFalse" class="el-icon-search icon-search" @click.stop.prevent="clickItem(0)" @mousedown='mousedown()' @mouseup='mouseup()' @mouseout='mouseout()'></span>
            </div>
        </div>
        <div class="coinlist">
            <ul>
                <!-- <div class="searchNothing" v-if="projectList.list && projectList.list.length == 0">
                    <img src="~/static/images/search-nothing.png" alt="">
                    <p>暂无搜索内容</p>
                </div> -->
                <nuxt-link :to="'quotation/quotationDetail/name='+item.name+'&code='+item.code.split(' ')[0]+'&id=coin'" v-if="coinlist1.length==0&&num==0&&end!=0" class="coinlist-list" v-for="(item,i) in coinlist" :key="i">
                    <div class="coinlist-img">
                        <img class="coinlist-list-img" :src="`${item.image}`" :onerror="actImgDefault" alt="">
                    </div>
                    <div class="coinlist-describe">
                        <div class="coinlist-describe-title">
                            <span class="coinlist-list-describe-title">{{item.name}}/{{item.chineseName}}
                            </span>
                            <span class="coinlist-list-describe-introduce" v-html="item.projectIntroduction">
                            </span>
                            <span class="coinlist-describe-content">
                                <span class="yuan"></span>{{item.relatedNotion}}
                            </span>
                        </div>
                    </div>
                </nuxt-link>
                <nuxt-link :to="'quotation/quotationDetail/name='+item.name+'&code='+item.code.split(' ')[0]+'&id=coin'" v-if="coinlist1.length!=0&&num!=-1&&end!=0" class="coinlist-list" v-for="item in coinlist1" :key="item.index">
                    <div class="coinlist-img">
                        <img class="coinlist-list-img" :src="`${item.image}`" :onerror="actImgDefault" alt="">
                    </div>
                    <div class="coinlist-describe">
                        <div class="coinlist-describe-title">
                            <span class="coinlist-list-describe-title">{{item.name}}/{{item.chineseName}}
                            </span>
                            <span class="coinlist-list-describe-introduce" v-html="item.projectIntroduction">
                            </span>
                            <span class="coinlist-describe-content">
                                <span class="yuan"></span>{{item.relatedNotion}}
                            </span>
                            <!-- <span class="coinlist-describe-content">
                                <span class="yuan"></span>{{item.relatedNotion}}
                            </span> -->
                        </div>
                    </div>
                </nuxt-link>

            </ul>
        </div>
        <!-- <no-msg :list='coinlist1'></no-msg> -->
        <div class="searchNothing" v-if="num==-1||end==0">
            <img src="~/static/images/search-nothing.png" alt="">
            <p>暂无搜索内容</p>
        </div>
        <div class="btn-one" v-show='num==0&&end!=0&&ending==0'>
            <button class="more" @click="addmore" :style="isShow">查看更多</button>
            <hr :style="isFade" class="deadLine">
            <p :style="isFade" class="deadLineText">我是有底线的</p>
        </div>
    </div>

</template>

<script>
import axios from "~/plugins/axios.js";

export default {
    name: "coinal",
    props: {
        impcoin: Array,
        coinlist: Array
    },
    data() {
        return {
            isFalse: {},
            searchText: "",
            coinlist1: [],
            pageIndex: 1,
            actImgDefault:
                'this.src="' +
                require("~/static/images/coin-default.jpg") +
                '"',
            num: 0,
            isShow: "",
            isFade: {
                display: "none"
            },
            end: 1,
            ending:0,
        };
    },
    created() {
        this.coin();
    },
    methods: {
        async clickItem() {
            this.searchText;
            // console.log(this.searchText);

            if (this.searchText.trim() == "") {
                // console.log(111);

                return;
            } else {
                // console.log(222);

                let { data } = await axios.post(
                    "/entityController/search/single",
                    `name=${this.searchText}`
                );
                // console.log(data);
                // console.log(this.end);

                if (!data || data.code === -1) {
                    this.num = -1;
                    this.end = 0;
                    return;
                } else {
                    this.ending=1
                    this.coinlist1 = data.index_token.list || [];
                    this.end = data.index_token.endRow;
                }
                // console.log(this.coinlist1);

                _czc.push([
                    "_trackEvent",
                    "币种大全页",
                    "全部项目展示",
                    "搜索"
                ]);
            }
        },
        async coin() {
            this.pageIndex = 1;

            let { data } = await axios.get("/web/tokendetail/more", {
                params: { pageIndex: this.pageIndex }
            });
            let arr = data.content;
            this.coinlist1 = this.coinlist1.concat(arr) || [];
            if (data.totalPages < this.pageIndex) {
                this.isShow = "display:none";
                this.isFade = "display:block";
            }
            if (arr.length == 0) {
                return;
            }
            console.log(this.coinlist1);
        },
        async addmore() {
            this.pageIndex += 1;

            let { data } = await axios.get("/web/tokendetail/more", {
                params: { pageIndex: this.pageIndex }
            });
            let arr = data.content;
            this.coinlist1 = this.coinlist1.concat(arr) || [];
            if (data.totalPages < this.pageIndex) {
                this.isShow = "display:none";
                this.isFade = "display:block";
            }
            if (arr.length == 0) {
                return;
            }
            _czc.push([
                "_trackEvent",
                "币种大全页",
                "全部项目展示",
                "点击查看更多"
            ]);
        },
        async mousedown() {
            this.isFalse = { "box-shadow": "0px 0px 3px 2px #ccc" };
        },
        async mouseup() {
            this.isFalse = {};
        },
        async mouseout() {
            this.isFalse = {};
        }
    }
};
</script>

<style scoped>
.searchNothing {
    margin-bottom: 30px;
}

.coinall {
    width: 1200px;
    text-align: center;
}

.coin-title {
    height: 110px;
    width: 100%;
    line-height: 110px;
    font-size: 36px;
    color: #404040;
    text-align: center;
}

.impcoin > ul {
    height: 279px;
}

.impcoin .impcoin-list {
    list-style: none;
    width: 220px;
    height: 100%;
    float: left;
    margin-right: 25px;
    background-color: #fff;
}

.impcoin .impcoin-list-li {
    border-radius: 8px;
    -webkit-box-shadow: 0 5px 6px 5px rgba(217, 217, 217, 0.3);
    box-shadow: 0 5px 6px 5px rgba(217, 217, 217, 0.3);
    width: 220px;
    height: 100%;
    position: relative;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    overflow: hidden;
}

.impcoin .impcoin-list-li:hover {
    width: 240px;
    height: 305px;
    margin: -2px 0px 0px -8px;
    -webkit-box-shadow: 0 0 15px 0 #404040;
    box-shadow: 0 0 15px 0 #404040;
}

.impcoin .impcoin-list-li:hover .impcoin-list-text {
    -webkit-animation: slideTop 0.2s linear;
    animation: slideTop 0.2s linear;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    padding: 0 12px;
    /* width: 220px; */
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
}

@-webkit-keyframes slideTop {
    0% {
        top: 225px;
    }
    100% {
        top: 0px;
    }
}

@keyframes slideTop {
    0% {
        top: 225px;
    }
    100% {
        top: 0px;
    }
}
.impcoin .impcoin-list:last-child {
    margin-right: 0;
}

.impcoin .impcoin-list > .impcoin-list-li > img {
    height: 225px;
    width: 100%;
    border-radius: 8px 8px 0 0;
}

.impcoin .impcoin-list .impcoin-list-text {
    width: 220px;
    position: absolute;
    top: 225px;
    height: 310px;
    background-color: #fff;
    color: #404040;
}

.impcoin .impcoin-list .impcoin-list-text > p {
    height: 54px;
    text-align: center;
    line-height: 54px;
    font-size: 18px;
    border-bottom: 1px solid #f25a36;
}

.impcoin .impcoin-list .impcoin-list-text > div {
    font-size: 14px;
    line-height: 20px;
    padding-top: 10px;
    text-align: left;
    height: 160px;
    overflow: hidden;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
}

.checkDetail {
    display: block;
    width: 120px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 12px;
    color: #f25a36;
    border: 1px solid #f25a36;
    border-radius: 20px;
    margin: 20px auto;
}

.checkDetail:hover {
    color: #fff;
    background-color: #f25a36;
}

.allcoin {
    height: 90px;
    line-height: 90px;
    font-size: 24px;
    border-top: 2px solid #f25a36;
    margin-top: 50px;
    position: relative;
    text-align: left;
    padding-left: 20px;
}

.allcoin-coin {
    font-size: 24px;
    color: #404040;
}

.allcoin .sou {
    top: 0;

    display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    position: absolute;
    right: 20px;
    height: 100%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.allcoin .sou > span {
    position: absolute;
    top: 33px;
    right: 12px;
    cursor: pointer;
    color: #f25a36;
}

.allcoin .sou > input {
    width: 216px;
    height: 28px;
    border-radius: 20px;
    border: 1px solid #f25a36;
    padding-left: 10px;
    outline: none;
    padding-right: 40px;
}

.coinlist {
    position: relative;
    text-align: left;
    margin-bottom: 20px;
}

.coinlist-list {
    /* display: block; */
    display: inline-block;
    border-radius: 8px;
    position: relative;
    width: 392px;
    vertical-align: top;
    /* float: left; */
    height: 150px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 12px;
    margin-top: 12px;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    background-color: #f9fafb;
    cursor: pointer;
}

.coinlist-list:nth-child(3n) {
    margin-right: 0px;
}

.coinlist-list:hover {
    -webkit-box-shadow: 0 0 6px 0 #404040;
    box-shadow: 0 0 6px 0 #404040;
    background-color: #fff;
}

.coinlist-img {
    float: left;
    display: inline-block;
    width: 148px;
    height: 100%;
    cursor: pointer;
    margin-right: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* width: 148px; */
}

.coinlist-img .coinlist-list-img {
    width: 148px;
    /* width: 100%; */
    height: 100%;
    border-radius: 8px 0 0 8px;
}

.coinlist-describe {
    float: left;
    width: 210px;
    display: inline-block;
    padding: 15px;
    /* position: relative; */
    overflow: hidden;
    text-align: left;
    vertical-align: top;
}

.coinlist-list:hover .coinlist-describe {
    left: 0px;
    padding: 15px;
    position: absolute;
    width: 362px;
    height: 120px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
}

.coinlist-list:hover .coinlist-describe .coinlist-list-describe-title,
.coinlist-list:hover .coinlist-describe .coinlist-describe-content,
.coinlist-list:hover .coinlist-describe .coinlist-list-describe-introduce {
    color: #fff;
}

.coinlist-list-describe-title {
    display: block;
    color: #404040;
    line-height: 15px;
    font-size: 14px;
    margin-bottom: 6px;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
}

.coinlist-list-describe-introduce {
    font-size: 12px;
    color: #a6a6a6;
    line-height: 22px;
    height: 43px;
    overflow: hidden;
    display: block;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.coinlist-list:hover .coinlist-list-describe-introduce {
    height: 84px;
    -webkit-line-clamp: 4;
}

.coinlist-describe-content {
    position: absolute;
    bottom: 15px;
    display: block;
    color: #a6a6a6;
    font-size: 12px;
}

.coinlist-describe-content .yuan {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: #f25a36;
    margin-right: 10px;
}

:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #d9d9d9;
    opacity: 1;
}

::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #d9d9d9;
    opacity: 1;
}

input:-ms-input-placeholder {
    color: #d9d9d9;
    opacity: 1;
}

input::-webkit-input-placeholder {
    color: #d9d9d9;
    opacity: 1;
}

.coinall > .btn-one {
    width: 100%;
    /* height: 206px; */

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
    margin: 19px 0 20px;
    color: #f25a36;
    background-color: transparent;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
}

.deadLine {
    width: 600px;
    margin: 0 auto;
    background-color: #f2f2f2;
    height: 1px;
    position: absolute;
    top: 103px;
}

.deadLineText {
    width: 200px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    position: absolute;
    top: 80px;
    margin: 0 auto;
    color: #a6a6a6;
    background-color: #fff;
}
.el-icon-search:hover {
    box-shadow: 0px 0px 3px 1px #f2f2f2;
    box-sizing: border-box;
}
</style>
