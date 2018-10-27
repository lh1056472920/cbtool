<template>
    <div class="quotation">
        <ul class="quo-header">
            <li v-for="item in coins" :class="{active: active==item.code}" :key="item.index" @click="clickItem(item)">
                <a>{{item.name}}</a>
            </li>
            <li class="one">
                <nuxt-link to="/quotation" @click.native="computedCnzz">更多币种</nuxt-link>
            </li>
        </ul>
        <table>
            <thead>
                <tr class="thead">
                    <th>交易所</th>
                    <th>
                        <el-select v-model="currency" placeholder="请选择">
                            <el-option v-for="(item,i) in option1" :key="i" :label="item.label" :value="item.currency">
                            </el-option>
                        </el-select>
                    </th>
                    <th>涨跌幅</th>
                    <th>成交量</th>
                    <th>成交额</th>
                    <th>占比</th>
                </tr>
            </thead>
            <!-- </table>
        <table> -->
            <tbody class="tbody">
                <!-- <tr v-if="listname.length==0&&i!=0" v-for="(item, i) in list" :key="i">
                    <td>{{(item.market).toLocaleString()}}</td>
                    <td v-if="item.change_percent>=0" style="color:#1fbf88;">{{price(item)}}</td>
                    <td v-if="item.change_percent<0" style="color:red;">{{price(item)}}</td>
                    <td v-if="item.change_percent>=0" style="color:#1fbf88;">+{{Number(item.change_percent.toFixed(2)).toLocaleString()}}%</td>
                    <td v-if="item.change_percent<0" style="color:red;">{{Number(item.change_percent.toFixed(2)).toLocaleString()}}%</td>
                    <td>{{priceb(item)}}</td>
                    <td v-if="active=='bitcoin'||active=='ripple'||active=='eos'">{{pricec(item)}}</td>
                    <td v-if="active=='bitcoin-cash'||active=='ethereum'">{{pricec1(item)}}</td>
                    <td>{{(item.dutyfactor*100).toFixed(2)}}%</td>
                </tr> -->
                <tr v-if="i!=0" v-for="(item, i) in listname" :key="item.index">
                    <td>{{item.market.toLocaleString()}}</td>
                    <td style="color:#1fbf88;" v-if="item.change_percent>=0&&(active=='bitcoin'||active=='ripple'||active=='eos')&&item.current_price_cny!=0">{{price(item)}}</td>
                    <td style="color:red" v-if="item.change_percent<0&&(active=='bitcoin'||active=='ripple'||active=='eos')&&item.current_price_cny!=0">{{price(item)}}</td>
                    <td style="color:#1fbf88;" v-if="item.change_percent>=0&&(active=='bitcoin-cash'||active=='ethereum')&&item.current_price_cny!=0">{{price1(item)}}</td>
                    <td style="color:red" v-if="item.change_percent<0&&(active=='bitcoin-cash'||active=='ethereum')&&item.current_price_cny!=0">{{price1(item)}}</td>
                    
                    <td v-if="item.change_percent>=0&&item.current_price_cny!=0" style="color:#1fbf88;">+{{Number(item.change_percent.toFixed(2)).toLocaleString()}}%</td>
                    <td v-if="item.change_percent<0&&item.current_price_cny!=0" style="color:red;">{{Number(item.change_percent.toFixed(2)).toLocaleString()}}%</td>
                    
                    <td v-if="(active=='bitcoin'||active=='ripple'||active=='eos')&&item.current_price_cny!=0">{{priceb(item)}}</td>
                    <td v-if="(active=='bitcoin-cash'||active=='ethereum')&&item.current_price_cny!=0">{{priceb1(item)}}</td>
                    
                    <td v-if="(active=='bitcoin'||active=='ripple'||active=='eos')&&item.current_price_cny!=0">{{pricec(item)}}</td>
                    <td v-if="(active=='bitcoin-cash'||active=='ethereum')&&item.current_price_cny!=0">{{pricec1(item)}}</td>
                    
                    <!-- <td>{{Number((item.supply/10000).toFixed(0)).toLocaleString()+'万'}}</td> -->
                    <!-- <td>{{priceb(item)}}</td> -->
                    <td v-if="item.current_price_cny!=0">{{(item.dutyfactor*100).toFixed(2)}}%</td>
                    <td style="padding-left:60px;" v-if="item.current_price_cny==0">---</td>
                    <td style="padding-left:60px;" v-if="item.current_price_cny==0">---</td>
                    <td style="padding-left:60px;" v-if="item.current_price_cny==0">---</td>
                    <td style="padding-left:60px;" v-if="item.current_price_cny==0">---</td>
                    <td style="padding-left:60px;" v-if="item.current_price_cny==0">---</td>                    
                </tr>
            </tbody>
        </table>
        <div class="noMsg" v-if="list.length === 0 && listname.length === 0">
            暂无数据
        </div>
    </div>
