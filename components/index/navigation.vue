<template>
	<div>
		<hr class="separate">
		<h2>区块链导航</h2>
		<hr class="dotted">
		<ul class="navigation-list">
			<li v-for="(item, i) in list.subCategoryList" :key="i">
				<h3>{{item.categoryName}}</h3>
				<ul class="item-list">
					<li v-if="i<7" v-for="(subitem, i) in list.resultMaps[item.categoryId]" :key="i">
						<a :href="subitem.blockchainUrl" target="_blank">{{subitem.blockchainName}}</a>
					</li>
				</ul>
			</li>
		</ul>
		<button class="btn-more" @click="toMoreNav">更多导航</button>
	</div>
</template>

<script>
import axios from "~/plugins/axios.js";
export default {
    name: "navigation",
    props: {
        list: Object
    },
    data() {
        return {
            // navigationList: [
            // 	{ title: '入门简介', items: ['交易所', '钱包', '视频', '糖果', '比特币指南', '比特币常见问题', '白皮书']},
            // 	{ title: '交易所', items: ['比特儿', '火币', '币安', '糖果', 'gate.io', 'OKcoin', 'OTC']},
            // 	{ title: '钱包', items: ['atoken', '钱包', 'btc钱包', '开普勒', 'EOS走势', 'BTC钱包', '全币种钱包']},
            // ]
        };
    },
    methods: {
        toMoreNav() {
            _czc.push(["_trackEvent", "首页区块链导航", "点击更多导航"]);
            this.$router.push({
                path: "/navigation"
            });
        }
    }
};
</script>
<style scoped>
h2 {
    font-size: 16px;
    padding: 22px 0;
}

.navigation-list {
    margin-top: 20px;
}

.navigation-list li {
    list-style-position: inside;
    text-align: left;
    color: #f25a36;
    margin-bottom: 30px;
}

.navigation-list li h3 {
    font-weight: bold;
    display: inline-block;
    font-size: 14px;
    color: #404040;
}

.item-list {
    
   /* height: 150px; */
    margin: 8px 0;
}

.item-list li {
    /* float: left; */
    display: inline-block;
    margin: 28px 12px 0 0;
}

a {
    /* display: block; */
    font-size: 12px;
    border: #d9d9d9 solid 1px;
    border-radius: 17px;
    padding: 8px 18px;
    color: #595959;
    box-sizing: border-box;
}

a:hover {
    color: #fff;
    background-color: #f25a36;
    border: #f25a36 solid 1px;
}

.btn-more {
    margin-top: 20px;
    cursor: pointer;
}

.btn-more:hover {
    background-color: #f25a36;
    color: #fff;
}
</style>