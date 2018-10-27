<template>
    <div class="search-page">
        <hr class="separate">
        <div class="header">
            <nav class="search-nav">
                <a :class="{active: active==='article'}" @click.stop.prevent="clickItem('article')">文章</a>
                <a :class="{active: active==='info'}" @click.stop.prevent="clickItem('info')">资讯</a>
                <a :class="{active: active==='project'}" @click.stop.prevent="clickItem('project')">项目</a>
                <a :class="{active: active==='video'}" @click.stop.prevent="clickItem('video')">视频</a>
            </nav>
            <p class="tips">搜索关键字“
                <span style="color: #f25a36">{{searchText}}</span>”，共{{(isNaN(articleList.total)==true?0:articleList.total)+(isNaN(infoList.total)==true?0:infoList.total)+(isNaN(projectList.total)==true?0:projectList.total) +(isNaN(videoList.total)==true?0:videoList.total)}}个结果</p>
        </div>
        <hr class="dotted">
        <div class="search-main">
            <section v-show="active==='article'">
                <!-- 文章 -->
                <div v-if="articleList.list" v-for="(item,i) in articleList.list" :key="i">
                    <searchArticle :article-image='item.articleImage' :article-id="item.articleId" :category-id="item.categoryId" :article-keyword="item.articleKeyword" :article-name="item.articleName" :article-updatetime="item.articleUpdatetime" :article-reader="item.articleReader" :article-is-publish="item.articleIsPublish" :active='active' :Text='Text'></searchArticle>
                </div>
                <div class="searchNothing" v-if="articleList.list.length==0">
                    <img src="~/static/images/search-nothing.png" alt="">
                    <p>暂无搜索内容</p>
                </div>
            </section>
            <section v-show="active==='info'">
                <!-- 资讯 -->
                <div v-if="infoList.list" v-for="(item,i) in infoList.list" :key="i">
                    <searchArticle :article-image='item.articleImage' :article-id="item.articleId" :category-id="item.categoryId" :article-keyword="item.articleKeyword" :article-name="item.articleName" :article-updatetime="item.articleUpdatetime" :article-reader="item.articleReader" :article-is-publish="item.articleIsPublish" :active='active' :Text='Text'></searchArticle>
                </div>
                <div class="searchNothing" v-if="infoList.list.length==0">
                    <img src="~/static/images/search-nothing.png" alt="">
                    <p>暂无搜索内容</p>
                </div>
            </section>
            <section v-show="active==='project'">
                <!-- 项目 -->
                <div v-if="projectList.list" class="clear">
                    <div class="project" v-for="(item,i) in projectList.list" :key="i">
                        <searchProject :image='item.image' :project-introduction='item.projectIntroduction' :chinese-name='item.chineseName' :code='item.code' :name='item.name' :Text='Text'></searchProject>
                    </div>

                </div>
                <div class="searchNothing" v-if="projectList.list && projectList.list.length == 0">
                    <img src="~/static/images/search-nothing.png" alt="">
                    <p>暂无搜索内容</p>
                </div>
            </section>
            <section v-show="active==='video'">
                <!-- 视频 -->
                <div v-if="videoList.list" class="content">
                    <div class="videoBox" v-for="(item,i) in videoList.list" :key="i">
                        <nuxt-link :to="'/video/videoDetail/'+item.videoId">
                            <div>
                                <quickView :video-id="item.videoId" :video-img="item.videoImage" :video-duration="item.column13"></quickView>
                            </div>
                            <p v-if="item.videoName" v-html="item.videoName&&item.videoName.replace(new RegExp(Text,'g'), `<span style=\'color: #f25a36;\'>${Text}</span>`)">{{item.videoName}}</p>
                        </nuxt-link>
                    </div>
                </div>
                <div class="searchNothing" v-if="videoList.list.length==0">
                    <img src="~/static/images/search-nothing.png" alt="">
                    <p>暂无搜索内容</p>
                </div>
            </section>
            <toTop></toTop>
        </div>
    </div>
</template>