</template>

<script>
import axios from "~/plugins/axios.js";
// import "element-ui/lib/theme-chalk/index.css";
import { Option } from "element-ui";
import { Select } from "element-ui";
// import Vue from "vue";
// Vue.use(Option);
let quotationTimer;
export default {
    // components: {
    //     // Select,
    //     Option
    // },
    name: "quotation",
    props: {
        list: Array
    },
    data() {
        return {
            // value: "",
            active: "bitcoin",
            piceB: 0,
            piceE: 0,
            listname: this.list,
            currency: "CNY",
            option1: [
                { label: "人民币（CNY）", currency: "CNY" },
                { label: "美元（USD）", currency: "USD" },
                { label: "比特币（BTC）", currency: "BTC" },
                { label: "以太坊（ETH）", currency: "ETH" }
            ],
            coins: [
                { name: "BTC", code: "bitcoin" },
                { name: "ETH", code: "ethereum" },
                { name: "XRP", code: "ripple" },
                { name: "BCH", code: "bitcoin-cash" },
                { name: "EOS", code: "eos" }
            ]
        };
    },
    created() {
        // this.clickItem("bitcoin");
        // this.clickItem("ethereum");
    },
    mounted() {
        if (quotationTimer) {
            clearInterval(quotationTimer);
        }
        quotationTimer = setInterval(() => {
            this.reloadQuotation();
        }, 10000);
    },
    methods: {
        computedCnzz() {
            _czc.push(["_trackEvent", "首页行情列表", "点击更多币种"]);
        },
        clickItem(item) {
            this.active = item.code;
            this.reloadQuotation();
            _czc.push(["_trackEvent", "首页行情列表", "选择币种", item.name]);
        },
        price(item) {
            switch (this.currency) {
                case "CNY":
                    return `￥${item.current_price_cny.toLocaleString()}`;
                case "USD":
                    return `$${item.current_price.toLocaleString()}`;
                case "BTC":
                    return `${Number(item.current_price_cny / this.piceB)
                        .toFixed(5)
                        .toLocaleString()}BTC`;
                case "ETH":
                    return `${Number(
                        (item.current_price_cny / this.piceE).toFixed(5)
                    ).toLocaleString()}ETH`;
            }
        },
        price1(item) {
            switch (this.currency) {
                case "CNY":
                    return `￥${item.current_price_cny.toLocaleString()}`;
                case "USD":
                    return `$${item.current_price.toLocaleString()}`;
                case "BTC":
                    return `${Number(item.current_price_cny / this.piceB * 10)
                        .toFixed(5)
                        .toLocaleString()}BTC`;
                case "ETH":
                    return `${Number(
                        (item.current_price_cny / this.piceE * 10).toFixed(5)
                    ).toLocaleString()}ETH`;
            }
        },
        priceb(item) {
            switch (this.currency) {
                case "CNY":
                    return `${Number(
                        (item.volum_24h / 10000).toFixed(2)
                    ).toLocaleString() + "万"}`;
                case "USD":
                    return `${Number(
                        (
                            item.volum_24h *
                            item.current_price /
                            item.current_price_cny /
                            10000
                        ).toFixed(2)
                    ).toLocaleString() + "万"}`;
                case "BTC":
                    return `${Number(
                        (
                            item.volum_24h *
                            item.current_price_cny /
                            this.piceB /
                            item.current_price_cny /
                            10000
                        ).toFixed(4)
                    ).toLocaleString() + "万  "}`;
                case "ETH":
                    return `${Number(
                        (
                            item.volum_24h *
                            item.current_price_cny /
                            this.piceE /
                            item.current_price_cny /
                            10000
                        ).toFixed(4)
                    ).toLocaleString() + "万  "}`;
            }
        },
        priceb1(item) {
            switch (this.currency) {
                case "CNY":
                    return `${Number(
                        (item.volum_24h / 10000).toFixed(2)
                    ).toLocaleString() + "万"}`;
                case "USD":
                    return `${Number(
                        (
                            item.volum_24h *
                            item.current_price /
                            item.current_price_cny /
                            10000
                        ).toFixed(2)
                    ).toLocaleString() + "万"}`;
                case "BTC":
                    return `${Number(
                        (
                            item.volum_24h *
                            item.current_price_cny /
                            this.piceB /
                            item.current_price_cny /
                            1000
                        ).toFixed(2)
                    ).toLocaleString() + "万  "}`;
                case "ETH":
                    return `${Number(
                        (
                            item.volum_24h *
                            item.current_price_cny /
                            this.piceE /
                            item.current_price_cny /
                            1000
                        ).toFixed(2)
                    ).toLocaleString() + "万  "}`;
            }
        },
        pricec(item) {
            switch (this.currency) {
                case "CNY":
                    return `￥${Number(
                        (
                            item.current_price_cny *
                            item.volum_24h /
                            10000
                        ).toFixed(0)
                    ).toLocaleString() + "万"}`;
                case "USD":
                    return `$${Number(
                        (
                            item.current_price *
                            item.volum_24h *
                            item.current_price /
                            item.current_price_cny /
                            10000
                        ).toFixed(0)
                    ).toLocaleString() + "万"}`;
                case "BTC":
                    return `${Number(
                        (
                            item.current_price_cny /
                            this.piceB *
                            item.volum_24h *
                            item.current_price_cny /
                            this.piceB /
                            item.current_price_cny /
                            1000
                        ).toFixed(0)
                    ).toLocaleString() + "万 BTC "}`;
                case "ETH":
                    return `${Number(
                        (
                            item.current_price_cny /
                            this.piceE *
                            item.volum_24h *
                            item.current_price_cny /
                            this.piceE /
                            item.current_price_cny /
                            1000
                        ).toFixed(0)
                    ).toLocaleString() + "万 ETH"}`;
            }
        },
        pricec1(item) {
            switch (this.currency) {
                case "CNY":
                    return `￥${Number(
                        (
                            item.current_price_cny *
                            item.volum_24h /
                            10000
                        ).toFixed(2)
                    ).toLocaleString() + "万"}`;
                case "USD":
                    return `$${Number(
                        (
                            item.current_price *
                            item.volum_24h *
                            item.current_price /
                            item.current_price_cny /
                            10000
                        ).toFixed(2)
                    ).toLocaleString() + "万"}`;
                case "BTC":
                    return `${Number(
                        (
                            item.current_price_cny /
                            this.piceB *
                            10 *
                            item.volum_24h *
                            item.current_price_cny /
                            this.piceB /
                            item.current_price_cny /
                            1000
                        ).toFixed(2)
                    ).toLocaleString() + "万 BTC "}`;
                case "ETH":
                    return `${Number(
                        (
                            item.current_price_cny /
                            this.piceE *
                            10 *
                            item.volum_24h *
                            item.current_price_cny /
                            this.piceE /
                            item.current_price_cny /
                            1000
                        ).toFixed(2)
                    ).toLocaleString() + "万 ETH"}`;
            }
        },

        async reloadQuotation() {
            // this.listname=[];
            let { data } = await axios.post(
                "http://120.79.0.99/market/api/marketAll/index",
                `type=${this.active}`
            );
            // console.log(data);
            
            if (!data || data.code === -1) {
                return;
            }
            
            if (this.active == "bitcoin") {
                this.listname = data.bitcoin;
                this.piceB = data.bitcoin[0].current_price_cny;
                this.piceE = data.ethereum.current_price_cny;
            } else if (this.active == "ethereum") {
                this.listname = data.ethereum;
                this.piceB = data.bitcoin.current_price_cny;
                this.piceE = data.ethereum[0].current_price_cny;
            } else {
                this.listname = data.data || [];
                this.piceB = data.bitcoin.current_price_cny;
                this.piceE = data.ethereum.current_price_cny;
            }
            // console.log(this.listname);
            
        }
    },
    beforeDestroy() {
        clearInterval(quotationTimer);
    }
};
</script>

