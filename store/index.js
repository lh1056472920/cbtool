import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  	state: {
    	isIndex: true,
    	topicList: [],
    	partner: [],
    	friendlink: [],
        activeHeaderNav: ""
  	},
    getters: {
        getActiveHeaderNav: (state) => {
            return state.activeHeaderNav;
        }
    },
  	mutations: {
    	changeIsIndex (state, isIndex) {
	    	state.isIndex = isIndex
	  	},
	  	changeTopicList (state, topicList) {
	    	state.topicList = topicList
	  	},
	  	changePartner (state, partner) {
	    	state.partner = partner
	  	},
	  	changeFriendlink (state, friendlink) {
	    	state.friendlink = friendlink
	  	},
        changeHeaderNav (state, active){
            state.activeHeaderNav = active;
        }
  	},
    actions: {
        changeHeaderNav (context,active) {
            context.commit("changeHeaderNav", active);
        }
    }
})

export default store
