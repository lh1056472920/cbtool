<template>
    <div class="quotation">
        <div class="quotation-header">
            <div class="background"></div>
            <h2>今日行情</h2>
            <ul class="quotation-list">
                <li>
                    <quotation-list type="increase" :list="increase"></quotation-list>
                </li>
                <li>
                    <quotation-list type="declines" :list="declines"></quotation-list>
                </li>
                <li>
                    <quotation-list type="deal" :list="deal"></quotation-list>
                </li>
            </ul>
        </div>
        <div class="content">
            <hr class="separate">
            <div class="caption">
                <span class="title">币种行情列表</span>
                <ul class="coin">
                    <li>定价：</li>
                    <li>
                        <input type="radio" name="coin" v-model="coin" id="CNY" value="CNY">
                        <span :class="radioClass('CNY')" @click="changeCoin('CNY')"></span>
                        <label for="CNY">人民币(CNY)</label>
                    </li>
                    <li>
                        <input type="radio" name="coin" v-model="coin" id="USD" value="USD">
                        <span :class="radioClass('USD')" @click="changeCoin('USD')"></span>
                        <label for="USD">美元(USD)</label>
                    </li>
                    <li>
                        <input type="radio" name="coin" v-model="coin" id="BTC" value="BTC">
                        <span :class="radioClass('BTC')" @click="changeCoin('BTC')"></span>
                        <label for="BTC">比特币(BTC)</label>
                    </li>
                    <li>
                        <input type="radio" name="coin" v-model="coin" id="ETH" value="ETH">
                        <span :class="radioClass('ETH')" @click="changeCoin('ETH')"></span>
                        <label for="ETH">以太坊(ETH)</label>
                    </li>
                </ul>
                <div class="search">
                    <input type="text" name="search" autocomplete="off" placeholder="请输入币种名称" v-model="searchText" @keyup.13="clickItem('search')">
                    <span :style="isFalse" class="el-icon-search icon-search" @click.stop.prevent="clickItem(0)" @mousedown='mousedown()' @mouseup='mouseup()' @mouseout='mouseout()'></span>
                </div>
            </div>
            <hr class="dotted">
            <table>
                <thead>
                    <tr>
                        <th>
                            <div @click="clicksort(order0)" :class="{active1:active1==='one0'||active1==='two0'}">
                                市值排序
                                <i :class="(order0)=='one0'?'one0':''"></i>
                                <i :class="(order0)=='two0'?'two0':''"></i>
                            </div>
                        </th>
                        <th>币种</th>
                        <th>
                            <div @click="clicksort(order)" :class="{active1:active1==='one'||active1==='two'}">
                                价格
                                <i :class="(order)=='one'?'one':''"></i>
                                <i :class="(order)=='two'?'two':''"></i>
                            </div>
                        </th>
                        <th>
                            <div @click="clicksort(order1)" :class="{active1:active1==='one1'||active1==='two1'}">
                                24H涨跌幅
                                <i :class="(order1)=='one1'?'one1':''"></i>
                                <i :class="(order1)=='two1'?'two1':''"></i>
                            </div>
                        </th>
                        <th>
                            <div @click="clicksort(order2)" :class="{active1:active1==='one2'||active1==='two2'}">
                                成交额
                                <i :class="(order2)=='one2'?'one2':''"></i>
                                <i :class="(order2)=='two2'?'two2':''"></i>
                            </div>
                        </th>
                        <th>
                            <div @click="clicksort(order3)" :class="{active1:active1==='one3'||active1==='two3'}">
                                流通数量
                                <i :class="(order3)=='one3'?'one3':''"></i>
                                <i :class="(order3)=='two3'?'two3':''"></i>
                            </div>
                        </th>
                        <th>
                            <div @click="clicksort(order4)" :class="{active1:active1==='descend'||active1==='ascend'}">
                                流通市值
                                <i :class="(order4)=='descend'?'descend':''"></i>
                                <i :class="(order4)=='ascend'?'ascend':''"></i>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="currentList&&currentList1.length==0" @click="toCoinDetail(item.name,item.code)" v-for="(item, i) in currentList" :key="i">
                        <td>{{item.rank}}</td>
                        <td class="currency">
                            {{item.name}}/{{item.name_}}
                        </td>
                        <td v-show="item.change_percent>=0" style="color:#1fbf88;">{{price(item)}}</td>
                        <td v-show="item.change_percent<0" style="color:red;">{{price(item)}}</td>
                        <td v-show="item.change_percent>=0" style="color:#1fbf88;">+{{item.change_percent}}%</td>
                        <td v-show="item.change_percent<0" style="color:red;">{{item.change_percent}}%</td>
                        <td>￥{{price2(item)}}</td>
                        <td>{{item.supply.toLocaleString()}}</td>
                        <td>￥{{price1(item)}}</td>
                    </tr>
                    <tr v-if="currentList1.length!=0&&!currentList1.code" @click="toCoinDetail(item.name,item.code)" v-for="item in currentList1" :key="item.index">
                        <td>{{item.rank}}</td>
                        <td class="currency">
                            {{item.name}}/{{item.name_}}
                        </td>
                        <td v-show="item.change_percent>=0" style="color:#1fbf88;">{{price(item)}}</td>
                        <td v-show="item.change_percent<0" style="color:red;">{{price(item)}}</td>
                        <td v-show="item.change_percent>=0" style="color:#1fbf88;">+{{item.change_percent}}%</td>
                        <td v-show="item.change_percent<0" style="color:red;">{{item.change_percent}}%</td>
                        <td>￥{{price2(item)}}</td>
                        <td>{{item.supply.toLocaleString()}}</td>
                        <td>￥{{price1(item)}}</td>
                    </tr>

                </tbody>
            </table>
            <div v-if="currentList1.code" class="chuli">暂无数据</div>
            <noMsg :list="currentList"></noMsg>
            <Pagination v-show="(currentList1.length==0||dataone.length==0)&&currentList.length!=0" class="pagination" background layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="currentChange">
            </Pagination>
        </div>
        <toTop></toTop>
    </div>
