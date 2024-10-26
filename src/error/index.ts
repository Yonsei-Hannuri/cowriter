import GlobalErrorHandler from "./GlobalErrorHandler";

const globalErrorHandlingInit = () => {
	const globalErrorHanlder = new GlobalErrorHandler();

	// 전역 에러 핸들러
	window.onerror = function (_message, _source, _lineno, _colno, error) {
		if (error) globalErrorHanlder.handle(error);
	};

	// 전역 Promise 에러 핸들러
	window.onunhandledrejection = function (event) {
		if (event.reason) globalErrorHanlder.handle(event.reason);
	};
};

export default globalErrorHandlingInit;
