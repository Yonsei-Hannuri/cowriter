class APIError extends Error {
	name: string;
	constructor(message: string) {
		super(message);
		this.name = "APIError";

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, APIError);
		}
	}
}

export default APIError;
