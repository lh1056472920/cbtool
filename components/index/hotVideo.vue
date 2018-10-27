<template>
    <div>
        <hr class="separate">
        <h2>热门视频</h2>
        <hr class="dotted">
        <div class="label-list">
            <nuxt-link v-if="i<6" class="toMoreVideo" :to="'/video/videoDetail/'+item.videoId" v-for="(item, i) in list" :key="i">
                <div class="l-side">
                    <!-- <quickView :video-id="item.videoId" :video-img="item.videoImage"></quickView> -->
                    <!-- <nuxt-child/> -->
                    <div class='quickView'>
                        <!-- <nuxt-link :to="'/video/videoDetail/'+id"> -->
                        <img :src="`` + item.videoImage" :onerror="actImgDefault" alt="">
                        <span v-if="item.column13">{{item.column13.split('：')[0]+':'+item.column13.split('：')[1]}}</span>
                        <div class="screen">
                            <i class="iconfont icon-shipin"></i>
                        </div>
                        <!-- </nuxt-link> -->
                    </div>
                </div>
                <div class="r-side">
                    <p>{{item.videoName}}</p>
                </div>
            </nuxt-link>
        </div>
        <button class="btn-more" @click="clickBtn">更多视频</button>

    </div>

</template>

<script>
export default {
    props: {
        list: Array
    },
    data() {
        return {
            actImgDefault:
                'this.src="' +
                require("~/static/images/默认图_首页_热门视频.jpg") +
                '"'
        };
    },
    methods: {
        clickBtn() {
            _czc.push(["_trackEvent", "热门视频", "点击更多视频"]);
            this.$router.push({
                path: "/video/moreVideo/" + 10
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

.video {
    width: 144px;
    height: 90px;
}

a {
    display: block;
}

a.toMoreVideo {
    padding: 9px 0;
    width: 330px;
    height: 108px;
    
    display: -ms-flexbox;
    display: flex;display: -moz-box;display: -webkit-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

a.toMoreVideo:first-child {
    margin-top: 20px;
}

a.toMoreVideo:hover {
    background-color: #f8f8f8;
}

a.toMoreVideo:hover .r-side p {
    color: #f25a36;
}

.l-side {
    width: 144px;
    height: 90px;
    margin-right: 12px;
    position: relative;
}

.l-side > div {
    width: 100%;
    height: 100%;
}

.r-side {
    width: 167px;
}

.r-side p {
    font-size: 14px;
    line-height: 22px;
    color: #404040;
    text-align: left;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.btn-more {
    margin-top: 20px;
    cursor: pointer;
}

.btn-more:hover {
    background-color: #f25a36;
    color: #fff;
}

.quickView {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.quickView img {
    width: 100%;
    height: 100%;
}

.quickView span {
    display: block;
    position: absolute;
    bottom: 11px;
    left: 7px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 0 5px;
    font-size: 10px;
}

.quickView .screen {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: none;
    position: absolute;
    left: 0;
    top: 0;
}

.quickView:hover .screen {
    display: block;
}

.quickView .screen i.iconfont {
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>