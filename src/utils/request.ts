import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
import { useUserStore } from "@/store/user";
import { message } from "ant-design-vue";

const requestUrl = {
	'prefix': import.meta.env.VITE_BASE_URL_PREFIX + import.meta.env.VITE_REQUEST_URL_PREFIX + '', // 所有的请求地址前缀部分 /api/admin
	'headers': {
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	}
}
// 创建一个 axios 实例
const axiosRequest = axios.create({
	baseURL: requestUrl.prefix, // 请求前缀
	timeout: 60000, // 请求超时时间毫秒
	headers: { 'Content-Type': 'application/json' },
})


// 添加请求拦截器
axiosRequest.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 在发送请求之前做些什么
		config.headers!['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
		return config
	},
	error => Promise.reject(error) as any
);
// 添加响应拦截器
axiosRequest.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error: any) => {
		if (error.response) {
			const store = useUserStore() as any;
			const data = error.response.data
			const status = error.response.status
			const token = '';
			if (status === 403) {
				// 禁止访问、无效Token
				message.error('登录已过期，请重新登录')
				store.logout();
			} else if (status === 401) {
				message.error('登录已过期，请重新登录')
				store.logout();
			} else if (status == 0) {
				message.error(data.msg)
			} else if (status == 400) {
				// 服务器错误
				message.error(data.msg)
			} else if (status == 500) {
				message.error(data.msg)
			} else {
				message.error(data.msg)
			}

		}
		// return error.response.data
		return Promise.reject(error) as any
	}
)
type ApiResponse<T> = T & {
	errcode: number;
	message: string;
};

export function request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
	return axiosRequest(config).then((response: AxiosResponse<ApiResponse<T>>) => {
		if(config.responseType){
			return response;
		}else{
			if (response.data.errcode > 0) {
				return Promise.reject(response.data as any) as any;
			}
			return response.data;
		}
	});
}


export default request

export {
	requestUrl,
	axiosRequest as axios
}
