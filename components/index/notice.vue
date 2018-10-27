<template>
    <div class="notice">
        <hr class="separate">
        <h2>各交易所公告</h2>
        <hr class="dotted">
        <ul>
            <li v-for="(item, i) in noticeList" :key="i">
                <nuxt-link :to="`/noticeinfo/noticeinfolist/`+item.uuid">
                    <span class="point"></span>{{item.announcement}}</nuxt-link>
                <p>
                    <span>{{item.name.split('[')[1].split(']')[0]}}</span>{{item.time}}</p>
            </li>
        </ul>
        <nuxt-link to="/noticeinfo" @click.native="computedCnzz" v-show="noticeList.length>0" class="btn-more">更多公告</nuxt-link>
        <no-msg :list="noticeList"></no-msg>
    </div>
</template>

<script>
import axios from "~/plugins/axios.js";
import noMsg from "~/components/noMsg/noMsg.vue";
let noticetimer;
export default {
    name: "notice",
    props: {
        list: Array
    },
    components: {
        noMsg
    },
    data() {
        return {
            noticeList: this.list
        };
    },
    mounted() {
        if (noticetimer) {
            clearInterval(noticetimer);
        }
        noticetimer = setInterval(() => {
            this.reloadNotice();
        }, 10000);
    },
    methods: {
        async reloadNotice() {
            let { data } = await axios.post(
                "http://120.79.0.99/market/api/marketAll/annoucement"
            );
            if (!data || data.code === -1) {
                return;
            }
            this.noticeList = data.content || [];
            
        },
        computedCnzz() {
            _czc.push(["_trackEvent", "首页各交易所公告", "点击更多公告"]);
        }
    },
    beforeDestroy() {
        clearInterval(noticetimer);
    }
};
</script>

<style scoped>
li {
    height: 45px;
    text-align: left;
    color: #f25a36;
    margin-top: 20px;
    list-style: none;
}

h2 {
    font-size: 16px;
    padding: 22px 0;
}

a {
    width: 306px;
    font-size: 14px;
    display: inline-block;
    color: #404040;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    padding-left: 15px;
}

.point {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #f25a36;
    position: absolute;
    top: 50%;
    left: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}

a:hover {
    color: #f25a36;
}

p {
    width: 306px;
    height: 14px;
    font-size: 12px;
    margin-top: 12px;
    color: #a6a6a6;
    text-indent: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

p > span {
    margin-right: 12px;
    font-size: 12px;
}

.btn-more {
    width: 120px;
    color: #f25a36;
    font-size: 12px;
    margin-top: 20px;
    padding: 0;
}

.btn-more:hover {
    background-color: #f25a36;
    color: #fff;
}
</style>