</template>

<script>
import axios from "~/plugins/axios.js";
import quotationList from "~/components/quotation/quotationList.vue";
import toTop from "~/components/video/toTop.vue";
import noMsg from "~/components/noMsg/noMsg.vue";
import { Pagination } from "element-ui";
import Vue from "vue";
let quotationListTime;
export default {
    components: {
        quotationList,
        toTop,
        Pagination,
        noMsg
    },
    data() {
        return {
            isFalse: {},
            searchText: "",
            pageSize: 100,
            total: 1230,
            current: 1,
            coin: "CNY",
            order: "one",
            order0: "one0",
            order1: "one1",
            order2: "one2",
            order3: "one3",
            order4: "ascend",
            active: "",
            active1: "one0",
            currentList1: [],
            dataone: [1, 2]
        };
    },
    head() {
        return {
            title: "数字货币最新行情数据_链2345区块链资讯导航"
        };
    },
    async asyncData() {
        try {
            var [marketAllBTC, marketAllETH, changePercent] = await Promise.all(
                [
                    axios.post(`http://120.79.0.99/market/api/marketAll`, "type=bitcoin&page=1"),
                    axios.post(`http://120.79.0.99/market/api/marketAll`, "type=ethereum&page=1"),
                    axios.get(`http://120.79.0.99/market/api/marketAll/changePercent`)
                ]
            );
        } catch (e) {
            console.log(e);
        }
        return {
            listBTC: (!marketAllBTC.serviceError && marketAllBTC.data) || [],
            currentList:
                (!marketAllBTC.serviceError && marketAllBTC.data) || [],
            listETH: (!marketAllETH.serviceError && marketAllETH.data) || [],
            increase:
                (!marketAllBTC.serviceError && changePercent.data.rise) || [],
            declines:
                (!marketAllBTC.serviceError && changePercent.data.fall) || [],
            deal: (!marketAllBTC.serviceError && changePercent.data.make) || []
        };
    },
    mounted() {
        // this.currentList = this.listBTC.slice(0, this.pageSize);
        if (quotationListTime) {
            clearInterval(quotationListTime);
        }
        quotationListTime = setInterval(() => {
            this.reloadQuotationList();
        }, 10000);
    },
    watch: {},
    methods: {
        price(item) {
            switch (this.coin) {
                case "CNY":
                    if (item.current_price > 999) {
                        return `￥${item.current_price.toLocaleString()}`;
                    } else {
                        return `￥${item.current_price}`;
                    }
                case "USD":
                    if (item.current_price_usd > 999) {
                        return `$${item.current_price_usd.toLocaleString()}`;
                    } else {
                        return `$${item.current_price_usd}`;
                    }
                // return `$${item.current_price_usd}`;
                case "BTC":
                    return `${(
                        item.current_price / item.current_price_cny
                    ).toFixed(5)}BTC`;
                case "ETH":
                    return `${(
                        item.current_price / item.current_price_cny
                    ).toFixed(5)}ETH`;
            }
        },
        price1(item) {
            if (item.market_value > 99999999) {
                return `${Number(
                    (item.market_value / 100000000).toFixed(2)
                ).toLocaleString()}亿`;
            } else {
                return `${Number(
                    (item.market_value / 10000).toFixed(2)
                ).toLocaleString()}万`;
            }
        },
        price2(item) {
            if (item.vol > 999999) {
                return `${Number(
                    (item.vol / 10000).toFixed(0)
                ).toLocaleString()}万`;
            } else if (item.vol > 9999) {
                return `${Number(
                    (item.vol / 10000).toFixed(2)
                ).toLocaleString()}万`;
            } else {
                return `${Number(item.vol.toFixed(2)).toLocaleString()}`;
            }
        },
        radioClass(coin) {
            if (coin === this.coin) {
                return "el-icon-circle-check";
            }
            return "icon-circle-check";
        },
        changeCoin(coin) {
            this.coin = coin;
            // console.log(this.listETH.length);
            /*let start = this.pageSize * (this.current - 1);
            let end = this.pageSize * this.current;
            if (end > this.total) {
                end = this.total;
            }*/
            if (coin === "ETH") {
                this.currentList = this.listETH;
            } else {
                this.currentList = this.listBTC;
            }
            _czc.push(["_trackEvent", "行情页币种行情列表", "切换币种", coin]);
        },
        async currentChange(current) {
            window.scrollTo(0, 450);
            // let { data } = axios.post(`http://120.79.0.99/market/api/marketAll`);
            let url = "http://120.79.0.99/market/api/marketAll",
                params;
            this.current = current;
            /*let start = this.pageSize * (current - 1);
            let end = this.pageSize * current;
            if (end > this.total) {
                end = this.total;
            }*/
            //if (this.listBTC.length < end) {
            // if (this.searchText) {
            //     url = "http://120.79.0.99/market/api/marketAll/searchType";
            //     params = `type=${this.searchText}&page=${this.current}`;
            // }
            let [marketAllBTC, marketAllETH] = await Promise.all([
                axios.post(
                    `http://120.79.0.99/market/api/marketAll`,`type=bitcoin&page=${this.current}`
                ),
                axios.post(
                   `http://120.79.0.99/market/api/marketAll`, `type=ethereum&page=${current}`
                )
            ]);
            // console.log(marketAllBTC);
            // console.log(marketAllETH);

            this.listBTC = !marketAllBTC.serviceError && marketAllBTC.data;
            this.listETH = !marketAllETH.serviceError && marketAllETH.data;
            //}
            /*if (this.coin === "ETH") {
                this.currentList = this.listETH.slice(start, end);
            } else {
                this.currentList = this.listBTC.slice(start, end);
            }*/
            if (this.coin === "ETH") {
                this.currentList = this.listETH;
            } else {
                this.currentList = this.listBTC;
            }
        },
        clicksort(sort) {
            // console.log(sort);
            this.active1 = sort;
            // console.log(this.active1);

            const arr = this.currentList;
            let shu;
            if (sort == "one0") {
                shu = "rank";
                this.sort1(arr, shu);
                this.currentList = arr.concat();
                this.order0 = "two0";
            } else if (sort == "two0") {
                shu = "rank";
                this.sort2(arr, shu);
                this.currentList = arr.concat();
                this.order0 = "one0";
            } else if (sort == "one") {
                shu = "current_price";
                this.sort1(arr, shu);
                this.currentList = arr.concat();
                this.order = "two";
            } else if (sort == "two") {
                shu = "current_price";
                this.sort2(arr, shu);
                this.currentList = arr.concat();
                this.order = "one";
            } else if (sort == "one1") {
                shu = "change_percent";
                this.sort1(arr, shu);
                this.currentList = arr.concat();
                this.order1 = "two1";
            } else if (sort == "two1") {
                shu = "change_percent";
                this.sort2(arr, shu);
                this.currentList = arr.concat();
                this.order1 = "one1";
            } else if (sort == "one2") {
                shu = "vol";
                this.sort1(arr, shu);
                this.currentList = arr.concat();
                this.order2 = "two2";
            } else if (sort == "two2") {
                shu = "vol";
                this.sort2(arr, shu);
                this.currentList = arr.concat();
                this.order2 = "one2";
            } else if (sort == "one3") {
                shu = "supply";
                this.sort1(arr, shu);
                this.currentList = arr.concat();
                this.order3 = "two3";
            } else if (sort == "two3") {
                shu = "supply";
                this.sort2(arr, shu);
                this.currentList = arr.concat();
                this.order3 = "one3";
            } else if (sort == "descend") {
                shu = "market_value";
                this.sort1(arr, shu);
                this.currentList = arr.concat();
                this.order4 = "ascend";
            } else if (sort == "ascend") {
                shu = "market_value";
                this.sort2(arr, shu);
                this.currentList = arr.concat();
                this.order4 = "descend";
            }
            clearInterval(quotationListTime);
        },
        async clickItem() {
           console.log(this.searchText);
           
            if (this.searchText.trim() == "") {
                return
            }
            // console.log(1111);
            let { data } = await axios.post(
                "http://120.79.0.99/market/api/marketAll/searchType",
                `type=${this.searchText}`
            );
            this.dataone = data;
            this.currentList1 = data;
            console.log(this.currentList1);

            // console.log(this.currentList1);
            _czc.push(["_trackEvent", "行情页币种行情列表", "搜索"]);
        },
        async mousedown() {
            this.isFalse = { "box-shadow": "0px 0px 3px 2px #ccc" };
        },
        async mouseup() {
            this.isFalse = {};
        },
        async mouseout() {
            this.isFalse = {};
        },

        toCoinDetail(name, code) {
            this.$router.push({
                path: `quotation/quotationDetail/name=${name}&code=${code}&id=quotation`
            });
        },
        sort2(arr, shu) {
            for (var j = 0; j < arr.length - 1; j++) {
                //两两比较，如果前一个比后一个大，则交换位置。
                for (var i = 0; i < arr.length - 1 - j; i++) {
                    if (arr[i][shu] < arr[i + 1][shu]) {
                        var temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                    }
                }
            }
        },
        sort1(arr, shu) {
            for (var j = 0; j < arr.length - 1; j++) {
                //两两比较，如果前一个比后一个大，则交换位置。
                for (var i = 0; i < arr.length - 1 - j; i++) {
                    if (arr[i][shu] > arr[i + 1][shu]) {
                        var temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                    }
                }
            }
        },
        async reloadQuotationList() {
            // let url = "http://120.79.0.99/market/api/marketAll",
            //     params,
            //     type;
            // if (this.searchText) {
            //     url = "http://120.79.0.99/market/api/marketAll/searchType";
            //     params = `type=${this.searchText}&page=${this.current}`;
            // }
            let [marketAllBTC, marketAllETH, changePercent] = await Promise.all(
                [
                    axios.post(
                        `http://120.79.0.99/market/api/marketAll`,`type=bitcoin&page=${this.current}`
                    ),
                    axios.post(
                        `http://120.79.0.99/market/api/marketAll`,`type=ethereum&page=${this.current}`
                    ),
                    axios.get(`http://120.79.0.99/market/api/marketAll/changePercent`)
                ]
            );
            this.listBTC =
                (!marketAllBTC.serviceError && marketAllBTC.data) || [];
            this.listETH =
                (!marketAllETH.serviceError && marketAllETH.data) || [];
            if (this.coin === "ETH") {
                this.currentList = this.listETH;
            } else {
                this.currentList = this.listBTC;
            }
            this.increase =
                (!changePercent.serviceError && changePercent.data.rise) || [];
            this.declines =
                (!changePercent.serviceError && changePercent.data.fall) || [];
            this.deal =
                (!changePercent.serviceError && changePercent.data.make) || [];
        }
    },
    beforeDestroy() {
        clearInterval(quotationListTime);
    }
};
</script>

