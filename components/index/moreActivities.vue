<template>
	<div>
		<hr class="separate">
		<h2>活动</h2>
		<hr class="dotted">
		<ul class="label-list">
			<li :data-id='i' v-if="i<3"  v-for="(subitem,i) in list" :key="i">
				<activity :event-name='subitem.eventName' :event-time='subitem.eventTime' :event-id='subitem.eventId' :event-address='subitem.eventAddress' :event-img='subitem.column12'></activity>
			</li>
		</ul>
		<button class="btn-more" @click="toMoreActivity">更多活动</button>
	</div>
</template>

<script>
import activity from "~/components/video/activity.vue";
import axios from "~/plugins/axios.js";
export default {
    name: "moreActivities",
    components: {
        activity
    },
    props: {
        list: Array
    },
    data() {
        return {
            labelList: [
                "菲律宾数字货币投资考察团团第二期将于5月27日正团式启动",
                "菲律宾数字货币投资考察团团第二期将于5月27日正团式启动"
            ]
        };
    },
    methods: {
        toMoreActivity() {
            _czc.push(["_trackEvent", "活动", "点击更多活动"]);
            this.$router.push({
                path: `/navigation/navCandy/`,query:{id:24}
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

li {
    width: 100%;
    margin-top: 20px;
}

li > div {
    width: 100%;
}

li > p {
    font-size: 14px;
    margin: 12px;
    color: #404040;
}

a {
    display: block;
    font-size: 12px;
    border: #d9d9d9 solid 1px;
    border-radius: 14px;
    padding: 8px 18px;
    color: #595959;
}

.btn-more {
    margin-top: 20px;
    cursor: pointer;
}

.btn-more:hover {
    background-color: #f25a36;
    color: #fff;
}
</style>