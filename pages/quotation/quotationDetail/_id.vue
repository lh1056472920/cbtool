<template>
    <div>
        <!-- 币种详情 -->
        <div class="coin-main clear">
            <div class="title">
                <nuxt-link v-if="coinName2=='quotation'" to="/quotation">行情</nuxt-link>
                <nuxt-link v-if="coinName2=='coin'" to="/coin">币种大全</nuxt-link>
                <span>></span>
                <span>{{basicInfoList[0].name}}</span>
            </div>
            <!-- 左部模块 -->
            <div class="left">
                <div class="coin">
                    <img :src="`${coinInfoDetail.image}`" :onerror="actImgDefault" alt="">
                    <div>
                        <p>{{basicInfoList[0].name}}&nbsp;{{basicInfoList[0].chinese_name}}</p>
                        <i>{{basicInfoList[2].keyshort}}</i>
                    </div>
                </div>
                <div class="charts">
                    <div class="duration">
                        <a href="javascript:void(0);" :class="{active: active==='d'}" @click.stop.prevent="clickItem('d')">天</a>
                        <a href="javascript:void(0);" :class="{active: active==='w'}" @click.stop.prevent="clickItem('w')">周</a>
                        <a href="javascript:void(0);" :class="{active: active==='m'}" @click.stop.prevent="clickItem('m')">1月</a>
                        <a href="javascript:void(0);" :class="{active: active==='y'}" @click.stop.prevent="clickItem('y')">1年</a>
                        <a href="javascript:void(0);" :class="{active: active==='all'}" @click.stop.prevent="clickItem('all')">所有</a>
                        <p>价格（美元）：
                            <span>{{basicInfoList[1].current_price_usd}}</span>&nbsp;&nbsp;24小时成交量：
                            <span>{{price(basicInfoList[1].volum_24h)}}</span>&nbsp;&nbsp;市值：
                            <span>{{price(basicInfoList[1].market_value)}}</span>
                        </p>
                    </div>
                    <div id="coinEcharts">
                    </div>
                </div>
                <quotationChart :list='coinName1'></quotationChart>
                <div class="box" v-if="coinInfoDetail.projectIntroduction">
                    <p class="subtitle">项目介绍</p>
                    <div class="content" v-html="coinInfoDetail.projectIntroduction">
                    </div>
                </div>
                <div class="box" v-if="coinInfoDetail.teamMembers">
                    <p class="subtitle">团队介绍</p>
                    <div class="content" v-html="coinInfoDetail.teamMembers">
                    </div>
                </div>
                <div class="box" v-if="coinInfoDetail.projectHighlights">
                    <p class="subtitle">项目亮点</p>
                    <div class="content" v-html="coinInfoDetail.projectHighlights">
                    </div>
                </div>
                <div class="box" v-if="coinInfoDetail.usingTheScenario">
                    <p class="subtitle">运用场景</p>
                    <div class="content" v-html="coinInfoDetail.usingTheScenario">
                    </div>
                </div>
                <div class="box" v-if="coinInfoDetail.partner">
                    <p class="subtitle">合作伙伴</p>
                    <div class="content" v-html="coinInfoDetail.partner">
                    </div>
                </div>
                <div class="box" v-if="coinInfoDetail.tradingPlatform">
                    <p class="subtitle">交易平台</p>
                    <div class="content" v-html="coinInfoDetail.tradingPlatform">
                    </div>
                </div>

            </div>
            <!-- 右部模块 -->
            <div class="right">
                <h2>基本信息</h2>
                <p>
                    <span class="point"></span>官网：
                    <a :href="basicInfoList[0].website" target="_blank">{{basicInfoList[0].website}}</a>
                </p>
                <p>
                    <span class="point"></span>发行时间：{{basicInfoList[0].issude_date}}</p>
                <p>
                    <span class="point"></span>项目概念：{{basicInfoList[0].related_notion}}</p>
                <p>
                    <span class="point"></span>白皮书：
                    <a :href="basicInfoList[0].white_paper" target="_blank">{{basicInfoList[0].white_paper}}</a>
                </p>
                <p>
                    <span class="point"></span>上架交易所：{{basicInfoList[0].putaway_exchange}}</p>
                <p>
                    <span class="point"></span>流通市值：￥ {{price(basicInfoList[1].market_value)}}</p>
                <p>
                    <span class="point"></span>流通量：{{price(basicInfoList[1].vol)}} xrp</p>
                <p>
                    <span class="point"></span>总发行量：{{basicInfoList[2].counts}}</p>
            </div>
            <!-- 回到顶部 -->
            <toTop></toTop>
        </div>
    </div>
