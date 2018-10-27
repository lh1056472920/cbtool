export default ({ store, route, redirect }) => {
	// console.log(store, route)
	// if (route.fullPath === '/') {
	// 	store.commit('changeIsIndex', true)
	// } else {
	// 	store.commit('changeIsIndex', false)
	// }
    let routeName = route.name === "info-id"?"info":route.name;
    store.dispatch("changeHeaderNav",routeName);
}
