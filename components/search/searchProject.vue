<template>
  <div>
    <nuxt-link :to="'quotation/quotationDetail/name='+name+'&code='+code.split(' ')[0]+'&id=coin'" class="coinlist-list">
      <div class="coinlist-img">
        <img class="coinlist-list-img" :src="`${image}`" :onerror="actImgDefault" alt="">
      </div>
      <div class="coinlist-describe">
        <div class="coinlist-describe-title">
            <!-- v-if="chineseName" v-html="chineseName&&chineseName.replace(new RegExp(Text,'g'), `<span style=\'color: #f25a36;\'>${Text}</span>`)" -->
          <span class="coinlist-list-describe-title" >{{name}}/{{chineseName}}
          </span>
          <span class="coinlist-list-describe-introduce" v-html="projectIntroduction">
          </span>
          <span class="coinlist-describe-content">
            <span class="yuan"></span>{{code}}
          </span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<style scoped>
.coinlist-list {
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    width: 392px;
    float: left;
    height: 150px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 12px;
    margin-top: 12px;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    background-color: #f9fafb;
    cursor: pointer;
}

.coinlist-list:hover {
    -webkit-box-shadow: 0 0 6px 0 #404040;
    box-shadow: 0 0 6px 0 #404040;
    background-color: #fff;
}

.coinlist-img {
  display: inline-block;
  width: 148px;
    height: 100%;
    cursor: pointer;
    margin-right: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.coinlist-img .coinlist-list-img {
    width: 148px;
    height: 100%;
}

.coinlist-describe {
  width: 210px;
  height: 120px;
  display: inline-block;
  vertical-align: top;
    padding: 15px;
    position: relative;
    overflow: hidden;
    text-align: left;
}

.coinlist-list-describe-title {
    display: block;
    color: #404040;
    font-size: 14px;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    cursor: pointer;
}

.coinlist-list-describe-introduce {
    font-size: 12px;
    color: #a6a6a6;
    line-height: 22px;
    height: 84px;
    overflow: hidden;
    display: block;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
}

.coinlist-describe-content {
    position: absolute;
    bottom: 5px;
    display: block;
    color: #a6a6a6;
    font-size: 12px;
}

.coinlist-describe-content .yuan {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: #f25a36;
    margin-right: 10px;
}
</style>

<script>
export default {
    props: [
        "image",
        "chineseName",
        "projectIntroduction",
        "code",
        "name",
        "Text"
    ],
    data() {
        return {
            actImgDefault:
                'this.src="' + require("~/static/images/coin-default.jpg") + '"'
        };
    }
};
</script>