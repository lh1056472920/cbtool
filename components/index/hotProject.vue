<template>
  <div class="hotProject">
    <hr class="separate">
    <h2>热门项目</h2>
    <hr class="dotted">
    <ul class="label-list">
      <li v-for="(item, i) in list" :key="i">
        <nuxt-link :to="'quotation/quotationDetail/name='+item.name+'&code='+item.code.split(' ')[0]+'&id=coin'">
          <img :src="``+item.image" :onerror="actImgDefault">
          <div>
            <span class="title">{{item.englishName}}&nbsp;&nbsp;{{item.chineseName}}</span>
            <div class="label" v-html="item.projectIntroduction"></div>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <button class="btn-more" @click="toMoreProject">更多项目</button>
  </div>
</template>
<style>
.hotProject h2 {
    font-size: 16px;
    padding: 22px 0;
}

.hotProject .label-list {
    margin-top: 25px;
}

ul,
li {
    list-style: none;
}

.hotProject a {
    
    display: -ms-flexbox;
    display: flex;display: -moz-box;display: -webkit-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 18px;
    width: 100%;
}

.hotProject a > div {
    /* height: 60px; */
    margin-left: 14px;
    text-align: left;
}

.hotProject a img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.hotProject a p {
    margin-top: 11px;
    text-align: left;
}

.hotProject .title {
    font-size: 14px;
    color: #404040;
}

.hotProject a:hover .title {
    color: #f25a36;
}

.hotProject a:hover img {
    -webkit-animation: rotate 1s ease-in;
    animation: rotate 1s ease-in;
}

@-webkit-keyframes rotate {
    0% {
        -webkit-transform: rotateZ(0);
        transform: rotateZ(0);
    }
    50% {
        -webkit-transform: rotateZ(180deg);
        transform: rotateZ(180deg);
    }
    100% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
    }
}

@keyframes rotate {
    0% {
        -webkit-transform: rotateZ(0);
        transform: rotateZ(0);
    }
    50% {
        -webkit-transform: rotateZ(180deg);
        transform: rotateZ(180deg);
    }
    100% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
    }
}
.hotProject .label {
    width: 240px;
    font-size: 12px;
    color: #a6a6a6;
    height: 34px;
    overflow: hidden;
}

.hotProject .label > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.hotProject .btn-more {
    margin-top: 20px;
    cursor: pointer;
}

.hotProject .btn-more:hover {
    background-color: #f25a36;
    color: #fff;
}
</style>
<script>
export default {
    name: "hotProject",
    props: {
        list: Array
    },
    data() {
        return {
            projectList: [
                {
                    title: "Ripple 瑞波币",
                    label: "瑞波币是ripple网络的基础货币",
                    img: "~/static/images/f-contact-wx-h.png"
                },
                {
                    title: "Ripple 瑞波币最多一行最多一行",
                    label: "瑞波币是ripple网络的基础货币最多一行yi...",
                    img: "~/static/images/f-contact-wx-h.png"
                },
                {
                    title: "比特币",
                    label: "比特币",
                    img: "~/static/images/f-contact-wx-h.png"
                }
            ],
            actImgDefault:
                'this.src="' +
                require("~/static/images/默认图_首页_热门项目.jpg") +
                '"'
        };
    },
    methods: {
        toMoreProject() {
            _czc.push(["_trackEvent", "首页热门项目", "点击更多项目"]);
            this.$router.push({
                path: "/coin"
            });
        }
    }
};
</script>
