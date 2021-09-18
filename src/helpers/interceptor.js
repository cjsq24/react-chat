import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_API_URL_BASE;
//axios.defaults.baseURL = 'http://localhost:4000/api';

axios.interceptors.response.use(
	async function(response) {
		return response;
	},
	async function(err) {
		try {
			if (err?.response?.data && err?.response?.data?.message) {
				console.log(err.response.data)
				return err.response
			}
			return {
				data: {
					success: false,
					message: err,
					values: {}
				}
			}
		} catch (e) {
			return {
				data: {
					success: false,
					message: e.toString(),
					values: {}
				}
			}
		}
	}
);

axios.defaults.params = {};

axios.interceptors.request.use(async function (config) {
	const user = await JSON.parse(window.localStorage.getItem('csc_user'))
	if (user?.token) {
		config.headers.Authorization = `Bearer ${user.token}`
	} else {
		//console.log('no hay token')
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});

export default axios;