</template>

<style>
.coin-main {
    width: 1200px;
    margin: 10px auto 0;
}

.coin-main .title {
    width: 1200px;
    height: 42px;
    margin: 0 auto;
    line-height: 42px;
    color: #d9d9d9;
    font-size: 14px;
}

.coin-main .title a {
    color: #d9d9d9;
}

.coin-main a:hover {
    color: #f25a36;
}

.coin-main .left {
    float: left;
    width: 790px;
    height: 100%;
    margin-right: 80px;
    border-top: 2px solid #f25a36;
}

.coin-main .coin {
    height: 90px;

    display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
}

.coin-main .coin img {
    width: 60px;
    height: 60px;
    margin-right: 13px;
    border-radius: 50%;
}

.coin-main .coin > div p {
    font-size: 14px;
    color: #404040;
    margin-bottom: 11px;
}

.coin-main .coin i {
    font-size: 14px;
    color: #a6a6a6;
    font-style: normal;
}

.coin-main .duration {
    line-height: 60px;
    width: 100%;
    height: 60px;
}

.coin-main .duration a {
    padding: 2px 15px;
    width: 48px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #f2f2f2;
    border-radius: 15px;
    margin-right: 7px;
    font-size: 14px;
}

.coin-main .duration a:hover,
.coin-main .duration a.active {
    background-color: #f25a36;
    color: #fff;
}

.coin-main .duration p {
    display: inline-block;
    font-size: 14px;
    margin-left: 50px;
    /* vertical-align: top; */
}

.coin-main .duration p span {
    color: #f25a36;
}

.coin-main #coinEcharts {
    width: 100%;
    height: 440px;
    padding-top: 15px;
}

.coin-main .box {
    width: 100%;
    border-top: 2px solid #f25a36;
}

.coin-main .box .subtitle {
    width: 100%;
    text-align: center;
    height: 90px;
    line-height: 90px;
    font-size: 24px;
    color: #404040;
}

.coin-main .box .content {
    width: 100%;
    margin: 20px auto 50px;
    line-height: 30px;
    font-size: 16px;
    color: #404040;
}

.coin-main .right {
    float: right;
    width: 330px;
    height: 100%;
    border-top: 2px solid #f25a36;
}

.coin-main .right h2 {
    width: 100%;
    height: 58px;
    line-height: 58px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 23px;
    border-bottom: 1px solid #f2f2f2;
}

.coin-main .right p {
    width: 100%;
    margin-bottom: 46px;
    padding-left: 4px;
    font-size: 14px;
    line-height: 16px;
    color: #404040;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.coin-main .right .point {
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #f25a36;
    border-radius: 50%;
    margin-right: 8px;
}
</style>

