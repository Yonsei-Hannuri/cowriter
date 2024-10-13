export type Fetch = {
  loading: boolean;
  error: string | null;
  fetch: (...args: any[]) => Promise<void>;
};
