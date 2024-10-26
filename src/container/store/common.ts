export type Fetch = {
	loading: boolean;
	fetch: (...args: any[]) => Promise<void>;
};
