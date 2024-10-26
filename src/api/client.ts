import axios, { AxiosError } from "axios";
import getCookieValue from "../utils/getCookieValue";
import APIError from "./error/APIError";

export const extClient = axios.create({});

export const client = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL + "/cowriter",
	withCredentials: true,
});

client.interceptors.request.use((config) => {
	const csrfToken = getCookieValue(document.cookie, "csrftoken");
	config.headers["X-CSRFToken"] = csrfToken;
	return config;
});

client.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError) => {
		let apiError: null | APIError = null;

		if (error.response) {
			const res = error.response;
			if (res.status === 400) {
				const errors = error.response.data;
				if (Array.isArray(errors)) {
					apiError = new APIError(errors.join("\n"));
				} else if (typeof errors === "object") {
					apiError = new APIError(Object.values(errors).join("\n"));
				} else {
					apiError = new APIError(errors);
				}
			} else {
				apiError = new APIError(error.response.data.detail);
			}
		} else if (error.request) {
			apiError = new APIError(
				"서버로부터 응답을 못받았습니다.\n오류가 계속 될 시 관리자에게 문의해주세요."
			);
		}

		return Promise.reject(apiError);
	}
);

export const essayClient = axios.create({
	...client.defaults,
	baseURL: `${client.defaults.baseURL}/essay`,
});

essayClient.interceptors.request.use((config) => {
	const csrfToken = getCookieValue(document.cookie, "csrftoken");
	config.headers["X-CSRFToken"] = csrfToken;
	return config;
});

essayClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError) => {
		let apiError: null | APIError = null;

		if (error.response) {
			const res = error.response;
			if (res.status === 400) {
				const errors = error.response.data;
				if (Array.isArray(errors)) {
					apiError = new APIError(errors.join("\n"));
				} else if (typeof errors === "object") {
					apiError = new APIError(Object.values(errors).join("\n"));
				} else {
					apiError = new APIError(errors);
				}
			} else {
				apiError = new APIError(error.response.data.detail);
			}
		} else if (error.request) {
			apiError = new APIError(
				"서버로부터 응답을 못받았습니다.\n오류가 계속 될 시 관리자에게 문의해주세요."
			);
		}

		return Promise.reject(apiError);
	}
);
