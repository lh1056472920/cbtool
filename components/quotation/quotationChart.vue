<template>
    <div class="quotation">
        <ul class="header">
            <li>
                <a>平台价格</a>
            </li>
            <li v-for="item in options" :class="{active: active==item.label}" :key="item.index" @click="clickItem(item.label)">
                <a>{{item.label}}</a>
            </li>
        </ul>

        <table>
            <thead>
                <tr class="thead">
                    <th>交易所</th>
                    <th>交易对</th>
                    <th>价格</th>
                    <th>涨跌幅</th>
                    <th>成交量</th>
                    <th>成交额</th>
                    <th>占比</th>
                </tr>
            </thead>
        </table>
        <table>
            <tbody>
                <tr v-show="listname.length!=0&&i!=0" v-for="(item, i) in listname" :key="item.index">
                    <td ref="reference">{{item.platform_name}}</td>
                    <td>{{item.name}}/{{item.market}}</td>
                    <!-- <td>价格</td> -->
                    <td v-show="coinName!='bitcoin-cash'&&coinName!='ethereum'">{{price(item)}}</td>
                    <!-- <td v-show="coinName=='bitcoin'||coinName=='ripple'||coinName=='eos'">{{price(item)}}</td> -->
                    <td v-show="coinName=='bitcoin-cash'||coinName=='ethereum'">{{price1(item)}}</td>
                    <td v-show="item.change_percent>=0" style="color:#1fbf88;">+{{item.change_percent.toFixed(2)}}%</td>
                    <td v-show="item.change_percent<0" style="color:red;">{{item.change_percent.toFixed(2)}}%</td>
                    <td>{{priceb1(item)}}</td>
                    <!-- <td>{{price3(item)}}</td> -->
                    <td v-show="coinName!='bitcoin-cash'&&coinName!='ethereum'">{{pricec(item)}}</td>
                    <!-- <td v-show="coinName=='bitcoin'||coinName=='ripple'||coinName=='eos'">{{price(item)}}</td> -->
                    <td v-show="coinName=='bitcoin-cash'||coinName=='ethereum'">{{pricec1(item)}}</td>
                    <td>{{(item.dutyfactor*100).toFixed(2)}}%</td>
                </tr>
            </tbody>
        </table>
        <!-- <div class="btn-one">
            <button @click="addSize">查看更多</button>
        </div> -->
        <div class="btn-one">
            <button class="more" @click="addSize" :style="isShow">查看更多</button>
            <hr :style="isFade" class="deadLine">
            <p :style="isFade" class="deadLineText">我是有底线的</p>
        </div>
    </div>
</template>

