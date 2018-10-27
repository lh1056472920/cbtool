<template>
    <div>
        <header :class="{active1:'isFixed' === active1}">
            <div class="header">
                <div class="headerlogo">
                    <img @click.stop.prevent="clickItem(1)" class="logo" src="~/static/images/logo.png" alt="logo">
                </div>
                <nav v-if="isshow===0">
                    <a v-for="(item, i) in $store.state.topicList" :key="i" v-if="item.topicIsShow===1" :data-id='item.topicId' v-text="item.topicName" :class="{active: active===topicArr[item.topicId]}" @click.stop.prevent="clickItem(item.topicId,item.topicName)"></a>
                    <!-- <a :class="{active: active==='index'}" @click.stop.prevent="clickItem('index')">首页</a>
                    <a :class="{active: active==='info'}" @click.stop.prevent="clickItem('info')">资讯</a>
                    <a :class="{active: active==='quotation'}" @click.stop.prevent="clickItem('quotation')">行情</a>
                    <a :class="{active: active==='character'}" @click.stop.prevent="clickItem('character')">人物</a>
                    <a :class="{active: active==='video'}" @click.stop.prevent="clickItem('video')">视频</a>
                    <a :class="{active: active==='coin'}" @click.stop.prevent="clickItem('coin')">币种大全</a>
                    <a :class="{active: active==='navigation'}" @click.stop.prevent="clickItem('navigation')">区块链导航</a> -->
                </nav>
                <div v-if="isshow===0" class="search">
                    <input type="text" name="search" autocomplete="off" placeholder="请输入搜索关键词" v-model="searchText" @keyup.13="clickItem(0)">
                    <span :style="isFalse" id="iconSearch" class="el-icon-search icon-search" @click.stop.prevent="clickItem(0)" @mousedown='mousedown()' @mouseup='mouseup()' @mouseout='mouseout()'></span>
                </div>
                <div v-if="isshow===0" class="lr">
                    <a class="login" href="">登录</a>
                    <a class="register" href="">注册</a>
                </div>
            </div>
        </header>
        <!-- <nuxt ref="nuxt" /> -->
        <nuxt :class="{active1:'isFixed' === active1}" />
        <footer class="onef">

            <div class="footer">
                <div class="inner">
                    <ul class="link">
                        <li>
                            <nuxt-link :to="{path:'/aboutSelf',query:{active:1}}" class="self">关于我们</nuxt-link>
                            <!-- <a href="">关于我们</a> -->
                        </li>
                        <li>
                            <!-- <a class="self" @click="clickItem('aboutSelf')">服务条款</a> -->
                            <nuxt-link :to="{path:'/aboutSelf',query:{active:2}}" class="self">服务条款</nuxt-link>

                        </li>
                        <li>
                            <!-- <a class="self" @click="clickItem('aboutSelf')">联系我们</a> -->
                            <nuxt-link :to="{path:'/aboutSelf',query:{active:3}}" class="self">联系我们</nuxt-link>

                        </li>
                        <li>
                            <!-- <a class="self" @click="clickItem('aboutSelf')">意见反馈</a> -->
                            <nuxt-link :to="{path:'/aboutSelf',query:{active:4}}" class="self">意见反馈</nuxt-link>

                        </li>
                        <li>
                            <a class="self" @click="clickItem('navmap')">导航地图</a>
                        </li>
                    </ul>
                    <ul class="linker">
                        <li>
                            <div class="qq-code">
                                <div class="caret"></div>
                            </div>
                        </li>
                        <li>
                            <div class="wx-code">
                                <div class="caret"></div>
                            </div>
                        </li>
                        <li>
                            <a href="https://weibo.com/6542126301/profile?topnav=1&wvr=6" target="_blank"></a>
                        </li>
                        <li>
                            <a href="https://www.toutiao.com/c/user/98011295234/#mid=1599613489668110" target="_blank"></a>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="cooperative" v-if="getActive==='index'">
                <div class="inner">

                    <div class="left">
                        <div class="cooperative-partner" v-for="(subitem, i) in $store.state.friendlink" :key=i>
                            <span>{{subitem.categoryName}}：</span>
                            <a :href="item.footerUrl" v-for="(item, i) in $store.state.partner[subitem.categoryId]" :key=i v-text="item.footerName" target="_blank"></a>
                        </div>
                        <!-- <div class="friendship-link">
                            <span>友情链接：</span>
                            <a :href="item.footerUrl" v-for="(item, i) in $store.state.friendlink" :key=i v-text="item.footerName" target="_blank"></a>
                        </div> -->
                        <p class="copyright">{{copyright}}</p>
                    </div>
                    <div class="right">
                        <img class="bottomLogo" src="~/static/images/logo.png" alt="">
                        <div class="cooperativeContainer">
                            <p class="cooperativeContact">合作邮箱：79169341@qq.com</p>
                            <p class="cooperativeContact">合作QQ：79169341</p>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    </div>
