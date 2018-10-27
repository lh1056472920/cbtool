import axios from 'axios';

let options={
	heards:{
		timeout :5000,
		post:{
			'Content-Type':'application/json'
		}
	}
}
// options.baseURL='http://192.168.1.159:5662';
options.baseURL='http://120.79.0.99';
let instance = axios.create(options);
let reqConfig;
instance.interceptors.request.use(
    config => {
        reqConfig = config;
        return config;
    });
instance.interceptors.response.use((res) => {
	if (res.data.code === -1) {
		res.data.serviceError = true
		res.serviceError = true;
	}
	return res;
},(err) => {
	err.serviceError = true;
	// console.log(err);
	
	console.error(err);
	// this.router.push({
	// 	path:'/servece/serverce'
	// })
	return err;
})
export default instance