<style>
th > div.el-select {
    font-size: 14px;
    border: 0;
    background-color: transparent;
    height: 42px;
    color: #595959;
    outline: none;
    font-weight: 600;
    cursor: pointer;
    background-color: #f2f2f2;
}
.el-select .el-input.is-focus .el-input__inner {
    border-color: #f2f2f2 !important;
}
th > div.el-select .scrollbar__view > li.el-select-dropdown__item {
    display: none;
}
.el-select .el-input__inner:focus {
    border-color: #f2f2f2;
}
/* el-select div.el-select >div>input.el-input__inner:focus {
    border-color: #f2f2f2 !important;
} */
.el-input {
    height: 42px;
    padding-left: 15px;
}

.el-input__icon {
    width: 50px;
    font-weight: bold;
    color: #606266;
}
/* .el-input__suffix-inner{
    } */
.el-select:hover .el-input__inner {
    border-color: #f2f2f2 !important;
    /* height: 42px; */
    vertical-align: top;
}
th .el-select input.el-input__inner {
    -webkit-appearance: none;
    background-color: #f2f2f2 !important;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #f2f2f2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    height: 42px;
    line-height: 40px;
    outline: 0;
    padding: 0 0px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
    width: 100%;
    vertical-align: top;
}

el-select > el-option {
    font-size: 14px;
}
</style>

