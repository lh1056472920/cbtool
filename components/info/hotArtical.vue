<template>
    <div>
        <div class="hotArtical-info-list">
            <div class="info-img">
                <img class="info-list-img" :src="`${articleImage}`" :onerror="actImgDefault" alt="">
            </div>
            <p>{{articleName}}</p>
        </div>
    </div>
</template>
<style scoped>
.hotArtical-info-list {
    width: 100%;
    height: 90px;
    padding: 9px 0;
    
    display: -ms-flexbox;
    display: flex;display: -moz-box;display: -webkit-flex;
    /* align-items: center; */
    cursor: pointer;
}

.hotArtical-info-list:hover {
    background-color: #f8f8f8;
}

.hotArtical-info-list:hover p {
    color: #f25a36;
}

.info-img {
    width: 144px;
    height: 90px;
    margin-right: 12px;
    border-radius: 8px;
    overflow: hidden;
}

.info-img .info-list-img {
    width: 100%;
    height: 100%;
}

.hotArtical-info-list p {
    color: #404040;
    font-size: 14px;
    width: 167px;
    line-height: 22px;
}
</style>
<script>
export default {
    props: ["articleImage", "articleId", "articleName"],
    data() {
        return {
            actImgDefault:
                'this.src="' +
                require("~/static/images/默认图_首页_热门视频.jpg") +
                '"'
        };
    }
};
</script>