<script>
import quotationChart from "~/components/quotation/quotationChart.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
import echarts from "echarts";
export default {
    name: "chart",
    components: {
        quotationChart,
        toTop
    },
    data() {
        return {
            active: "all",
            date: [],
            BTCPrice: [],
            dollarPrice: [],
            circulationMarketValue: [],
            tradingVolume: [],
            actImgDefault:
                'this.src="' +
                require("~/static/images/默认图_首页_热门项目.jpg") +
                '"'
            // coinName1:'',
        };
    },
    created() {},
    mounted() {
        this.drawChart();
        this.clickItem("all");
    },
    async asyncData({ params }) {
        let coinName = params.id.split("&")[0].split("=")[1];
        let coinName1 = params.id.split("&")[1].split("=")[1];
        let coinName2 = params.id.split("&")[2].split("=")[1];

        let [
            coinDetailRes,
            marketAllRes,
            diagramRes,
            coinInfo
        ] = await Promise.all([
            axios.post(`http://120.79.0.99/market/api/marketAll/detail?${params.id}`),
            axios.post(
                `http://120.79.0.99/market/api/marketAll/allMarketIndexDetail?type=${coinName}`
            ),
            axios.post(`http://120.79.0.99/market/api/marketAll/diagram?${params.id}`),
            axios.get(`/web/tokendetail/${coinName}`)
        ]);
        console.log(params.id);
        // console.log(coinName1);
        // console.log(coinInfo);
        // console.log(coinName2);

        return {
            basicInfoList:
                [
                    (!coinDetailRes.serviceError &&
                        coinDetailRes.data.detailInfo) ||
                        {},
                    (!marketAllRes.serviceError && marketAllRes.data.data[0]) ||
                        {},
                    !coinDetailRes.serviceError && coinDetailRes.data
                ] || [],
            diagramList: (!diagramRes.serviceError && diagramRes.data) || [],
            coinInfoDetail: (!coinInfo.serviceError && coinInfo.data) || [],
            coinName1: coinName1,
            coinName2: coinName2
        };
        
    },
    methods: {
        async clickItem(active) {
        console.log(this.basicInfoList);
            //  console.log(this.coinName1);

            // console.log();

            this.date = [];
            this.BTCPrice = [];
            this.dollarPrice = [];
            this.circulationMarketValue = [];
            this.tradingVolume = [];
            this.active = active;
            let { data } = await axios.post(
                `http://120.79.0.99/market/api/marketAll/diagram?${
                    this.$route.params.id
                }&type=${active}`
            );
            this.diagramList = data;
            // console.log(111);

            // console.log(this.diagramList);

            this.drawChart();
        },
        drawChart() {
            if (this.diagramList.diagram.value) {
                this.diagramList.diagram.value.forEach(item => {
                    // console.log(item[0]);
                    if (this.active === "d") {
                        
                        this.date.push(
                            echarts.format.formatTime("hh:mm", item[0])
                        );
                        // console.log(this.data);
                        
                    } else if (this.active === "w" || this.active === "m") {
                        this.date.push(
                            echarts.format.formatTime("MM-dd", item[0])
                        );
                    } else {
                        this.date.push(
                            echarts.format.formatTime("yyyy-MM", item[0])
                        );
                    }
                    this.BTCPrice.push(item[1]);
                    this.dollarPrice.push(item[2]);
                    this.circulationMarketValue.push(
                        parseInt(item[3] / 100000000)
                    );
                    this.tradingVolume.push(item[4]);
                });
            }

            let coinChart = echarts.init(
                document.getElementById("coinEcharts")
            );
            coinChart.setOption({
                animation: false, //是否开启动画
                legend: {
                    //图例组件，可通过点击图例控制哪些系列不显示
                    bottom: 10, //图裂位置
                    data: [
                        "流通市值(亿)",
                        "价格（美元）",
                        "价格（BTC）",
                        "24h成交量"
                    ] //图例数组
                },
                tooltip: {
                    //提示框组件
                    trigger: "axis", //坐标轴触发
                    axisPointer: {
                        type: "cross"
                    },
                    backgroundColor: "rgba(245, 245, 245, 0.8)",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    textStyle: {
                        fontSize: 12,
                        color: "#000"
                    },
                    // position: function(pos, params, el, elRect, size) {
                    //   var obj = { top: 10 };
                    //   obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                    //   return obj;
                    // },//不配置position 则默认随鼠标移动
                    extraCssText: "width: 170px"
                },
                axisPointer: {
                    //坐标轴指示器，全局设置
                    link: [
                        //不同轴的指示器设置联动
                        {
                            xAxisIndex: [0, 1]
                        }
                    ]
                },
                dataZoom: [
                    //区域缩放组件
                    {
                        type: "slider", //单独的滑动条
                        xAxisIndex: [0, 1],
                        realtime: false,
                        start: 10,
                        end: 90,
                        bottom: 40,
                        height: 50,
                        handleIcon:
                            "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                        handleSize: "30%"
                    },
                    {
                        type: "inside", //内置于坐标系中
                        xAxisIndex: [0, 1],
                        start: 40,
                        end: 70,
                        top: 30,
                        height: 20
                    }
                ],
                xAxis: [
                    {
                        type: "category",
                        data: this.date,
                        scale: true,
                        boundaryGap: false,
                        splitLine: { show: false },
                        axisLabel: { show: false }, //刻度标签
                        axisTick: { show: false }, //刻度
                        axisLine: { lineStyle: { color: "#dcdcdc" } },
                        splitNumber: 20,
                        min: "dataMin", //坐标刻度最小值
                        max: "dataMax",
                        axisPointer: {
                            type: "shadow",
                            label: { show: false },
                            triggerTooltip: true,
                            handle: {
                                show: false,
                                margin: 30,
                                color: "#B80C00"
                            }
                        }
                    },
                    {
                        type: "category", //坐标轴类型 value  category time
                        gridIndex: 1,
                        data: this.date,
                        boundaryGap: false,
                        axisLine: { lineStyle: { color: "#777" } }, //轴线
                        axisLabel: {
                            color: "#777",
                            fontSize: 10
                            // formatter: function(value) {
                            //   return echarts.format.formatTime("MM-dd", value);
                            // }
                        },
                        axisTick: { show: false },
                        min: "dataMin",
                        max: "dataMax",
                        axisPointer: {
                            show: true
                        }
                    }
                ],
                yAxis: [
                    {
                        name: "流通市值(亿)",
                        nameLocation: "middle",
                        nameGap: -5,
                        scale: true,
                        splitNumber: 2,
                        splitLine: { show: false },
                        axisLine: {
                            show: false,
                            lineStyle: { color: "#f7931a" }
                        },
                        axisTick: { show: false },
                        axisLabel: {
                            inside: true,
                            formatter: "{value}\n"
                        },
                        // min: 0,
                        position: "left",
                        offset: 35
                    },
                    {
                        name: "价格（BTC）",
                        nameLocation: "middle",
                        nameGap: -5,
                        nameRotate: -90,
                        scale: true,
                        splitNumber: 2,
                        splitLine: { show: false },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#ef232a"
                            }
                        },
                        axisTick: { show: false },
                        axisLabel: {
                            inside: true,
                            formatter: "{value}\n"
                        },
                        // min: 0,
                        position: "right",
                        offset: 120
                    },
                    {
                        name: "价格（美元）",
                        nameLocation: "middle",
                        nameGap: -5,
                        nameRotate: -90,
                        scale: true,
                        splitNumber: 2,
                        splitLine: { show: true },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#009933"
                            }
                        },
                        axisTick: { show: false },
                        axisLabel: {
                            inside: true,
                            formatter: "{value}\n"
                        },
                        // min: 0,
                        position: "right",
                        offset: 45
                    },
                    {
                        name: "24h成交量",
                        nameLocation: "middle",
                        nameGap: 30,
                        nameTextStyle: {
                            color: "#777"
                        },
                        scale: true,
                        gridIndex: 1,
                        splitNumber: 2,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#dcdcdc"
                            }
                        },
                        axisLabel: { show: false },
                        axisTick: { show: false },
                        splitLine: { show: false }
                    }
                ],
                grid: [
                    {
                        left: 50,
                        right: 130,
                        top: 20,
                        height: 240
                    },
                    {
                        left: 50,
                        right: 130,
                        height: 60,
                        top: 260
                    }
                ],
                series: [
                    {
                        name: "24h成交量",
                        type: "bar",
                        data: this.tradingVolume,
                        xAxisIndex: 1,
                        yAxisIndex: 3,
                        itemStyle: {
                            normal: {
                                color: "#777777"
                            },
                            emphasis: {
                                color: "#140"
                            }
                        }
                    },
                    {
                        name: "流通市值(亿)",
                        type: "line",
                        data: this.circulationMarketValue,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#f7931a",
                                borderColor: "##f7931a",
                                color0: "#f8a138",
                                borderColor0: "#f8a138"
                            }
                        }
                    },
                    {
                        name: "价格（BTC）",
                        type: "line",
                        yAxisIndex: 1,
                        data: this.dollarPrice,
                        itemStyle: {
                            normal: {
                                color: "#ef232a",
                                color0: "#14b143",
                                borderColor: "#ef232a",
                                borderColor0: "#14b143"
                            }
                            // emphasis: {
                            //   color: "black",
                            //   color0: "#444",
                            //   borderColor: "black",
                            //   borderColor0: "#444"
                            // }
                        }
                    },
                    {
                        name: "价格（美元）",
                        type: "line",
                        yAxisIndex: 2,
                        data: this.BTCPrice,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#009933",
                                borderColor: "#009933"
                            }
                        }
                    }
                ]
            });
        },
        price(item) {
            if (item > 99999999) {
                return `${Number(
                    (item / 100000000).toFixed(2)
                ).toLocaleString()}亿`;
            } else {
                return `${Number(
                    (item / 10000).toFixed(2)
                ).toLocaleString()}万`;
            }
        }
    }
};
</script>