<script>
import axios from "~/plugins/axios.js";
let quotationTimer;
export default {
    name: "quotation",
    props: {
        list: String
    },
    data() {
        return {
            coinName: this.list,
            active: "bitcoin",
            piceB: 0,
            piceE: 0,
            num: 6,
            listname: [],
            currency: "CNY",
            options: [
                { label: "人民币（CNY）", value: "CNY" },
                { label: "美元（USD）", value: "USD" },
                { label: "比特币（BTC）", value: "BTC" },
                { label: "以太坊（ETH）", value: "ETH" }
            ],
            isShow: "",
            isFade: {
                display: "none"
            }
        };
    },
    created() {
        this.clickItem("人民币（CNY）");
    },
    methods: {
        async clickItem(active) {
            this.num = 6;
            this.isFade = "display:none";
            this.isShow = "display:block";
            this.active = active;
            let { data } = await axios.post(
                "http://120.79.0.99/market/api/marketAll/allMarketIndexDetail",
                `type=${this.coinName}`
            );
            // console.log(data);

            this.listname = data.data.splice(0, 6);
            this.piceA = data.usdt[0].current_price_cny; //usdt人民币兑美元汇率;

            if (this.coinName == "bitcoin") {
                this.piceB = data.bitcoin[0].current_price_cny;
                this.piceE = data.ethereum[0].current_price_cny;
                // console.log(this.piceE);
            } else if (this.coinName == "ethereum") {
                this.piceB = data.bitcoin[0].current_price_cny;
                this.piceE = data.ethereum[0].current_price_cny;
            } else {
                this.piceB = data.bitcoin[0].current_price_cny;
                this.piceE = data.ethereum[0].current_price_cny;
            }
        },
        async addSize() {
            this.num += 5;
            let { data } = await axios.post(
                "http://120.79.0.99/market/api/marketAll/allMarketIndexDetail",
                `type=${this.coinName}`
            );
            if (data.data.length < this.num) {
                this.isShow = "display:none";
                this.isFade = "display:block";
            }
            this.listname = data.data.splice(0, this.num);
            // console.log(this.listname);
        },
        // console.log(this.piceE);
        price(item) {
            //这个是带货币单位
            switch (this.active) {
                case "人民币（CNY）":
                    if (Number(item.current_price_cny) > 100000) {
                        return `￥${Number(
                            item.current_price_cny / 10000
                        ).toLocaleString() + "万"}`;
                    } else if (Number(item.current_price_cny) > 10000) {
                        return `￥${Number(
                            item.current_price_cny
                        ).toLocaleString()}`;
                    } else if (Number(item.current_price_cny) < 100) {
                        return `￥${Number(item.current_price_cny).toFixed(2)}`;
                    } else {
                        return `￥${Number(item.current_price_cny)}`;
                    }
                case "美元（USD）":
                    if (Number(item.current_price_cny / this.piceA) > 100000) {
                        return `$${Number(
                            (
                                item.current_price_cny /
                                this.piceA /
                                10000
                            ).toFixed(0)
                        ).toLocaleString() + "万"}`;
                    } else if (
                        Number(item.current_price_cny / this.piceA) > 1000
                    ) {
                        return `$${Number(
                            (item.current_price_cny / this.piceA).toFixed(0)
                        ).toLocaleString()}`;
                    } else {
                        return `$${Number(
                            (item.current_price_cny / this.piceA).toFixed(2)
                        )}`;
                    }
                case "比特币（BTC）":
                    if (Number(item.current_price_cny / this.piceB) > 0.00001) {
                        return `${Number(
                            (item.current_price_cny / this.piceB).toFixed(5)
                        )}BTC`;
                    } else {
                        return `${Number(
                            (item.current_price_cny / this.piceB).toFixed(7)
                        )}BTC`;
                    }
                case "以太坊（ETH）":
                    if (Number(item.current_price_cny / this.piceE) > 0.00001) {
                        return `${Number(
                            (item.current_price_cny / this.piceE).toFixed(5)
                        )}ETH`;
                    } else {
                        return `${Number(
                            (item.current_price_cny / this.piceE).toFixed(7)
                        )}ETH`;
                    }
                // return `${Number(
                //     (item.current_price_cny / this.piceE).toFixed(6)
                // )}ETH`;
            }
        },

        price1(item) {
            switch (this.active) {
                case "人民币（CNY）":
                    return `￥${Number(
                        item.current_price_cny
                    ).toLocaleString()}`;
                case "美元（USD）":
                    return `$${Number(
                        (item.current_price_cny / this.piceA).toFixed(2)
                    ).toLocaleString()}`;
                case "比特币（BTC）":
                    return `${Number(
                        (item.current_price_cny / this.piceB * 10).toFixed(5)
                    )}BTC`;
                case "以太坊（ETH）":
                    return `${Number(
                        (item.current_price_cny / this.piceE * 10).toFixed(5)
                    )}ETH`;
            }
        },

        priceb1(item) {
            switch (this.active) {
                case "人民币（CNY）":
                    if (Number(item.volum_24h) > 10000) {
                        return `￥${Number(
                            (item.volum_24h / 10000).toFixed(0)
                        ).toLocaleString() + "万"}`;
                    } else if (Number(item.volum_24h) < 100) {
                        return `￥${Number(item.volum_24h.toFixed(2))}`;
                    } else {
                        return `￥${Number(
                            item.volum_24h.toFixed(0)
                        ).toLocaleString()}`;
                    }
                case "美元（USD）":
                    if (Number(item.volum_24h / this.piceA) > 10000) {
                        return `$${Number(
                            (item.volum_24h / this.piceA / 10000).toFixed(0)
                        ).toLocaleString() + "万"}`;
                    } else if (Number(item.volum_24h / this.piceA) < 100) {
                        return `$${Number(
                            (item.volum_24h / this.piceA).toFixed(2)
                        )}`;
                    } else {
                        return `$${Number(
                            (item.volum_24h / this.piceA).toFixed(0)
                        ).toLocaleString()}`;
                    }
                case "比特币（BTC）":
                    if (Number(item.volum_24h / this.piceB) > 10000) {
                        return `${Number(
                            (item.volum_24h / this.piceB / 10000).toFixed(0)
                        ).toLocaleString() + "万 "}BTC`;
                    } else if (Number(item.volum_24h / this.piceB) < 100) {
                        return `${Number(
                            (item.volum_24h / this.piceB).toFixed(2)
                        )}BTC`;
                    } else {
                        return `${Number(
                            (item.volum_24h / this.piceB).toFixed(0)
                        ).toLocaleString()}BTC`;
                    }
                // return `${Number(
                //     (item.volum_24h / this.piceB / 10000).toFixed(2)
                // ).toLocaleString() + "万 "}BTC`;
                case "以太坊（ETH）":
                    if (Number(item.volum_24h / this.piceE) > 10000) {
                        return `${Number(
                            (item.volum_24h / this.piceE / 10000).toFixed(0)
                        ).toLocaleString() + "万 "}ETH`;
                    } else if (Number(item.volum_24h / this.piceE) < 100) {
                        return `${Number(
                            (item.volum_24h / this.piceE).toFixed(2)
                        )}ETH`;
                    } else {
                        return `${Number(
                            (item.volum_24h / this.piceE).toFixed(0)
                        ).toLocaleString()}ETH`;
                    }
                // return `${Number(
                //     (item.volum_24h / this.piceE / 10000).toFixed(2)
                // ).toLocaleString() + "万 "}ETH`;
            }
        },
        pricec1(item) {
            //这个是带货币单位
            switch (this.active) {
                case "人民币（CNY）":
                    if (
                        Number(item.current_price_cny * item.volum_24h) > 100000
                    ) {
                        return `￥${Number(
                            item.current_price_cny * item.volum_24h / 10000
                        ).toFixed(0) + "万"}`;
                    } else if (
                        Number(item.current_price_cny * item.volum_24h) > 10000
                    ) {
                        return `￥${Number(
                            item.current_price_cny * item.volum_24h
                        ).toLocaleString()}`;
                    } else if (
                        Number(item.current_price_cny * item.volum_24h) < 100
                    ) {
                        return `￥${Number(
                            item.current_price_cny * item.volum_24h
                        ).toFixed(2)}`;
                    } else {
                        return `￥${Number(
                            item.current_price_cny * item.volum_24h
                        )}`;
                    }
                case "美元（USD）":
                    if (
                        Number(
                            item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA
                        ) > 100000
                    ) {
                        return `$${Number(
                            (
                                item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA /
                                10000
                            ).toFixed(0)
                        ).toFixed(0) + "万"}`;
                    } else if (
                        Number(
                            item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA
                        ) > 1000
                    ) {
                        return `$${Number(
                            (
                                item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA
                            ).toFixed(0)
                        ).toLocaleString()}`;
                    } else {
                        return `$${Number(
                            (
                                item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA
                            ).toFixed(2)
                        )}`;
                    }
                case "比特币（BTC）":
                    if (
                        Number(
                            item.current_price_cny /
                                this.piceB *
                                item.volum_24h /
                                this.piceB
                        ) > 0.00001
                    ) {
                        return `${Number(
                            (
                                item.current_price_cny /
                                this.piceB *
                                item.volum_24h /
                                this.piceB *
                                10
                            ).toFixed(5)
                        )}BTC`;
                    } else {
                        return `${Number(
                            (
                                item.current_price_cny /
                                this.piceB *
                                item.volum_24h /
                                this.piceB *
                                10
                            ).toFixed(7)
                        )}BTC`;
                    }
                case "以太坊（ETH）":
                    if (
                        Number(
                            item.current_price_cny /
                                this.piceE *
                                item.volum_24h /
                                this.piceE
                        ) > 0.00001
                    ) {
                        return `${Number(
                            (
                                item.current_price_cny /
                                this.piceE *
                                item.volum_24h /
                                this.piceE *
                                10
                            ).toFixed(5)
                        )}ETH`;
                    } else {
                        return `${Number(
                            (
                                item.current_price_cny /
                                this.piceE *
                                item.volum_24h /
                                this.piceE *
                                10
                            ).toFixed(5)
                        )}ETH`;
                    }
                // return `${Number(
                //     (item.current_price_cny / this.piceE).toFixed(6)
                // )}ETH`;
            }
        },
        pricec(item) {
            //这个是带货币单位
            switch (this.active) {
                case "人民币（CNY）":
                    if (
                        Number(item.current_price_cny * item.volum_24h) > 100000
                    ) {
                        return `￥${Number(
                            item.current_price_cny * item.volum_24h / 10000
                        ).toFixed(0) + "万"}`;
                    } else if (
                        Number(item.current_price_cny * item.volum_24h) > 10000
                    ) {
                        return `￥${Number(
                            item.current_price_cny * item.volum_24h
                        ).toLocaleString()}`;
                    } else if (
                        Number(item.current_price_cny * item.volum_24h) < 100
                    ) {
                        return `￥${Number(
                            item.current_price_cny * item.volum_24h
                        ).toFixed(2)}`;
                    } else {
                        return `￥${Number(
                            item.current_price_cny * item.volum_24h
                        )}`;
                    }
                case "美元（USD）":
                    if (
                        Number(
                            item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA
                        ) > 100000
                    ) {
                        return `$${Number(
                            (
                                item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA /
                                10000
                            ).toFixed(0)
                        ).toLocaleString() + "万"}`;
                    } else if (
                        Number(
                            item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA
                        ) > 1000
                    ) {
                        return `$${Number(
                            (
                                item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA
                            ).toFixed(0)
                        ).toLocaleString()}`;
                    } else {
                        return `$${Number(
                            (
                                item.current_price_cny /
                                this.piceA *
                                item.volum_24h /
                                this.piceA
                            ).toFixed(2)
                        )}`;
                    }
                case "比特币（BTC）":
                    if (
                        Number(
                            item.current_price_cny /
                                this.piceB *
                                item.volum_24h /
                                this.piceB
                        ) > 0.00001
                    ) {
                        return `${Number(
                            (
                                item.current_price_cny /
                                this.piceB *
                                item.volum_24h /
                                this.piceB
                            ).toFixed(5)
                        )}BTC`;
                    } else {
                        return `${Number(
                            (
                                item.current_price_cny /
                                this.piceB *
                                item.volum_24h /
                                this.piceB
                            ).toFixed(7)
                        )}BTC`;
                    }
                case "以太坊（ETH）":
                    if (
                        Number(
                            item.current_price_cny /
                                this.piceE *
                                item.volum_24h /
                                this.piceE
                        ) > 0.00001
                    ) {
                        return `${Number(
                            (
                                item.current_price_cny /
                                this.piceE *
                                item.volum_24h /
                                this.piceE
                            ).toFixed(5)
                        )}ETH`;
                    } else {
                        return `${Number(
                            (
                                item.current_price_cny /
                                this.piceE *
                                item.volum_24h /
                                this.piceE
                            ).toFixed(7)
                        )}ETH`;
                    }
                // return `${Number(
                //     (item.current_price_cny / this.piceE).toFixed(6)
                // )}ETH`;
            }
        }
        // price3(item) {
        //     if (item.volum_24h / item.current_price_cny > 100000) {
        //         return `${Number(
        //             (item.volum_24h / item.current_price_cny / 10000).toFixed(0)
        //         ).toLocaleString() + "万"}`;
        //     } else if (item.volum_24h / item.current_price_cny > 10000) {
        //         return `${Number(
        //             (item.volum_24h / item.current_price_cny).toFixed(0)
        //         ).toLocaleString()}`;
        //     } else {
        //         return `${Number(
        //             (item.volum_24h / item.current_price_cny).toFixed(0)
        //         )}`;
        //     }
        // }
    }
};
</script>

