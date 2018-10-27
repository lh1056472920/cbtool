<template>
	<div class="banner">
		<ul class="banner-list">
			<!-- <li class="banner-item" v-for="(item, i) in list" :key="i">
				<a @click="computedBanner(item.bannerUrl)" style="cursor: pointer;" target="_blank">
					<img :src="`${item.bannerImage}`" :onerror="actImgDefault" :alt="item.bannerName">
					<p :id="item.bannerUrl" class="masking"></p>
				</a>
				<span>广告</span>
			</li> -->
			<li class="banner-item" >
				<a @click="computedBanner('http://biyong.sg')" style="cursor: pointer;" target="_blank">
					<img src="http://tokenpe.pub/images/zxdhimg/lian2345biyong.jpg" :onerror="actImgDefault" >
					<p class="masking"></p>
				</a>
				<span>广告</span>
			</li>
			<li class="banner-item" >
				<a @click="computedBanner('https://hbg.com')" style="cursor: pointer;" target="_blank">
					<img src="http://tokenpe.pub/images/zxdhimg/火币.jpg" :onerror="actImgDefault" >
					<p class="masking"></p>
				</a>
				<span>广告</span>
			</li>
			<li class="banner-item" >
				<a @click="computedBanner('http://app.mi.com')" style="cursor: pointer;" target="_blank">
					<img src="http://tokenpe.pub/images/zxdhimg/lianytfqb.jpg" :onerror="actImgDefault" >
					<p class="masking"></p>
				</a>
				<span>广告</span>
			</li>
			<li class="banner-item" >
				<a @click="computedBanner('http://okex.com')" style="cursor: pointer;" target="_blank">
					<img src="http://tokenpe.pub/images/zxdhimg/ok.jpg" :onerror="actImgDefault" >
					<p class="masking"></p>
				</a>
				<span>广告</span>
			</li>
			<li class="banner-item" >
				<a @click="computedBanner('https://token.im')" style="cursor: pointer;" target="_blank">
					<img src="http://tokenpe.pub/images/zxdhimg/lianbanner.jpg" :onerror="actImgDefault" >
					<p class="masking"></p>
				</a>
				<span>广告</span>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from "axios";
export default {
    name: "banner",
    props: {
        list: Array
    },
    data() {
        return {
            actImgDefault:
                'this.src="' + require("~/static/images/banner.jpg") + '"'
        };
    },
    methods: {
        computedBanner(url) {
            _czc.push(["_trackEvent", "首页广告", "点击跳转", url]);
            window.open(url);
        }
    }
};
</script>

<style scoped>
.banner {
    text-align: center;
}

.banner-list {
    width: 1200px;
    margin: auto;
    
    display: -ms-flexbox;
    display: flex;display: -moz-box;display: -webkit-flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.banner-item {
    display: block;
    border-radius: 8px;
    position: relative;
}

.banner-item a,
.banner-item img {
    display: block;
    width: 228px;
    height: 80px;
    border-radius: 8px;
}

span {
    display: block;
    position: absolute;
    width: 42px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    bottom: 5px;
    left: 5px;
    color: #fff;
    font-size: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
}

.masking {
    position: absolute;
    top: 0;
    left: 0;
    width: 228px;
    height: 80px;
    display: none;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.5);
}

.banner-item:hover .masking {
    display: block;
}
</style>
