<template>
    <div>
        <div class='quickView'>
            <!-- <nuxt-link :to="'/video/videoDetail/'+id"> -->
                <img :src="imageUrl" :onerror="actImgDefault" alt="">
                <span>{{duration}}</span>
                <div class="screen">
                    <i class="iconfont icon-shipin"></i>
                </div>
            <!-- </nuxt-link> -->
        </div>
    </div>
</template>

<style scoped>

.quickView {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden; }

.quickView img {
  width: 100%;
  height: 100%; }

.quickView span {
  display: block;
  position: absolute;
  bottom: 11px;
  left: 7px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 0 5px;
  font-size: 10px; }

.quickView .screen {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: none;
  position: absolute;
  left: 0;
  top: 0; }

.quickView:hover .screen {
  display: block; }

.quickView .screen i.iconfont {
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%); }

</style>

<script>
    export default {
        name:'quickView',
        props:['videoId','videoImg','videoDuration'],
        data(){
            return {
                actImgDefault:'this.src="'+require('~/static/images/video-big.jpg')+'"',
                imageUrl:'',
                duration:'00:05',
                id:''
            }
        },
        created(){
            this.imageUrl =''+this.videoImg,
            this.id = this.videoId
            this.changeDuration()
        },
        methods:{
            changeDuration(){
                
                // if(this.videoDuration.indexOf('：')!= -1){
                //     this.duration = this.videoDuration.split('：')[0]+':'+this.videoDuration.split('：')[1]
                // }else {
                // }
                    this.duration = this.videoDuration

            }
        }
    }
</script>