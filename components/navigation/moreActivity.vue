<template>
    <div>
        <section class="activity">
            <nuxt-link :to="'/navigation/navActivityDetail/'+actId" class="toDetail">
                <div class="box">
                    <img :src="''+actImg" :onerror="actImgDefault" alt="">
                    <div v-if="new Date(Date.parse((timelet +'-'+actDate.substr(actDate.length-6).replace('月','-').replace('日','')).replace(/-/g,'/'))).valueOf()>=new Date().valueOf()" class="state">{{actState}}</div>
                </div>
                <p>{{actTitle}}</p>
                <span class="activitytitle">{{actAddress}}&nbsp;&nbsp;
                    <i>{{actDate}}</i>
                </span>
                <a v-if="new Date(Date.parse((timelet +'-'+actDate.substr(actDate.length-6).replace('月','-').replace('日','')).replace(/-/g,'/'))).valueOf()>=new Date().valueOf()" href="#" class="apply">报名</a>
            </nuxt-link>
        </section>
    </div>
</template>
<style scoped>
.activity {
    width: 290px;
    height: 312px;
    position: relative;
    text-align: left;
}

.activity .toDetail {
    display: block;
    width: 100%;
    height: 100%;
}

.activity .box {
    width: 100%;
    height: 185px;
    margin-bottom: 18px;
    border-radius: 8px;
    overflow: hidden;
}

.activity img {
    width: 100%;
    height: 185px;
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

.activity p {
    /* display: inline-block; */
    width: 100%;
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
    margin-top: 25px;
}

.activity .apply {
    display: block;
    position: absolute;
    width: 80px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    bottom: 50px;
    right: 0;
    border-radius: 28px;
    color: #f25a36;
    border: 1px solid #f25a36;
}

.activity .apply:hover {
    background-color: #f25a36;
    color: #fff;
}
.activity .activitytitle {
    width: 68%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
<script>
export default {
    name: "moreActivity",
    props: ["eventName", "eventTime", "eventAddress", "eventId", "eventImg"],
    data() {
        return {
            actImgDefault:
                'this.src="' +
                require("~/static/images/moreactivity-default.jpg") +
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
        this.timelet = new Date().getFullYear();
    }
};
</script>