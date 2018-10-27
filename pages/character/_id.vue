<template>
    <div>
        <div class="character">
            <div class="left">
                <!-- 人物详情 -->
                <!-- <characterinfo :resultMaps='resultMaps' :subCategoryList='subCategoryList'></characterinfo> -->
                <header>
                    <nav>
                        <a v-for="item2 in subCategoryList" :key="item2.categoryId" :class="{active: active==item2.categoryId}" @click.stop.prevent="clickItem(item2.categoryId,item2.categoryName)">{{item2.categoryName}}</a>

                    </nav>
                </header>
                <div class="footerlist">

                    <div class="info-list" v-show="active==item1.categoryId" v-for="(item1,index) in subCategoryList" :key="index">
                        <div  class="loop" v-for="(item,i) in resultMaps[item1.categoryId].content" :key="i">
                            <nuxt-link :to="{path:'/character/characterinfo',query: {id: item.articleId,categoryId:item.categoryId,active:item1.categoryId}}">
                                <div class="info-img">
                                    <img class="info-list-img" :src="`${item.articleImage}`" :onerror="actImgDefault" alt="">
                                    <span class="info-img-one">人物</span>
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
                    </div>

                </div>
                <div class="btn-one">
                    <button @click="addSize" :style="isShow">更多内容</button>
                    <hr :style="isFade" class="deadLine">
                    <p :style="isFade" class="deadLineText">我是有底线的</p>
                </div>
            </div>
            <div class="right">
                <!-- 专访人物 -->
                <morecharacter></morecharacter>
            </div>
        </div>
        <toTop></toTop>
    </div>
</template>
<script>
import morecharacter from "~/components/character/morecharacter.vue";
import toTop from "~/components/video/toTop.vue";

import axios from "~/plugins/axios.js";
export default {
    components: {
        morecharacter,

        toTop
    },
    data() {
        return {
            // active: 30,
            pageIndex: 1,
            pageSize: 20,
            isShow: "",
            isFade: {
                display: "none"
            },
            actImgDefault:
                'this.src="' +
                require("~/static/images/默认图_首页资讯.jpg") +
                '"'
        };
    },
      head() {
        return {
            title: "区块链人物_链2345区块链资讯导航"
        };
    },
    async asyncData({params}) {
        let [datalist] = await Promise.all([
            axios.get("/web/topic/person/more")
        ]);

        return {
            resultMaps:
                (!datalist.serviceError && datalist.data.resultMaps) || [],
            subCategoryList:
                (!datalist.serviceError && datalist.data.subCategoryList) || [],
                active: Number(params.id) ||30,
        };
    },
    created() {
        this.addSize();
        // this.clickItem(this.active)
    },
    methods: {
        async clickItem(addSize, categoryName) {
            
            this.active = addSize;
            // console.log(this.active);
            this.pageSize = 20;
            this.isShow = "";
            this.isFade = { display: "none" };

            let { data } = await axios.get("/web/topic/person/more", {
                params: { pageIndex: 1, pageSize: 20 }
            });
            if (data.resultMaps[this.active].totalElements < 20) {
                this.isShow = "display:none";
                this.isFade = "display:block";
            }
            this.resultMaps = data.resultMaps;
            this.subCategoryList = data.subCategoryList;
            // console.log(data);

            _czc.push(["_trackEvent", "人物列表", "切换列表", categoryName]);
        },
        async addSize() {
            // console.log(this.active);
            
            this.pageSize += 20;
            let { data } = await axios.get("/web/topic/person/more", {
                params: { pageIndex: 1, pageSize: this.pageSize }
            });
            if (data.resultMaps[this.active].totalElements < this.pageSize) {
                this.isShow = "display:none";
                this.isFade = "display:block";
            }
            this.resultMaps = data.resultMaps;
            this.subCategoryList = data.subCategoryList;
            _czc.push(["_trackEvent", "人物列表", "点击更多内容"]);
        }
    }
};
</script>

<style >
.character {
    width: 1200px;
    text-align: center;
    margin: auto;
}

.character .left {
    margin-right: 80px;
    display: inline-block;
    width: 790px;
    vertical-align: top;
}

.character .right {
    display: inline-block;
    width: 330px;
    vertical-align: top;
}

.character .btn-one {
    width: 100%;
    height: 106px;

    /* display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -webkit--moz-box-pack: center; */
    position: relative;
}

.character button {
    position: absolute;
    left: 315px;
    top: 25px;
    width: 160px;
    height: 37px;
    border: #f25a36 solid 1px;
    /* margin: 19px 0 50px; */
    color: #f25a36;
    background-color: transparent;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
}

.character button:hover {
    background-color: #f25a36;
    color: #fff;
}

.character .deadLine {
    left: 192px;
    width: 395px;
    margin: 0 auto;
    background-color: #f2f2f2;
    height: 1px;
    position: absolute;
    top: 38px;
}

.character .deadLineText {
    left: 315px;
    width: 160px;
    height: 37px;
    text-align: center;
    line-height: 37px;
    position: absolute;
    top: 20px;
    /* margin: 0 auto; */
    color: #a6a6a6;
    background-color: #fff;
}

.character nav {
    width: 100%;
    height: 55px;
    font-size: 14px;
    color: #404040;
    display: inline-block;
    line-height: 55px;
    border-top: 2px solid #f25a36;
    cursor: pointer;
    text-align: left;
}

.character nav a {
    font-size: 18px;
    padding: 15px;
    color: #404040;
    text-decoration: unset;
}

.character nav a.active {
    color: #f25a36;
    border-bottom: #f25a36 solid 2px;
}

.character {
    margin: 0px auto;
}

.character .footerlist {
    text-align: left;
    width: 100%;
    margin: 0px auto;
    
}

.character .info-list .loop {
    width: 100%;

    /* display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex; */
    height: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-top: 1px solid #ccc;
    border-top: 1px solid #f2f2f2;
}

.character .info-list .loop:hover {
    background-color: #f8f8f8;
}

.character .info-list .loop:hover .info-list-describe-title {
    color: #f25a36;
}

.character .info-img {
    width: 260px;
    position: relative;
    display: inline-block;
    height: 100%;
}

.character .info-list-img {
    border-radius: 8px;
}

.character .info-img .info-img-one {
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

.character .info-img .info-list-img {
    width: 260px;
    height: 150px;
}

.character .info-describe {
    display: inline-block;
    margin-left: 20px;
    position: relative;
    right: 0;
    text-decoration: unset;
    width: 504px;
    vertical-align: top;

}

.character .info-list .loop:hover {
    background-color: #f8f8f8;
}

.character .info-list .loop:hover .info-list-describe-title {
    color: #f25a36;
}

.character .info-list-describe-title {
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

.character .info-describe-content {
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

.character .info-list-footer {
    position: absolute;
    width: 100%;
    bottom: 10px;
    bottom: -40px;

    /* display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex; */
}

.character .info-list-footer > span {
    font-size: 13px;
    color: #a6a6a6;
    display: inline-block;
    margin-right: 42px;
}

.character .info-list-footer i {
    display: inline-block;
    margin-right: 12px;
    font-size: 13px;
    color: #a6a6a6;
}

.character .info-list-footer i.comment {
    width: 16px;
    height: 14px;
    background: url("~/static/images/comment.png") no-repeat;
}
</style>