<style scoped>
.quotation-header {
    margin: 0 auto;
    width: 100%;
    position: relative;
    text-align: center;
    z-index: 2;
}
.quotation .chuli {
    height: 40px;
    width: 1200px;
    line-height: 40px;
    text-align: center;
    margin-top: 50px;
}

.quotation-header .background {
    position: absolute;
    top: 0;
    left: 0;
    /* text-align: center; */
    width: 100%;
    height: 214px;
    background-color: #1fbf88;
    z-index: -1;
}

.quotation-header h2 {
    padding-top: 39px;
    font-size: 36px;
    font-weight: normal;
    color: #fff;
    text-align: center;
}
label {
    vertical-align: top;
}

.quotation-list {
    display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 1200px;
    margin: 36px auto 20px;
}

.quotation-list li {
    display: block;
    width: 392px;
    height: 310px;
    border-radius: 8px;
    background-color: #fff;
    -webkit-box-shadow: 0 4px 4px 0px rgba(217, 217, 217, 0.3);
    box-shadow: 0 4px 4px 0px rgba(217, 217, 217, 0.3);
}
.background {
    width: 1200px;
    text-align: center;
}
.content {
    width: 1200px;
    margin: auto;
}

.caption {
    display: inline-block;
    width: 97%;

    height: 90px;
    line-height: 90px;
    padding: 0 15px;
}