</template>
<script>
import axios from "../plugins/axios.js";
require("babel-polyfill");
export default {
    data() {
        return {
            isshow: 0,
            isFalse: {},
            topicArr: [
                "search",
                "index",
                "info",
                "quotation",
                "character",
                "video",
                "coin",
                "navigation"
            ],
            active: "index",
            active1: "",
            searchText: "",
            copyright:
                "©Shen Zhen lian xiang Technology Co., Ltd All Rights Reserved | chainfor.com-粤ICP备17152090号"
        };
    },
    beforeCreate() {
        // this.PCorWaps();
        },
    created() {
        // window.location.href = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "http://m.lian2345.com/#/" :  "http://www.lian2345.com";
        
    },
    mounted() {
        this.active = this.$route.name;
        // this.PCorWaps();
        this.getDate();
        window.addEventListener("scroll", this.handleScroll);
    },
    computed: {
        getActive() {
            console.log(this.$store.getters.getActiveHeaderNav);
            return this.$store.getters.getActiveHeaderNav;
        }
    },
    watch: {},
    methods: {
        // async PCorWaps() {
        //     if (
        //         /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
        //             navigator.userAgent
        //         )
        //     ) {
        //         window.location.href = "http://m.lian2345.com/#/";
        //     } else {
        //         //pc
        //         window.location.href = "http://www.lian2345.com";
        //     }
        // },
        async clickItem(activeIndex, topicName) {
            let active = this.topicArr[activeIndex];
            console.log(activeIndex);

            if (active === "index") {
                this.$router.push({
                    path: "/"
                });
                _czc.push(["_trackEvent", "首页导航", "切换", "首页"]);
            } else if (active === "search") {
                // this.isFalse = { "box-shadow:": "none" };
                if (this.searchText.trim() !== "") {
                    // console.log(111);
                    
                    this.$router.push({
                        path: `/${active}`,
                        query: {
                            searchText: this.searchText
                        }
                    });
                    _czc.push(["_trackEvent", "全局搜索", "搜索"]);
                }
                //添加ref可以访问子组件的方法  但会从其他页面全局搜索时会报错
                // this.$refs.nuxt.$children[0].search(this.searchText);
            } else if (activeIndex === "aboutSelf") {
                this.$router.push({
                    path: `/${activeIndex}`
                });
                _czc.push(["_trackEvent", "关于我们", "点击"]);
            } else if (activeIndex === "navmap") {
                // else if (activeIndex === "aboutSelf") {
                //     this.$router.push({
                //         path: `/${activeIndex}`
                //     });
                // }
                this.$router.push({
                    path: `/${activeIndex}`
                });
                _czc.push(["_trackEvent", "导航地图", "点击"]);
            } else {
                this.$router.push({
                    path: `/${active}`,
                    query: { id: activeIndex }
                });
                _czc.push(["_trackEvent", "首页导航", "切换", topicName]);
            }
            console.log(active);
            
            this.active = active;
        },
        async getDate() {
            // console.log(this.$store.getters.getActiveHeaderNav);
            if (this.$store.getters.getActiveHeaderNav === "custom") {
                // console.log(2222);

                this.isshow = 1;
            }
            // console.log(this.isshow);

            let promises = [axios.get("/web/topic"), axios.get("/web/footer")];
            let results = await Promise.all(promises);
            let topicList = (!results[0].serviceErr && results[0].data) || [];
            let resultMaps =
                (!results[1].serviceErr && results[1].data.resultMaps) || {};
            // let partner = resultMaps["25"];
            // let friendlink = resultMaps["26"];
            this.$store.commit("changeTopicList", topicList);
        },
        handleScroll(e) {
            if (document.documentElement.scrollTop > 0) {
                this.active1 = "isFixed";
            } else {
                this.active1 = "";
            }
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
body #__layout > div > div {
    min-height: 790px;
}
header {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 0 0 5px #f2f2f2;
    box-shadow: 0 0 5px #f2f2f2;
    z-index: 99;
}

header.active1 {
    background-color: #fff;
    position: fixed;
    top: 0;
}
.headerlogo {
    display: inline-block;
    height: 60px;
    padding-top: 15px;
}
.logo {
    /* position: absolute;
    top: 20px; */
    width: auto;
    height: 32px;
    margin: 0 40px 0 0;
}

.logo:hover {
    cursor: pointer;
}

nav {
    width: 650px;
    height: 60px;
    font-size: 14px;
    color: #404040;
    display: inline-block;
    line-height: 60px;
    vertical-align: top;
}

nav a {
    padding: 21px 15px;
    color: #404040;
    text-decoration: none;
}

nav a:hover {
    color: #f25a36;
    cursor: pointer;
}

nav a.active {
    color: #f25a36;
    border-bottom: #f25a36 solid 2px;
}

.header {
    width: 1200px;
    /* line-height: 60px; */
    position: relative;

    margin: 0 auto;
}

.search {
    display: inline-block;
    vertical-align: top;
    /* padding-top */
    margin-top: 15px;
    /* display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center; */
    width: 194px;
    height: 28px;
    padding: 0 11px;
    border: #f25a36 solid 1px;
    border-radius: 20px;
    position: relative;
    padding-top: 4px;
    box-sizing: border-box;
}

.search input {
    font-size: 14px;
    font-weight: 100;
    height: 16px;
    border: 0;
    background-color: transparent;
    outline: none;
}

.search span {
    top: 3px;
    right: 6px;
    position: absolute;
    cursor: pointer;
}

.self:hover {
    cursor: pointer;
    color: #f25a36;
}

footer {
    width: 100%;
    background-color: #272930;
}

footer .cooperative {
    width: 1200px;
    margin: 0 auto;
    background-color: #272930;
}
.footer {
    width: 100%;
    height: 80px;
    background-color: #30343d;
}

.inner {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
}

.link {
    display: inline-block;
    width: 787px;
    height: 80px;
    line-height: 80px;
    margin-right: 80px;
    vertical-align: top;
}
.link li:last-child {
    margin: 0;
}
li {
    display: inline-block;
}

.link li {
    cursor: pointer;
    padding-right: 73px;
}

.link li a {
    font-size: 18px;
    color: #c1c2c5;
    text-decoration: none;
}

.linker {
    /* position: absolute;
  right: 0; */
    position: relative;
    width: 330px;
    height: 80px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.linker > li {
    margin-right: 36px;
    width: 40px;
    height: 40px;
    cursor: pointer;
}

.linker > li:last-child {
    margin-right: 0;
}

.linker > li > div {
    position: absolute;
}

.linker > li > a {
    display: block;
    width: 100%;
    height: 100%;
}

.linker > li:first-child {
    background-image: url("~/static/images/f-contact-qq-h.png");
    background-image: url("~/static/images/f-contact-qq.png");
}

.linker li:nth-child(2) {
    background-image: url("~/static/images/f-contact-wx-h.png");
    background-image: url("~/static/images/f-contact-wx.png");
}

.linker li:nth-child(1):hover {
    background-image: url("~/static/images/f-contact-qq-h.png");
}

.linker li:nth-child(2):hover {
    background-image: url("~/static/images/f-contact-wx-h.png");
}

/* .linker > li:nth-child(1):hover { background-position: 0 -40px; } */
.linker > li:nth-child(1):hover .qq-code {
    position: absolute;
    top: -132px;
    right: 243px;
    width: 131px;
    height: 132px;
    /* border: 1px solid #ccc; */
    -webkit-box-shadow: 0 0 8px #30343d;
    box-shadow: 0 0 8px #30343d;
    background: url("~/static/images/qq-QRcode.jpg") no-repeat -3px -11px;
    background-size: 137px 192px;
}

.linker > li:nth-child(2):hover .wx-code {
    position: absolute;
    top: -132px;
    right: 170px;
    width: 131px;
    height: 132px;
    /* border: 1px solid #ccc; */
    -webkit-box-shadow: 0 0 8px #30343d;
    box-shadow: 0 0 8px #30343d;
    background: url("~/static/images/wx-QRcode.jpg") no-repeat -3px -39px;
    background-size: 137px 192px;
}

.linker > li:hover .caret {
    position: absolute;
    bottom: -16px;
    left: 50%;
    border: 8px solid transparent;
    border-top: 8px solid #fff;
    -webkit-transform: translateX(-8px);
    transform: translateX(-8px);
}

.linker > li:nth-child(3) {
    background-image: url("~/static/images/f-contact-wb.png");
}

.linker > li:nth-child(4) {
    background-image: url("~/static/images/f-contact-tt.png");
}

.linker > li:nth-child(3):hover {
    background-image: url("~/static/images/f-contact-wb-h.png");
}

.linker > li:nth-child(4):hover {
    background-image: url("~/static/images/f-contact-tt-h.png");
}

.cooperative {
    background-color: #272930;
    -ms--webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-lines: multiple;
    -moz-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-lines: multiple;
    -moz-flex-wrap: wrap;
}

.left {
    display: inline-block;
    width: 787px;
    margin-right: 80px;
}

.left a:hover {
    color: #f25a36;
}

.right {
    display: inline-block;
    width: 268px;
    height: 236px;
    vertical-align: top;
}

.cooperative-partner,
.friendship-link {
    display: -ms-flexbox;
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
    margin: 36px 0;
    font-size: 14px;
    color: #88898d;
    line-height: 30px;
}

.cooperative-partner a,
.friendship-link a {
    color: #88898d;
    text-decoration: none;
    padding-right: 12px;
}

.copyright {
    font-size: 14px;
    color: #88898d;
    margin-bottom: 54px;
}

input::-webkit-input-placeholder {
    color: #d9d9d9;
}
.lr {
    height: 60px;
    line-height: 60px;
    display: inline-block;
    vertical-align: top;
}
.register,
.login {
    font-size: 14px;
    margin: 0 10px;
    color: #f25a36;
    text-decoration: none;
}

.icon-search {
    font-size: 20px;
    color: #f25a36;
}

.bottomLogo {
    margin-top: 36px;
}

.cooperativeContainer {
    padding: 10px 0;
}

.cooperativeContact {
    font-size: 14px;
    color: #88898d;
    padding-top: 10px;
}
.el-icon-search:hover {
    box-shadow: 0px 0px 3px 1px #f2f2f2;
    box-sizing: border-box;
}
</style>
