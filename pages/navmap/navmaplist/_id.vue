<template>
    <div>
        <div class="main">
            <div class="nav-top">
                <nuxt-link to="/navmap" class="one">导航地图</nuxt-link>
                <span v-show="categoryId==32" class="two">&nbsp;>&nbsp;优质项目</span>
                <span v-show="categoryId==33" class="two">&nbsp;>&nbsp;全部项目</span>
                <span v-for="(item,i) in arr1" :key="i" v-show="categoryId==item.categoryId" class="two">&nbsp;>&nbsp;{{item.categoryName}}</span>
            </div>
            <ul class="map">
                <li v-show="categoryId<=9" v-for="(item,i) in contentlist" :key="i">
                    <nuxt-link :to="{path:`/info/informationmore/`,query:{id:item.articleId,active:item.categoryId}}" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.articleName}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId==2" v-for="(item,i) in nowmessage" :key="item.index">
                    <nuxt-link :to='{path:`/info/infomessage`,query:{index:i,id:item.id}}' class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.content}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId>9&&categoryId<14" v-for="(item,i) in contentlist" :key="item.index">
                    <nuxt-link :to="`/video/videoDetail/${item.videoId}`" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.videoName}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId>14&&categoryId<23&&categoryId!=20" v-for="(item,i) in contentlist" :key="item.index">
                    <a :href="item.blockchainUrl" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.blockchainName}}
                        </span>
                    </a>
                </li>
                <li v-show="categoryId==20" v-for="(item,i) in contentlist" :key="item.index">
                    <nuxt-link :to="`/navigation/navPersonDetail/${item.personageId}`" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.personageName}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId==23" v-for="(item,j) in nowmessagesweet" :key="item.index">
                    <nuxt-link :to="`/navigation/navCandyDetail/${item.id}`" class="maplist">
                        <span class="mapnum">{{j+1}}</span>
                        <span class="mapcontent">{{item.title}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId==24" v-for="(item,i) in actity" :key="item.index">
                    <nuxt-link :to="`/navigation/navActivityDetail/`+item.eventId" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.eventName}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId==27" v-for="(item,i) in updown.fall" :key="item.index">
                    <nuxt-link :to="`/quotation/quotationDetail/name=${item.name}&code=${item.code.split(' ')[0]}&id=quotation`" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.name}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId==28" v-for="(item,i) in updown.rise" :key="item.index">
                    <nuxt-link :to="`/quotation/quotationDetail/name=${item.name}&code=${item.code.split(' ')[0]}&id=quotation`" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.name}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId==29" v-for="(item,i) in updown.make" :key="item.index">
                    <nuxt-link :to="`/quotation/quotationDetail/name=${item.name}&code=${item.code.split(' ')[0]}&id=quotation`" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.name}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId==30" v-for="(item,i) in charter" :key="item.index">
                    <nuxt-link :to="{path:'/character/characterinfo',query: {id: item.articleId,categoryId:item.categoryId,active:item.categoryId}}" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.articleName}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="categoryId==31" v-for="(item,i) in charter1" :key="item.index">
                    <nuxt-link :to="{path:'/character/characterinfo',query: {id: item.articleId,categoryId:item.categoryId,active:item.categoryId}}" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.articleName}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="topicId==6&&categoryId==32" v-for="(item,i) in coinlist" :key="item.index">
                    <nuxt-link :to="`/quotation/quotationDetail/name=${item.name}&code=${item.code.split(' ')[0]}&id=coin`" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.name}}
                        </span>
                    </nuxt-link>
                </li>
                <li v-show="topicId==6&&categoryId==33" v-for="(item,i) in coinlist1" :key="item.index">
                    <nuxt-link :to="`/quotation/quotationDetail/name=${item.name}&code=${item.code.split(' ')[0]}&id=coin`" class="maplist">
                        <span class="mapnum">{{i+1}}</span>
                        <span class="mapcontent">{{item.name}}
                        </span>
                    </nuxt-link>
                </li>
            </ul>
            <div v-show="categoryId!=28&&categoryId!=29&&categoryId!=27&&categoryId!=32" class="btn-one">
                <button @click="addSize" :style="isShow">查看更多</button>
                <hr :style="isFade" class="deadLine">
                <p :style="isFade" class="deadLineText">我是有底线的</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "~/plugins/axios.js";
