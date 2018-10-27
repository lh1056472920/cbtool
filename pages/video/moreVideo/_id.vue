<template>
    <div>
        <div class="main">
            <div class="title">
                <nuxt-link to="/video">视频</nuxt-link>
                <span>>更多视频</span>
            </div>
            <div class="subnav">
                <a href="" v-for="item in subCategoryList" :key="item.categoryId" :class="{active: active===item.categoryId}" @click.stop.prevent="clickItem(item.categoryId)">{{item.categoryName}}</a>
            </div>
            <div class="content" v-for="item in subCategoryList" :key="item.categoryId" v-show="active===item.categoryId">
                <div class="videoBox" v-for="subitem in videoList[item.categoryId].content" :key="subitem.videoId">
                    <nuxt-link :to="'/video/videoDetail/'+subitem.videoId">
                        <div>
                            <quickView :video-id="subitem.videoId" :video-img="subitem.videoImage" :video-duration="subitem.column13"></quickView>
                        </div>
                        <p>{{subitem.videoName}}</p>
                    </nuxt-link>
                </div>
            </div>
            <!-- <div class="more" @click="sizeChange">
                查看更多
            </div> -->
            <div class="btn-one">
                <button class="more" @click="sizeChange" :style="isShow">查看更多</button>
                <hr :style="isFade" class="deadLine">
                <p :style="isFade" class="deadLineText">我是有底线的</p>
            </div>
        </div>
        <toTop></toTop>
    </div>
</template>

<script>
import quickView from "~/components/video/quickView.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
export default {
    components: {
        quickView,
        toTop
    },
    data() {
        return {
            active: 13,
            pageSize: 40,
            isShow: "",
            isFade: {
                display: "none"
            }
        };
    },
    async asyncData() {
        let { data } = await axios.get(`/web/video/more`, {
            params: { pageIndex: 0, pageSize: 40 }
        });
        return {
            videoList: (data && data.code != -1 && data.resultMaps) || [],
            subCategoryList:
                (data && data.code != -1 && data.subCategoryList) || []
        };
    },
    created() {
        this.getCategoryId();
    },
    methods: {
        async getCategoryId() {
            this.active = Number(this.$route.params.id);
            // console.log(this.active);
        },
        async clickItem(active) {
            this.active = active;
            this.pageSize = 40;
            this.isShow = "";
            this.isFade = { display: "none" };
            let { data } = await axios.get("/web/video/more", {
                params: { pageIndex: 0, pageSize: this.pageSize }
            });
            if (data.resultMaps[this.active].totalElements < 40) {
                this.isShow = "display:none";
                this.isFade = "display:block";
            }
            (this.videoList = data.resultMaps),
                (this.subCategoryList = data.subCategoryList);
        },
        async sizeChange() {
            this.pageSize += 40;
            let { data } = await axios.get("/web/video/more", {
                params: { pageIndex: 0, pageSize: this.pageSize }
            });
            if (data.resultMaps[this.active].totalElements < this.pageSize) {
                this.isShow = "display:none";
                this.isFade = "display:block";
            }
            (this.videoList = data.resultMaps),
                (this.subCategoryList = data.subCategoryList);
        }
    }
};
</script>

<style scoped>
.title {
    width: 1200px;
    height: 42px;
    margin: 0 auto;
    line-height: 42px;
    color: #d9d9d9;
    font-size: 14px;
}

.title a {
    color: #d9d9d9;
}

.title a:hover {
    color: #f25a36;
}

.subnav {
    width: 1200px;
    height: 55px;
    margin: 0 auto 15px;
    border-top: 2px solid #f25a36;
    border-bottom: 1px solid #f2f2f2;

    display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
}

.subnav a {
    color: #404040;
    font-size: 18px;
    font-family: "PingFangSC-Light";
    height: 55px;
    line-height: 55px;
    margin-right: 31px;
    text-decoration: none;
}

.subnav a:hover {
    color: #f25a36;
}

.subnav a.active {
    color: #f25a36;
    border-bottom: 2px solid #f25a36;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.content {
    width: 1200px;
    margin: 0 auto;

}

.content .videoBox {
    display: inline-block;
    width: 228px;
    margin-right: 15px;
}

.content .videoBox:hover p {
    color: #f25a36;
}

.content .videoBox:nth-child(5n) {
    margin-right: 0;
}

.content .videoBox div {
    width: 228px;
    height: 143px;
}

.content .videoBox p {
    width: 228px;
    font-size: 14px;
    margin: 12px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.more {
    margin: 80px auto;
    width: 200px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    border: 1px solid #f25a36;
    border-radius: 23px;
    color: #f25a36;
    cursor: pointer;
}

.more:hover {
    background-color: #f25a36;
    color: #fff;
}

.btn-one {
    width: 1200px;
    height: 206px;
    margin: 0 auto;

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

button {
    width: 160px;
    height: 40px;
    border: #f25a36 solid 1px;
    position: absolute;
    top: 25px;
    left: 520px;
    /* margin: 19px 0 50px; */
    /* margin: 0 auto; */
    color: #f25a36;
    background-color: transparent;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
}

.deadLine {
    width: 600px;
    left: 300px;
    /* margin: 0 auto; */
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
    left: 500px;
    /* margin: 0 auto; */
    color: #a6a6a6;
    background-color: #fff;
}
</style>
