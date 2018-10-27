<template>
  <div>
    <div class="loop">
      <nuxt-link :to="{path:'/info/informationmore',query: {id: articleId,active:categoryId}}">

        <div class="info-img">
          <img class="info-list-img" :src="`${articleImage}`" :onerror="actImgDefault" alt="">
          <span class="info-img-one" v-if="active === 'info'">资讯</span>
          <span class="info-img-one" v-if="active === 'article'">文章</span>
        </div>
        <div class="info-describe">
          <div class="info-describe-title">
            <span class="info-list-describe-title" v-if="articleName" v-html="articleName && articleName.replace(new RegExp(Text,'g'), `<span style=\'color: #f25a36;\'>${Text}</span>`)">{{articleName}}
            </span>
            <span class="info-describe-content" v-if="articleKeyword" v-html="articleKeyword && articleKeyword.replace(new RegExp(Text,'g'), `<span style=\'color: #f25a36;\'>${Text}</span>`)">{{articleKeyword}}
            </span>
          </div>
          <div class="info-list-footer">
            <i class="info-list-footer-time iconfont icon-shizhong"></i>
            <span>{{articleUpdatetime}}</span>
            <i class="info-list-footer-view iconfont icon-liulan"></i>
            <span>浏览量 {{articleReader}}</span>
            <i class="comment"></i>
            <span>评论 {{articleIsPublish}}</span>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.loop {
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-top: 1px solid #ccc;
    border-top: 1px solid #f2f2f2;
}

.loop:hover {
    background-color: #f8f8f8;
}

.loop > a {
    display: block;
    width: 100%;
    height: 100%;
}

.info-img {
    display: inline-block;
    position: relative;
    /* height: 100%; */
    width: 260px;
}

.info-list-img {
    border-radius: 8px;
}

.info-img .info-img-one {
    display: block;
    width: 42px;
    height: 16px;
    border-radius: 8px;
    position: absolute;
    bottom: 8px;
    left: 8px;
    background-color: #000;
    opacity: 0.5;
    text-align: center;
    line-height: 16px;
    font-size: 11px;
    color: #fff;
}

.info-img .info-list-img {
    width: 260px;
    height: 150px;
}

.info-describe {
    height: 150px;
    display: inline-block;
    width: 900px;
    vertical-align: top;
    margin-left: 10px;
    position: relative;
    right: 0;
    text-decoration: unset;
}

.info-list-describe-title {
    display: block;
    color: #404040;
    font-size: 18px;
    height: 50px;
    line-height: 25px;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    cursor: pointer;
}

.info-describe-content {
    margin-top: 5px;
    display: block;
    color: #a6a6a6;
    font-size: 13px;
    line-height: 18px;
    text-align: none;
    cursor: pointer;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}

.info-list-footer {
    position: absolute;
    width: 100%;
    bottom: 0px;

    /* display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex; */
}

.info-list-footer > span {
    font-size: 13px;
    color: #a6a6a6;
    display: inline-block;
    margin-right: 42px;
}

.info-list-footer i {
    display: inline-block;
    margin-right: 12px;
    font-size: 13px;
    color: #a6a6a6;
}

.info-list-footer i.comment {
    width: 16px;
    height: 14px;
    background: url("~/static/images/comment.png") no-repeat;
}
</style>

<script>
export default {
    props: [
        "articleImage",
        "articleId",
        "categoryId",
        "articleName",
        "articleKeyword",
        "articleUpdatetime",
        "articleReader",
        "articleIsPublish",
        "Text",
        "active"
    ],
    data() {
        return {
            actImgDefault:
                'this.src="' +
                require("~/static/images/默认图_首页资讯.jpg") +
                '"'
        };
    }
};
</script>
