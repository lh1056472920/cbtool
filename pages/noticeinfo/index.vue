<template>
    <div>
        <div class="main">
            <div class="nav-top">
                <nuxt-link to="/" class="one">首页</nuxt-link>
                <span class="two">&nbsp;>&nbsp;各交易所公告</span>
            </div>
            <div class="side">公告</div>
            <ul class="map">
                <nuxt-link :to="`/noticeinfo/noticeinfolist/`+item.uuid" v-for="(item,i) in annoucement" :key="i" class="maplist">
                    <span class="mapnum">{{item.name}}</span>
                    <span class="mapcontent">{{item.announcement}}
                    </span>
                    <span class="maptime">{{item.time}}</span>
                </nuxt-link>
            </ul>
            <div class="btn-one">
                <button @click="addSize">查看更多</button>
            </div>
            <toTop></toTop>
        </div>
    </div>
</template>
<script>
import axios from "~/plugins/axios.js";
import toTop from "~/components/video/toTop.vue";
export default {
    components: {
        toTop
    },
    data() {
        return {
            annoucement: [],
            page: 1,
            size: 10
        };
    },
    created() {
        this.getshu();
    },
    methods: {
        async getshu() {
            let { data } = await axios.post(
                "http://120.79.0.99/market/api/marketAll/annoucement",
                "page=1&size=10"
            );
            this.annoucement = data.content || [];
        },
        async addSize() {
            this.page += 1;
            let { data } = await axios.post(
                "http://120.79.0.99/market/api/marketAll/annoucement",
                `page=${this.page}&size=10`
            );
            this.annoucement = this.annoucement.concat(data.content);
            // console.log(this.annoucement);
        }
    }
};
</script>
<style scoped>
.main {
    width: 1200px;
    margin: 0 auto;
}

.side {
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 90px;
    color: #404040;
    font-size: 30px;
    /* border-top: 1px solid #f25a36; */
}

a.one {
    color: #d9d9d9;
}

a.one:hover {
    color: #f25a36;
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

.map .maplist {
    /* display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex; */
    border-top: 1px solid #f2f2f2;
    display: block;
    height: 80px;
    line-height: 80px;
}

.map .maplist:hover {
    background-color: #f2f2f2;
}

.map .maplist:hover .mapnum,
.map .maplist:hover .mapcontent {
    color: #f25a36;
}

.map .maplist > span {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    height: 80px;
    line-height: 80px;
    display: inline-block;
    vertical-align: top;
}

.map .maplist > span.mapnum {
    width: 150px;
}

.map .maplist > span.mapcontent {
    width: 850px;
}

.map .maplist > span.maptime {
    width: 200px;
    color: #a6a6a6;
}

.btn-one {
    width: 100%;

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
</style>
