<template>
    <div class="coin">

        <!-- 币种主键 -->
        <coinall :impcoin='impcoin' :coinlist='coinlist'></coinall>

        <toTop></toTop>
    </div>
</template>

<script>
import axios from "~/plugins/axios.js";
import coinall from "~/components/coin/coinall.vue";
import toTop from "~/components/video/toTop.vue";
export default {
    components: {
        coinall,
        toTop
    },
    data() {
        return {
            pageIndex: 1,
        };
    },
    //title内容动态改变
      head() {
        return {
            title: "币种大全_链2345区块链资讯导航"
        };
    },
    //服务端渲染
    async asyncData() {
        let [impcoin, coinlist] = await Promise.all([
            axios.get("/web/tokendetail/banner"),
            axios.get("/web/tokendetail/more", {
                params: { pageIndex: 1 }
            })
        ]);
        // console.log(impcoin.data);

        return {
            impcoin: !impcoin.serviceError && impcoin.data || [],
            coinlist: !coinlist.serviceError && coinlist.data.content || []
        };
    },
    methods: {
       
    }
};
</script>

<style scoped>
.coin {
  width: 1200px;
  margin: 0 auto; }

.footer {
  width: 100%; }

.more {
  margin: 80px auto;
  width: 200px;
  height: 46px;
  text-align: center;
  line-height: 46px;
  border: 1px solid #f25a36;
  border-radius: 23px;
  color: #f25a36;
  cursor: pointer; }

.more:hover {
  background-color: #f25a36;
  color: #fff; }


</style>
