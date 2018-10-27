<template>
    <div class="main">
        <div class="left">
            <div class="cut_off_nav">
                <span class="now_day">{{time}}</span>
                <span class="now_week">{{str}}</span>
            </div>

            <div class="ul_main" v-for="(item,i) in list" :key="i">

                <div v-show="item.created_at==lists[j]&&new Date(item.created_at *1000).getDate()!=day" v-for="(item1,j) in lists" :key='item1.index' class="cut_off_nav">
                    <span class="now_day">{{new Date(item.created_at *1000).getFullYear() + "年" + (new Date(item.created_at *1000).getMonth() + 1) + "月" + new Date(item.created_at *1000).getDate() + "日"}}</span>
                    <span class="now_week">{{"星期" + "日一二三四五六".charAt(new Date(item.created_at *1000).getDay())}}</span>
                </div>
                <div class="li_list">
                    <div class="li_list_left">
                        <span class="ball"></span>
                        <span class="now_time" v-text="(new Date(item.created_at *1000).getHours()>=10?new Date(item.created_at *1000).getHours():('0'+new Date(item.created_at *1000).getHours()))+':'+(new Date(item.created_at *1000).getMinutes()>=10?new Date(item.created_at *1000).getMinutes():('0'+new Date(item.created_at *1000).getMinutes()))"></span>
                    </div>
                    <nuxt-link :data='item.id' :to="{path:`/info/infomessage`,query:{index:i,id:item.id}}" class="li_list_right">
                        <span class="li_list_title">{{(item.content).match(/【(.*)】/)&&(item.content).match(/【(.*)】/)[0].replace("【","").replace("】","")}}</span>
                        <span class="li_list_content">{{item.content}}
                        </span>
                        <a :href="item.link" class="li_list_contenta">{{item.link_name}}
                        </a>
                    </nuxt-link>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
export default {
    props: {
        list: Array,
        lists: Array
    },

    data() {
        return {
            Consult: [],
            time: "",
            str: "",
            day: 0,
            numli: []
            // cite:this.list,
        };
    },
    created() {
        let today = new Date();
        let mon = today.getMonth() + 1;
        this.time =
            today.getFullYear() + "年" + mon + "月" + today.getDate() + "日";
        this.str = "星期" + "日一二三四五六".charAt(new Date().getDay());
        this.day = today.getDate();
    },
    mounted() {},
    methods: {}
};
</script>
 <style scoped>
.main {
    width: 1200px;
    margin: 0 auto;
}

.left {
    display: inline-block;
    text-align: left;
    width: 790px;
    vertical-align: top;
    /* border-left: 1px solid #ccc; */
}

.right {
    display: inline-block;
    margin-left: 80px;
    width: 330px;
    margin-top: 44px;
    vertical-align: top;
}

.nav_top {
    line-height: 44px;
    font-size: 14px;
    color: #d9d9d9;
    border-bottom: 2px solid #f25a36;
}

.cut_off_nav {
    height: 90px;
    font-size: 30px;
    line-height: 90px;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
}

.cut_off_nav .now_week {
    font-size: 14px;
    color: #a6a6a6;
}

.ul_main {
    width: 100%;
    padding: 20px 0 20px 0px;
    border-left: 1px solid #f2f2f2;
}

/* .li_list {
   
   
} */

.li_list_left {
    display: inline-block;
    width: 80px;
    text-align: center;
    position: relative;
    font-size: 14px;
    color: #404040;
    padding-top: 3px;
}

.li_list_left .ball {
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #f25a36;
    top: 5px;
    left: -5px;
}

.li_list_right {
    cursor: pointer;
    display: inline-block;
   vertical-align: top;
   margin-left: 80px;
   margin-top: -15px;
}

.li_list_right .li_list_title {
    display: block;
    height: 19px;
    font-size: 18px;
    color: #404040;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-weight: bold;
    margin-bottom: 10px;
}

.li_list_right .li_list_content {
    font-size: 14px;
    color: #a6a6a6;
    word-wrap: break-word;
    word-break: break-all;
    margin-top: 5px;
    line-height: 20px;
}

.li_list_contenta {
    display: block;
    font-size: 14px;
    color: #a6a6a6;
    margin-top: 5px;
}
</style>
 