export default {
    // props:{
    //     list:Array
    // },
    data() {
        return {
            topicId: 1,
            categoryId: 1,
            contentlist: [],
            nowmessage: [],
            nowmessagesweet: [],
            actity: [],
            resultMaps: [],
            arr: [],
            coinlist: [],
            coinlist1: [],
            updown: [],
            charter: [],
            charter1: [],
            datanum: [],
            arr1: [],
            pageIndex: 0,
            page: 0,
            isShow: "",
            isFade: {
                display: "none"
            }
        };
    },
    created() {
        this.categoryId = Number(this.$route.query.categoryId);
        this.topicId = Number(this.$route.query.topicId);
        this.getinfonum();
    },
    methods: {
        async getinfonum() {
            // console.log(this.categoryId);

            let datanum = await axios.get("/web/sitemap/more");
            this.datanum = datanum.data.resultMaps || [];
            let arr = [];
            for (const key in this.datanum) {
                for (let i = 0; i < this.datanum[key].length; i++) {
                    arr.push(this.datanum[key][i]);
                }
            }
            this.arr1 = arr.splice(7, arr.length);
            if (this.categoryId < 23 && this.categoryId != 2) {
                let { data } = await axios.get(
                    `/web/sitemap/more?categoryId=${this.categoryId}`
                );
                this.contentlist = data.data.content || [];
            } else if (this.categoryId == 23) {
                let nowmessagesweet = await axios.post(
                    "http://120.79.0.99/market/api/marketAll/candies"
                );
                this.nowmessagesweet = nowmessagesweet.data.candies || [];
            } else if (this.categoryId == 24) {
                let actity = await axios.get(`/web/navigation/blockbarmaps`, {
                    params: { pageIndex: 0, pageSize: 18 }
                });
                // console.log(actity);
                if (actity.data.resultMaps[24].totalElements < actity.data.resultMaps[24].size) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }

                this.actity = actity.data.resultMaps[24].content || [];
            } else if (this.categoryId == 2) {
                let nowmessage = await axios.post(
                    "http://120.79.0.99/market/api/marketAll/consult"
                );
                this.nowmessage = nowmessage.data.lives || [];
                // console.log(this.nowmessage);
            } else if (this.topicId == 6 && this.categoryId == 32) {
                let data3 = await axios.get("/web/tokendetail/banner");
                this.coinlist = data3.data || [];
            } else if (this.topicId == 6 && this.categoryId == 33) {
                let data4 = await axios.get("/web/tokendetail/more");
                this.coinlist1 = data4.data.content || [];
            } else if (
                this.categoryId == 28 ||
                this.categoryId == 29 ||
                this.categoryId == 27
            ) {
                let updown = await axios.get(
                    "http://120.79.0.99/market/api/marketAll/changePercent"
                );
                this.updown = updown.data || [];
            } else if (this.categoryId == 30 || this.categoryId == 31) {
                let charter = await axios.get("/web/topic/person/more");
                this.charter = charter.data.resultMaps[30].content || [];
                this.charter1 = charter.data.resultMaps[31].content || [];
            }
        },
        async addSize() {
            // console.log(this.categoryId);

            if (this.categoryId < 23 && this.categoryId != 2) {
                this.pageIndex += 1;
                let { data } = await axios.get(
                    `/web/sitemap/more?categoryId=${
                        this.categoryId
                    }&pageIndex=${this.pageIndex}`
                );
                if (data.data.totalPages < this.pageIndex) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
                // console.log(data);

                this.contentlist = this.contentlist.concat(data.data.content);
            } else if (this.categoryId == 23) {
                this.page += 1;
                let nowmessagesweet = await axios.post(
                    "http://120.79.0.99/market/api/marketAll/candies",
                    `page=${this.page}`
                );
                // console.log(nowmessagesweet);
                if (nowmessagesweet.data.counts < this.page) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
                this.nowmessagesweet = this.nowmessagesweet.concat(
                    nowmessagesweet.data.candies
                );
                // } else if (this.categoryId == 24) {
                //     let actity = await axios.get(`/web/navigation/blockbarmaps`, {
                //         params: { pageIndex: 0, pageSize: 18 }
                //     });
                //     this.actity = actity.data.resultMaps[24].content;
            } else if (this.categoryId == 2) {
                this.page += 1;

                let nowmessage2 = await axios.post(
                    "http://120.79.0.99/market/api/marketAll/consult",
                    `page=${this.page}`
                );
                // console.log(nowmessage2);

                if (nowmessage2.data.counts < this.page) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
                let arr = nowmessage2.data.lives;
                this.nowmessage = this.nowmessage.concat(arr);
            } else if (this.topicId == 6 && this.categoryId == 32) {
                let data3 = await axios.get("/web/tokendetail/banner");
                this.coinlist = data3.data;
            } else if (this.topicId == 6 && this.categoryId == 33) {
                this.pageIndex += 1;
                let data4 = await axios.get(
                    `/web/tokendetail/more?pageIndex=${this.pageIndex}`
                );
                // console.log(data4);
                if (data4.data.totalPages < this.pageIndex) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
                this.coinlist1 = this.coinlist1.concat(data4.data.content);
                // } else if (this.categoryId == 28 || this.categoryId == 29) {
                //     let updown = await axios.get(
                //         "http://120.79.0.99/market/api/marketAll/changePercent"
                //     );
                //     this.updown = updown.data;
            } else if (this.categoryId == 30 || this.categoryId == 31) {
                this.pageIndex += 1;
                let charter = await axios.get("/web/topic/person/more");
                this.charter = charter.data.resultMaps[30].content || [];
                if (charter.data.resultMaps[30].totalPages <= this.pageIndex) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
                this.charter1 = charter.data.resultMaps[31].content || [];
                if (charter.data.resultMaps[31].totalPages <= this.pageIndex) {
                    this.isShow = "display:none";
                    this.isFade = "display:block";
                }
            }
        }
    }
};
</script>
<style scoped>
.main {
    width: 1200px;
    margin: 0 auto;
}

