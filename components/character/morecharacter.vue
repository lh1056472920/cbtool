<template>
    <div class="morecharacter">
        <hr class="separate">
        <h2>专访人物</h2>
        <ul>
            <li v-for="(item,index) in personage" :key="index">
                <nuxt-link :to="{path:'/character/characterinfo',query: {id: item.personageId,categoryId:item.categoryId}}" class="morecharacter-list">

                    <div class="morecharacter-img">
                        <img class="morecharacter-list-img" :src="`${item.personageImage}`" :onerror="actImgDefault" alt="">
                    </div>
                    <div class="morecharacter-describe">
                        <div class="morecharacter-describe-title">
                            <span class="morecharacter-list-describe-title">{{item.personageName}}
                            </span>
                            <p class="morecharacter-list-describe-introduce">{{item.personageNameb}}</p>
                            <span class="morecharacter-describe-content" v-html="item.personageContent">
                            </span>
                        </div>
                    </div>
                </nuxt-link>
            </li>
        </ul>
        <nuxt-link :to="{path:`/navigation/navCandy/`,query:{id:20}}" @click.native="computedCnzz">
            <p class="toMore">更多人物</p>
        </nuxt-link>
    </div>
</template>

<script>
import axios from "~/plugins/axios.js";
export default {
    name: "morecharacter",
    data() {
        return {
            personage: [],
            actImgDefault:
                'this.src="' +
                require("~/static/images/person-default.jpg") +
                '"'
        };
    },
    mounted() {
        this.getpersonage();
    },
    methods: {
        async getpersonage() {
            let { data } = await axios.get("/web/personage/rightbar");

            this.personage = (!data.serviceError && data.content) || [];
            console.log(data);
            
        },
        computedCnzz() {
            _czc.push(["_trackEvent", "专访人物", "点击更多人物"]);
        }
    }
};
</script>

<style>
ul,
li {
    list-style: none;
}

.morecharacter h2 {
    font-size: 16px;
    padding: 22px 0;
    margin-bottom: 8px;
}

.morecharacter-list {
    width: 100%;
    display: block;
    padding: 8px 0px 8px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    
    height: 100%;
    box-sizing: border-box;
}

.morecharacter-list:hover {
    background-color: #f8f8f8;
}

.morecharacter-list:hover .morecharacter-list-describe-title {
    color: #f25a36;
}

.morecharacter-img {
    width: 110px;
    display: inline-block;
    vertical-align: top;
    /* -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1; */
    height: 146px;
    cursor: pointer;
    margin-right: 12px;
}

.morecharacter-img .morecharacter-list-img {
    width: 110px;
    height: 100%;
    border-radius: 4px;
}

.morecharacter-describe {
    display: inline-block;
    width: 208px;
    /* -webkit-box-flex: 2;
    -ms-flex: 2;
    flex: 2; */
    position: relative;
    right: 0;
    overflow: hidden;
    text-align: left;
    cursor: pointer;
}

.morecharacter-list-describe-title {
    display: block;
    color: #404040;
    font-size: 18px;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    cursor: pointer;
}

.morecharacter-list-describe-introduce {
    width: 100%;
    font-size: 12px;
    color: #a6a6a6;
    margin-top: 9px;
    margin-bottom: 17px;
    display: inline-block; 
	white-space: nowrap;
	overflow: hidden; 
	text-overflow:ellipsis;

}

.morecharacter-describe-content {
    display: block;
    color: #595959;
    font-size: 13px;
    height: 81px;
    word-wrap: break-word;
    word-break: break-all;
    line-height: 16px;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
}

.morecharacter-describe-content p,
.morecharacter-describe-content img {
    display: none;
}

.morecharacter-describe-content p:first-child {
    display: block;
}

.morecharacter .toMore {
    display: block;
    width: 120px;
    height: 28px;
    margin: 20px auto 46px;
    border: 1px solid #f25a36;
    border-radius: 20px;
    color: #f25a36;
    font-size: 12px;
    text-align: center;
    line-height: 28px;
}

.morecharacter .toMore:hover {
    background-color: #f25a36;
    color: #fff;
}
</style>