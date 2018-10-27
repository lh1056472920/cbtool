<template>
    <div class="candy">
        <h2>糖果大派送</h2>
        <hr class="dotted">
        <ul>
            <li v-for="(item) in candyList" :key="item.index">

                <nuxt-link :to="'/navigation/navCandyDetail/'+item.id" :title="item.title">
                    <span class="point"></span>{{item.title}}</nuxt-link>
                <p :title="item.introduce">{{item.introduce}}</p>
            </li>
        </ul>
        <nuxt-link :to="{path:`/navigation/navCandy/`,query:{id:23}}" @click.native="computedCnzz" v-show="candyList.length>0" class="btn-more">更多糖果</nuxt-link>
        <no-msg :list="candyList"></no-msg>
    </div>
</template>

<script>
import axios from "~/plugins/axios.js";
import noMsg from "~/components/noMsg/noMsg.vue";
let candytimer;
export default {
    name: "candy",
    props: {
        list: Array
    },
    components: {
        noMsg
    },
    data() {
        return {
            candyList: this.list
        };
    },
    mounted() {
        if (candytimer) {
            clearInterval(candytimer);
        }
        candytimer = setInterval(() => {
            this.reloadCandy();
        }, 10000);
    },
    methods: {
        async reloadCandy() {
            let { data } = await axios.post("http://120.79.0.99/market/api/marketAll/candies");
            if (!data || data.code === -1) {
                return;
            }
            this.candyList = data.candies || [];
        },
        computedCnzz() {
            _czc.push(["_trackEvent", "首页糖果大派送", "点击更多糖果"]);
        }
    },
    beforeDestroy() {
        clearInterval(candytimer);
    }
};
</script>

<style scoped>
.candy {
    border-top: 2px solid #f25a36;
}

.candy li {
    height: 45px;
}

ul,
li {
    margin: 0;
    padding: 0;
    list-style: none;
}

li {
    text-align: left;
    margin-top: 20px;
}

h2 {
    font-size: 16px;
    padding: 22px 0;
}

a {
    font-size: 14px;
    display: inline-block;
    width: 270px;
    color: #404040;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    padding-left: 15px;
}

a:hover {
    color: #f25a36;
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

p {
    width: 306px;
    height: 14px;
    line-height: 14px;
    font-size: 12px;
    margin-top: 12px;
    color: #a6a6a6;
    text-indent: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
