<template>
    <div>
        <div class="platform">
            <a class="pfUrl" :href="pfUrl" target="_blank">
                <img :src="pfImg" :onerror="actImgDefault" alt="">
                <div>
                    <p class="pfName">{{pfName}}</p>
                    <span>{{pfDescript}}</span>
                </div>
            </a>
        </div>
    </div>
</template>
<style scoped>
div {
    display: inline-block;
}
.platform {
    display: inline-block;

    /* float: left; */
    width: 190px;
    height: 120px;
    position: relative;
}

.platform a.pfUrl {
    display: block;
    width: 100%;
    height: 100%;
}

.platform img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    margin-top: 12px;
    z-index: 3;
    position: relative;
    -webkit-box-shadow: 0 2px 2px 2px rgba(64, 64, 64, 0.3);
    box-shadow: 0 2px 2px 2px rgba(64, 64, 64, 0.3);
}

.platform img:hover {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
}

.platform div {
    width: 100%;
    height: 42px;
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    background-color: #f9fafb;
    padding: 33px 0 15px 0;
    margin-top: 30px;
}

.platform div:hover {
    background-color: #f0f3fb;
    -webkit-box-shadow: 0px 5px 5px rgba(64, 64, 64, 0.3);
    box-shadow: 0px 5px 5px rgba(64, 64, 64, 0.3);
}

.platform div p.pfName {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-bottom: 12px;
}
.platform div span {
    width: 87%;
    margin: 0 auto;
    display: block;
    height: 14px;
    font-size: 14px;
    color: #a6a6a6;
    font-style: normal;
    font-weight: 100;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
}
</style>
<script>
export default {
    name: "platform",
    props: [
        "blockchainName",
        "blockchainUrl",
        "blockchainKeyword",
        "blockchainIcon"
    ],
    data() {
        return {
            pfImg: "",
            pfName: "火币网",
            pfDescript: "比特币交易平台",
            pfUrl: "",
            actImgDefault:
                'this.src="' + require("~/static/images/nav-via.jpg") + '"'
        };
    },
    created() {
        (this.pfName = this.blockchainName),
            (this.pfDescript = this.blockchainKeyword),
            (this.pfUrl = this.blockchainUrl),
            (this.pfImg =
                "" + this.blockchainIcon);
    }
};
</script>