<script>
import searchArticle from "~/components/search/searchArticle.vue";
import searchProject from "~/components/search/searchProject.vue";
import quickView from "~/components/video/quickView.vue";
import toTop from "~/components/video/toTop.vue";
import axios from "~/plugins/axios.js";
require("babel-polyfill");
export default {
    name: "search",
    components: {
        searchArticle,
        searchProject,
        quickView,
        toTop
    },
    data() {
        return {
            // active: "article",
            Text: "",
            active:'article',
            articleList:{'list':[]},
            infoList:{'list':[]},
            projectList:{'list':[]},
            videoList:{'list':[]},
        };
    },
    created() {
        this.research()
        },
    computed: {
        searchText() {
            this.research();
            return this.$route.query.searchText;
        }
    },
    // async asyncData({ query }) {
    //     console.log(query);
        
    //     let { data } = await axios.post(
    //         `/entityController/elasticsearch/searchover?name=${
    //             query.searchText
    //         }`
    //     );
    //     // console.log(data);
    //     console.log(1111);

    //     return {
    //         articleList:
    //             (data && data.code != -1 && data.index_article_wenzhang) || [],
    //         infoList:
    //             (data && data.code != -1 && data.index_article_zixun) || [],
    //         projectList: (data && data.code != -1 && data.index_token) || [],
    //         videoList: (data && data.code != -1 && data.index_video) || [],
    //         active:
    //             (data.index_article_wenzhang.size == 0 ? "" : "article") ||
    //             (data.index_article_zixun.size == 0 ? "" : "info") ||
    //             (data.index_token.size == 0 ? "" : "project") ||
    //             (data.index_video.size == 0 ? "" : "video") ||
    //             "article"
    //     };
    // },
    methods: {
       async clickItem(active) {
            this.active = active;
        },
        async research() {
            console.log(1111);
            
            this.Text = this.$route.query.searchText;
            // console.log(this.Text);
            if (this.Text) {
                let { data } = await axios.post(
                    `/entityController/elasticsearch/searchover?name=${
                        this.Text
                    }`
                );
                console.log(data);

                // (this.articleList = data.index_article_wenzhang || []),
                //     (this.infoList = data.index_article_zixun || []),
                //     (this.projectList = data.index_token || []),
                //     (this.videoList = data.index_video || []);
                // this.active =
                //     (data.index_article_wenzhang.size == 0 ? "" : "article") ||
                //     (data.index_article_zixun.size == 0 ? "" : "info") ||
                //     (data.index_token.size == 0 ? "" : "project") ||
                //     (data.index_video.size == 0 ? "" : "video") ||
                //     "article";
                // // console.log(this.active);
                // // this.clickItem(this.active)
                this.articleList=
                (data && data.code != -1 && data.index_article_wenzhang) || [],
            this.infoList=
                (data && data.code != -1 && data.index_article_zixun) || [],
            this.projectList= (data && data.code != -1 && data.index_token) || [],
            this.videoList= (data && data.code != -1 && data.index_video) || [],
            this.active=
                (data.index_article_wenzhang.size == 0 ? "" : "article") ||
                (data.index_article_zixun.size == 0 ? "" : "info") ||
                (data.index_token.size == 0 ? "" : "project") ||
                (data.index_video.size == 0 ? "" : "video") ||
                "article"
            }
        }
    }
};
</script>

<style>
.search-page {
    width: 1200px;
    margin: 15px auto;
    /* min-height: 800px; */
}

.search-page .header {
    display: -ms-flexbox;
    display: flex;
    display: -moz-box;
    display: -webkit-flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.search-page .tips {
    font-size: 14px;
    color: #d9d9d9;
}

.search-page .search-nav {
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

.search-page .search-nav a {
    padding: 15px;
    color: #404040;
    text-decoration: none;
}

.search-page .search-nav a:hover {
    color: #f25a36;
    cursor: pointer;
}

.search-page .search-nav a.active {
    color: #f25a36;
    border-bottom: #f25a36 solid 2px;
}

.search-page .search-main {
    width: 100%;
}

.search-page .search-main section {
    width: 100%;
}

.search-page section > div.content {
    width: 1200px;
    margin: 0 auto;
}

.search-page .content .videoBox {
    display: inline-block;
    width: 228px;
    margin-right: 15px;
    margin-top: 20px;
    vertical-align: top;
}

.search-page .content .videoBox:nth-child(5n) {
    margin-right: 0;
}

.search-page .content .videoBox div {
    width: 228px;
    height: 143px;
}

.search-page .search-main .content .videoBox p {
    width: 228px;
    font-size: 14px;
    margin: 12px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.search-page .search-main .content .videoBox:hover {
    cursor: pointer;
}

.search-page .search-main .content .videoBox:hover p {
    color: #f25a36;
}

.search-page .project:nth-child(3n) a {
    margin-right: 0;
}

.search-page .searchNothing {
    width: 1200px;
}

.search-page .searchNothing img {
    display: block;
    margin: 160px auto 20px;
}

.search-page .searchNothing p {
    width: 100%;
    text-align: center;
    color: #d9d9d9;
    font-size: 25px;
    /* font-weight: 100; */
}
</style>