<style scoped>
ul.header {
    width: 100%;
    background: none;
}

ul.header li:first-child {
    border-radius: 25px 0 0 25px;
}

ul.header li:last-child {
    float: right;
    margin-right: 0;
    border-radius: 0 25px 25px 0;
}

ul.header > li {
    width: 158px;
    line-height: 42px;
    text-align: center;
    background-color: #1fbf88;
    cursor: pointer;
}

ul.header > li a:hover {
    color: #fff;
    background-color: #15ac78;
    border-radius: 25px;
}

ul.header > li:first-child a:hover {
    background-color: #1fbf88;
    border-radius: 25px 0 0 25px;
}

ul.header > li.active a {
    color: #fff;
    background-color: #15ac78;
    border-radius: 25px;
}

/* .btn-one {
    width: 100%;
    display: flex;display: -moz-box;display: -webkit-flex;
    justify-content: center;-webkit-justify-content:center;-moz-box-pack:center;-webkit--moz-box-pack:center;
}
button {
    width: 160px;
    height: 37px;
    border: #f25a36 solid 1px;
    margin: 19px 0 0px;
    color: #f25a36;
    background-color: transparent;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
}*/
button:hover {
    background-color: #f25a36;
    color: #fff;
}

.btn-one {
    width: 100%;
    height: 77px;

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

button:hover {
    background-color: #f25a36;
    color: #fff;
}

button {
    width: 160px;
    height: 37px;
    border: #f25a36 solid 1px;
    margin: 20px auto 20px;
    color: #f25a36;
    background-color: transparent;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
}

.deadLine {
    width: 600px;
    margin: 0 auto;
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
    top: 20px;
    margin: 0 auto;
    color: #a6a6a6;
    background-color: #fff;
}

ul.header .one {
    /* text-align: right; */
    width: 100px;
    background-color: none;
}

.quotation {
    margin-bottom: 15px;
}

ul {
    text-align: left;
}

ul li {
    display: inline-block;
    color: #fff;
}

ul li a {
    display: block;
    color: #fff;
    font-size: 14px;
}

select {
    font-size: 14px;
    border: 0;
    background-color: transparent;
    height: 42px;
    color: #595959;
    outline: none;
    font-weight: 600;
    cursor: pointer;
}

option {
    outline: none;
}

table {
    width: 100%;
    font-size: 14px;
    color: #595959;
}

thead tr,
tbody tr {
    height: 42px;
}

thead > tr > th,
tbody > tr > td {
    width: 100px;
    text-align: center;
}

tbody > tr > td {
    width: 112px;
}

tbody > tr:nth-child(odd) {
    background-color: #f2f2f2;
}

tbody > tr:nth-child(odd) > td:first-child {
    border-radius: 25px 0 0 25px;
}

tbody > tr:nth-child(odd) > td:last-child {
    border-radius: 0 25px 25px 0;
}

thead > tr > th {
    /* text-align: left; */
    cursor: pointer;
    background-color: #f2f2f2;
}

thead > tr > th:first-child {
    border-radius: 25px 0 0 25px;
    overflow: hidden;
}

thead > tr > th:last-child {
    border-radius: 0 25px 25px 0;
    overflow: hidden;
}

th,
td {
    vertical-align: middle;
    font-size: 14px;
}
</style>