<style scoped >
ul.quo-header {
    background: none;
    margin-bottom: 10px;
}

ul.quo-header > li {
    /* width: 70px; */
    padding: 0 24px;
    line-height: 30px;
    text-align: center;
    border-radius: 20px;
    margin-right: 12px;
    color: #f25a36;
    background-color: #f2f2f2;
    cursor: pointer;
}

ul.quo-header > li:hover {
    background-color: #f25a36;
}

ul.quo-header > li:hover a {
    color: #fff;
}

ul.quo-header > li.active {
    background-color: #f25a36;
}

ul.quo-header > li.active a {
    color: #fff;
}

/* ul.quo-header > li a:hover {
    color: #fff;
} */
ul.quo-header .one {
    /* text-align: right; */
    width: 100px;
    padding: 0;
    font-size: 12px;
    background-color: #fff;
    border: 1px solid #f25a36;
    float: right;
    margin-right: 0;
}

ul.quo-header .one:hover {
    background-color: #f25a36;
}

ul.quo-header .one:hover a {
    color: #fff;
}

.quotation {
    margin-bottom: 15px;
}

ul {
    /* text-align: left; */
}

ul.quo-header li {
    display: inline-block;
    color: #fff;
}

ul.quo-header li a {
    display: block;
    color: #f25a36;
}

table {
    width: 100%;
    font-size: 14px;
    color: #595959;
}

thead tr,
tbody tr {
    height: 42px;
    line-height: 42px;
}

thead > tr > th:first-child,
tbody > tr > td:first-child {
    width: 110px;
    /* padding-left: 20px; */
}

thead > tr > th:nth-child(2) {
    width: 150px;
}

thead > tr > th:nth-child(3) {
    width: 120px;
}

thead > tr > th:nth-child(4) {
    width: 130px;
}

thead > tr > th:nth-child(5) {
    width: 150px;
}

thead > tr > th:last-child {
    width: 120px;
}

thead > tr > th {
    /* text-align: left; */
    /* line-height: 42px; */
    cursor: pointer;
    /* background-color: #f2f2f2; */
}

thead > tr > th:first-child {
    border-radius: 24px 0 0 24px;

    overflow: hidden;
}

thead > tr > th:last-child {
    border-radius: 0 24px 24px 0;
    overflow: hidden;
}

th,
td {
    vertical-align: middle;
    font-size: 14px;
    line-height: 42px;
}
.quotation td{
    text-align: left;
    padding-left: 40px;

}

tbody.tbody > tr:nth-child(even) {
    background-color: #f8f8f8;
}
thead tr.thead {
    background-color: #f2f2f2;
    border-radius: 24px 0 0 24px;
}
tbody > tr:nth-child(even) > td:first-child {
    border-radius: 24px 0 0 24px;
    overflow: hidden;
}

tbody > tr:nth-child(even) > td:last-child {
    border-radius: 0 24px 24px 0;
    overflow: hidden;
}
.quo-header {
    text-align: left;
}
.noMsg {
    width: 100%;
    height: 40px;
    line-height: 40px;
}
</style>
