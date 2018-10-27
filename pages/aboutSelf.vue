<template>
    <div class="aboutSelf-page">
        <hr class="separate">
        <div class="header">
            <nav>
                <a :class="{active: active==='article'}" @click.stop.prevent="clickItem('article')">关于我们</a>
                <a :class="{active: active==='info'}" @click.stop.prevent="clickItem('info')">服务条款</a>
                <a :class="{active: active==='project'}" @click.stop.prevent="clickItem('project')">联系我们</a>
                <a :class="{active: active==='video'}" @click.stop.prevent="clickItem('video')">意见反馈</a>
            </nav>
        </div>
        <hr class="dotted">
        <div class="info-list" v-show="active==='article'">
            <br>lian2345是集行业新闻、资讯、行情、人物、视频、数据、导航等一站式区块链产业服务平台，我们追求及时、全面、专业、准确的资讯与数据，致力于为区块链创业者以及数字货币投资者提供最好的产品和服务,lian2345与行业区块链及各服务平台形成创新动力，共同推进区块链相关应用的发展，为行业构建更加健康的服务创新发展环境，建立一个良好的区块链生态圈，将lian2345打造成为区块链行业发展的风向。
        </div>
        <div class="info-list" v-show="active==='info'">
            <br> 一：本网站（www.lian2345.com）所有内容，凡注明"来源：lian2345"的所有文字、图片和音视频资料，版权均属开普勒金融（深圳）有限公司 所有，任何媒体、网站或个人未经本网协议授权不得转载、转贴或以其他方式复制发布/发表。已经本网协议授权的媒体、网站，在下载使用时 必须注明"稿件来源：lian2345"，违者本网将依法追究责任。 凡本网注明"来源：非本网的文/图等稿件，本网转载出于传递更多信息为目的，并 不等同赞同其观点或证实其内容的真实性。<br><br> 二：除注明"来源：lian2345（频道）"的内容外，本网以下内容亦不可任意转载： <br>1、本网所指向的非本网内容的相关链接内容； <br>2、已作出不得转载或未经许可不得转载声明的内容； <br>3、未由本网署名或本网引用、转载的他人作品等非本网版权内容； <br>4、本网中特有的图形、标志、页面风格、编排方式、程序等； <br>5、本网中必须具有特别授权或具有注册用户资格方可知晓的内容； <br>6、其他法律不允许或本网认为不适合转载的内容。 <br><br>三：转载或引用本网内容必须是以新闻性或资料性公共免费信息为使用目的的合理、善意引用，不得对本网内容原意进行曲解、修改，同时必须 保留本网注明的"稿件来源"，并自负版权等法律责任。 <br><br>四：转载或引用本网内容不得进行如下活动： <br>1、损害本网或他人利益； <br>2、任何违法行为； <br>3、任何可能破坏公秩良俗的行为； <br>4、擅自同意他人继续转载、引用本网内容；<br><br> 五：转载或引用本网版权所有内容须注明“转自（或引自）lian2345”字样，并标明本网网址www.lian2345.com。 <br><br>六：转载或引用本网中的署名文章，请按规定向作者申请授权。<br><br> 七：对于不当转载或引用本网内容而引起的民事纷争、行政处理或其他损失，本网不承担责任。<br><br> 八：本网以“授权许可”方式使用作品，已与知识产权所有者申请授权使用。如有未尽事宜请相关权利人直接与本网商务官方联系， 联系微信为：<br><br>九：对不遵守本声明或其他违法、恶意使用本网内容者，本网保留追究其法律责任的权利。
        </div>
        <div class="info-list" v-show="active==='project'">
            <br>客服微信： lian2345_com
            <br><br> 客服qq： 79169341
            <br><br> 客服邮箱： 79169341@qq.com
            <br><br> 商务合作微信：lian2345_com
        </div>
        <div class="info-list" v-show="active==='video'">
            <br>亲爱的用户，您好！
            <br> 如果你有意见反馈可以将反馈信息发送到邮箱：79169341@qq.com，
            <br> 欢迎随时勾搭客服妹子QQ（79169341）
        </div>
    </div>
</template>

<script>
export default {
    name: "search",
    data() {
        return {
            active: "article"
            // watchactive:'',
        };
    },
    watch: {
        // clickItem(){
        //     this.$route.query.active
        // }
    },
    created() {
        if (this.$route.query.active == 1) {
            this.active = "article";
        } else if (this.$route.query.active == 2) {
            this.active = "info";
        } else if (this.$route.query.active == 3) {
            this.active = "project";
        } else if (this.$route.query.active == 4) {
            this.active = "video";
        }
        this.clickItem(this.active);
    },
    methods: {
        clickItem(active) {
            // console.log(this.active);
            this.active = active;
        }
    }
};
</script>

<style scoped>
.aboutSelf-page {
    width: 1200px;
    margin: 15px auto;
}

.header {
    
    display: -ms-flexbox;
    display: flex;display: -moz-box;display: -webkit-flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

/* .dotted {
    border: 700;
    background: #f25a36;
} */
nav {
    width: 650px;
    height: 60px;
    font-size: 14px;
    color: #404040;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

nav a {
    padding: 15px;
    color: #404040;
    text-decoration: none;
}

nav a.active {
    color: #f25a36;
    border-bottom: #f25a36 solid 2px;
}

.info-list {
    color: #404040;
    font-size: 16px;
    line-height: 30px;
    min-height: 400px;
}
</style>