<template>
    <div class="quotation-list-page">
    	<h2>{{title[type]}}</h2>
    	<table>
    		<thead>
    			<tr>
    				<th></th>
    				<th>币种</th>
    				<th>价格(￥)</th>
    				<th v-if="type!=='deal'">涨幅(24h)</th>
    				<th v-if="type==='deal'">成交额</th>
    			</tr>
    		</thead>
    		<tbody>
    			<tr v-for="(item, i) in list" :key="i">
    				<td class="index"><span>{{++i}}</span></td>
    				<td><nuxt-link :to="'quotation/quotationDetail/name='+item.name+'&code='+item.code.split(' ')[0]+'&id=quotation'">{{item.name}}</nuxt-link></td>
    				<td style="color:#E20C18" v-if="item.change_percent<0">￥{{price(item)}}</td>
    				<td style="color:#41A14F" v-if="item.change_percent>=0">￥{{price(item)}}</td>
    				<!-- <td style="color:#41A14F" v-if="type!=='deal'">￥{{price(item)}}</td> -->
    				<td :style="changeStyle(item.change_percent)" v-if="type!=='deal'&&item.change_percent<0">{{item.change_percent}}%</td>
    				<td :style="changeStyle(item.change_percent)" v-if="type!=='deal'&&item.change_percent>=0">+{{item.change_percent}}%</td>
    				<td class="turnover" v-if="type==='deal'">{{(item.vol/10000).toFixed(2)}}万</td>
    			</tr>
    		</tbody>
    	</table>
        <no-msg :list="list"></no-msg>
    </div>
</template>

<script>
import noMsg from '~/components/noMsg/noMsg.vue';
export default {
	name: 'quotationList',
	props: {
		type: {
			type: String,
			required: true,
			validator: value => {
	        	return ['increase', 'declines', 'deal'].indexOf(value) !== -1
	      	}
      	},
      	list: Array
	},
    components: {
        noMsg
    },
	data () {
		return {
			increase: [
				{ coin: 'BTC-比特币', price: '¥52,893', change: '+55.83%' },
				{ coin: 'ETH-以太坊', price: '¥4,487', change: '+39.92%' },
				{ coin: 'EOS-柚子', price: '¥4.44', change: '+11.21%' },
				{ coin: 'LTC-莱特币', price: '¥84.26', change: '+9.24%' },
				{ coin: 'ADA-艾达币', price: '¥881', change: '+9.02%' },
			],
			declines: [
				{ coin: 'BTC-比特币', price: '¥52,893', change: '-55.83%' },
				{ coin: 'ETH-以太坊', price: '¥4,487', change: '-39.92%' },
				{ coin: 'EOS-柚子', price: '¥4.44', change: '-11.21%' },
				{ coin: 'LTC-莱特币', price: '¥84.26', change: '-9.24%' },
				{ coin: 'ADA-艾达币', price: '¥881', change: '-9.02%' },
			],
			deal: [
				{ coin: 'BTC-比特币', price: '¥52,893', turnover: '¥181,499万' },
				{ coin: 'ETH-以太坊', price: '¥4,487', turnover: '¥158,542万' },
				{ coin: 'EOS-柚子', price: '¥4.44', turnover: '¥129,133万' },
				{ coin: 'LTC-莱特币', price: '¥84.26', turnover: '¥84,415万' },
				{ coin: 'ADA-艾达币', price: '¥881', turnover: '¥80,506万' },
			],
			title: {
				increase: '24h涨幅榜',
				declines: '24h跌幅榜',
				deal: '24h成交榜'
			}
		}
	},
	methods: {
		changeStyle (change) {
			if (change >= 0) {
				return { color: '#41A14F' }
			}
			return { color: '#E20C18' }
		},
		price(item){
			if (item.current_price<1) {
				return item.current_price.toFixed(5)
			}else if(100>item.current_price>=1){
				return item.current_price.toFixed(3)
			}else if(item.current_price>=100){
				return item.current_price.toFixed(1)
			}
		}
	}
}
</script>

<style scoped>
	.quotation-list-page {
  background-color: #FFF; }

h2 {
  margin: 0px 0 29px;
	padding-top: 21px;
  font-size: 18px;
  color: #404040;
  text-align: center; }

table {
  width: 100%; }

th {
  height: 30px;
  font-weight: 100;
  font-size: 14px;
  color: #A6A6A6;
  vertical-align: middle; }

th:first-child {
  width: 64px; }

th:nth-child(2) {
  width: 90px; }

th:nth-child(3) {
  width: 108px; }

th:last-child {
  width: 130px; }

tbody tr {
  height: 42px; }

td {
  font-size: 14px;
  vertical-align: middle;
  color: #595959; }

td.index span {
  font-size: 12px;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  color: #FFF;
  background-color: #F25A36; }

.turnover {
  color: #41A14F; }

a:hover {
  color: #F25A36; }

</style>
