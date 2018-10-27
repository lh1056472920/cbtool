<template>
    <div>
        <div class="personage">
            <nuxt-link :to="'/navigation/navPersonDetail/'+psId">
                <img :src="psImg" :onerror="actImgDefault" alt="">
                <div>
                    <p class="psName">{{psName}}</p>
                    <i>{{psDescript}}</i>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>
<style scoped>
.personage {
    float: left;
    width: 190px;
    height: 120px;
    position: relative;
}

.personage a {
    display: block;
    width: 100%;
    height: 100%;
}

.personage img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    margin-top: 12px;
    z-index: 3;
    position: relative;
}

.personage img:hover {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
}

.personage div {
    width: 100%;
    height: 90px;
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    background-color: #f9fafb;
}

.personage div:hover {
    background-color: #f0f3fb;
    -webkit-box-shadow: 0px 5px 5px rgba(64, 64, 64, 0.3);
    box-shadow: 0px 5px 5px rgba(64, 64, 64, 0.3);
}

.personage div p.psName {
    width: 100%;
    height: 39px;
    text-align: center;
    line-height: 39px;
    font-size: 16px;
    margin: 18px 0 0 0;
}

.personage div i {
    font-size: 14px;
    color: #a6a6a6;
    font-style: normal;
}
</style>
<script>
export default {
    name: "platform",
    props: ["personageId", "personageName", "personageNameb", "personageImage"],
    data() {
        return {
            actImgDefault:
                'this.src="' + require("~/static/images/nav-via.jpg") + '"',
            psImg: "",
            psName: "",
            psDescript: "",
            psId: ""
        };
    },
    created() {
        (this.psImg =
            "" + this.personageImage),
            (this.psName = this.personageName),
            (this.psDescript = this.personageNameb),
            (this.psId = this.personageId);
    }
};
</script>