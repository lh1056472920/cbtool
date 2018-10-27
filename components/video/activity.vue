<template>
    <div>
        <section class="activity">
            <div class="box">
                <nuxt-link :to="'/navigation/navActivityDetail/'+actId">
                    <img :src="''+actImg" :onerror="actImgDefault" alt="">
                </nuxt-link>
                <div v-if="new Date(Date.parse((timelet +'-'+actDate.substr(actDate.length-6).replace('月','-').replace('日','')).replace(/-/g,'/'))).valueOf()>=new Date().valueOf()" class="state">{{actState}}</div>
            </div>
            <nuxt-link :to="'/navigation/navActivityDetail/'+actId">{{actTitle}}</nuxt-link>
            <span>{{actAddress}}&nbsp;&nbsp;
                <i>{{actDate}}</i>
            </span>
        </section>
    </div>
</template>
<style scoped>
.activity {
    width: 100%;
    position: relative;
    text-align: left;
}

.activity .box {
    width: 100%;
    height: 185px;
    margin-bottom: 18px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #eaeaea;
}

.activity img {
    width: 100%;
    height: 185px;
    margin-bottom: 18px;
}

.activity .state {
    width: 121px;
    height: 29px;
    text-align: center;
    line-height: 29px;
    color: #fff;
    font-size: 14px;
    border-radius: 0 0 12px 12px;
    position: absolute;
    top: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #f25a36;
}

.activity a {
    width: 100%;
    display: inline-block;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.activity a:hover {
    color: #f25a36;
}

.activity span {
    display: block;
    font-size: 11px;
    color: #a6a6a6;
    margin: 11px 0 19px 0;
}
</style>

<script>
export default {
    name: "activity",
    props: ["eventName", "eventTime", "eventAddress", "eventId", "eventImg"],
    data() {
        return {
            actImgDefault:
                'this.src="' +
                require("~/static/images/默认图_首页_活动.jpg") +
                '"',
            actImg: "",
            actState: "报名中",
            actTitle: "纽约世界区块链大会·三点钟峰会",
            actAddress: "新加坡",
            actDate: "5月7日-06月01日",
            actId: "",
            timelet: ""
        };
    },
    created() {
        (this.actTitle = this.eventName),
            (this.actDate = this.eventTime),
            (this.actAddress = this.eventAddress),
            (this.actId = this.eventId),
            (this.actImg = this.eventImg);
            this.timelet=new Date().getFullYear()
    }
};
</script>