li {
    width: 100%;
    list-style: none;
    padding-left: 10px;
}

.one {
    color: #d9d9d9;
}

.nav-top {
    line-height: 44px;
    font-size: 14px;
    color: #d9d9d9;
    border-bottom: 2px solid #f25a36;
}

.map {
    padding: 0;
}

.map li:hover {
    background-color: #d9d9d9;
}

.map .maplist {
    width: 100%;
}

/* .mapcontent */
.mapcontent {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    height: 50px;
    line-height: 50px;
    display: inline-block;
    vertical-align: top;
}

.map .maplist {
    /* display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex; */
    height: 50px;
    line-height: 50px;
}

.map .maplist > span {
    border-top: 1px solid #f2f2f2;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    height: 50px;
    line-height: 50px;
    display: inline-block;
    vertical-align: top;
}

.map .maplist > span.mapnum {
    width: 50px;
    display: inline-block;
}

.map .maplist > span.mapcontent {
    width: 1150px;
    display: inline-block;
    vertical-align: top;
}

.btn-one {
    /* width: 100%; */

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
    /* position: relative; */
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

.btn-one {
    width: 100%;
    height: 106px;

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

/* button {
    width: 160px;
    height: 37px;
    border: #f25a36 solid 1px;
    margin: 19px 0 50px;
    color: #f25a36;
    background-color: transparent;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
} */
button:hover {
    background-color: #f25a36;
    color: #fff;
}

.deadLine {
    width: 390px;
    margin: 0 auto;
    background-color: #f2f2f2;
    height: 1px;
    position: absolute;
    top: 38px;
    left: 405px;
}

.deadLineText {
    width: 160px;
    height: 37px;
    text-align: center;
    line-height: 37px;
    position: absolute;
    top: 20px;
    left: 520px;
    /* margin: 0 auto; */
    color: #a6a6a6;
    background-color: #fff;
}
</style>