.search > span {
    display: inline-block;
    margin-top: 5px;
    vertical-align: top;
}
.caption .title {
    font-size: 24px;
}

.coin {
    display: inline-block;
    margin-left: 30px;
    width: 595px;
}

.coin li {
    display: inline-block;
    vertical-align: top;
}
.coin li > span {
    display: inline-block;
    vertical-align: top;
    margin-top: 36px;
}
.coin li label {
    margin-left: 10px;
    margin-right: 20px;
    /* vertical-align: top; */
}

.search {
    display: inline-block;
    vertical-align: top;
    margin-top: 31px;
    margin-left: 50px;
    height: 28px;
    padding: 0 11px;
    border: #f25a36 solid 1px;
    border-radius: 14px;
}

.search input {
    margin-top: -60px;
    display: inline-block;
    font-size: 14px;
    height: 16px;
    border: 0;
    background-color: transparent;
    outline: none;
    font-weight: 100;
}

:-moz-placeholder {
    color: #d9d9d9;
    opacity: 1;
}

::-moz-placeholder {
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

table {
    width: 100%;
    margin: 20px 0;
}

thead {
    color: #fff;
}

thead tr {
    height: 42px;
    background-color: #1fbf88;
}

thead tr > th {
    position: relative;
    font-size: 14px;
    font-weight: normal;
    vertical-align: middle;
}

thead tr > th:first-child {
    border-radius: 25px 0 0 25px;
    /* width: 66px; */
}
.quotation thead tr > th:first-child > div {
    width: 128px;
}
.quotation thead tr > th:first-child {
    width: 91px;
}
.quotation thead tr > th:nth-child(2) {
    width: 150px;
}

thead tr > th:nth-child(3) a {
    display: block;
    width: 100%;
    height: 42px;
    line-height: 42px;
    color: #fff;
    background-color: #15ac78;
    border-radius: 25px;
    overflow: hidden;
}

thead tr > th:last-child {
    border-radius: 0 25px 25px 0;
}

thead tr > th > div {
    top: 0;
    position: absolute;
    height: 42px;
    line-height: 42px;
    width: 100%;
    cursor: pointer;
    border-radius: 25px;
}

thead tr > th > div.active1 {
    background-color: #15ac78;
}

thead tr > th > div > i {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
}

thead tr > th:nth-child(1) > div i {
    left: 112px;
}

thead tr > th:nth-child(3) > div i {
    left: 60%;
}

thead tr > th:nth-child(4) > div i {
    left: 133px;
}

thead tr > th:nth-child(5) > div i {
    left: 120px;
}

thead tr > th:nth-child(6) > div i {
    left: 127px;
}

thead tr > th:nth-child(7) > div i {
    left: 127px;
}

th > div > i:nth-child(1) {
    top: 22px;
    border-top: 6px solid #fff;
}

th > div > i:nth-child(2) {
    top: 15px;
    border-bottom: 6px solid #fff;
}

th > div > i.one0,
th > div > i.one,
th > div > i.one1,
th > div > i.one2,
th > div > i.one3,
th > div > i.descend {
    border-top: 6px solid rgba(255, 255, 255, 0.3);
}

th > div > i.two0,
th > div > i.two,
th > div > i.two1,
th > div > i.two2,
th > div > i.two3,
th > div > i.ascend {
    border-bottom: 6px solid rgba(255, 255, 255, 0.3);
}

td {
    width: 114px;
    font-size: 14px;
    height: 42px;
    color: #595959;
    vertical-align: middle;
    text-align: center;
}

td:first-child {
    width: 60px;
}

tbody tr:nth-child(even) {
    background-color: #f8f8f8;
}

tbody tr td:first-child {
    border-radius: 25px 0 0 25px;
}

tbody tr td:last-child {
    border-radius: 0 25px 25px 0;
}
.quotation tbody tr td {
    text-align: left;
    padding-left: 65px;
}
tbody tr:hover {
    background-color: #ccc;
    cursor: pointer;
}

.currency:hover a {
    color: #f25a36;
}

.pagination {
    margin: 50px auto;
    text-align: center;
}

.icon-search {
    font-size: 20px;
    color: #f25a36;
    cursor: pointer;
}

input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}

.el-icon-circle-check {
    font-size: 21px;
    color: #f25a36;
    width: 18px;
    height: 18px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.icon-circle-check {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: #d9d9d9 solid 1px;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.coin li > span.icon-circle-check:hover {
    border: #f25a36 solid 1px;
}
.el-icon-search:hover {
    box-shadow: 0px 0px 3px 1px #f2f2f2;
    box-sizing: border-box;
}
</style>
