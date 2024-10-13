import { create } from "zustand";
import { Fetch } from "./common";
import { GET_ESSAY_TITLE_RECOMMEND, SAVE_ESSAY_TITLE } from "../../api/essay";
import { debounce } from "../../utils/debounce";

type TitleState = {
	title: string;
	essayId: number;
};

type TitleAction = {
	getTitleRecommendation: () => void;
	setTitle: (title: string) => void;
};

const debounceDelay = 3000;
const debounceUpdateTitle = debounce(SAVE_ESSAY_TITLE, debounceDelay);

export const useTitle = create<TitleState & TitleAction & Fetch>((set) => ({
	title: "",
	loading: true,
	error: "",
	essayId: 0,
	getTitleRecommendation: async () => {
		set(() => {
			return {
				loading: true,
			};
		});
		const res = await GET_ESSAY_TITLE_RECOMMEND(useTitle.getState().essayId);
		const titleRecommend = res.data.titleRecommend;
		SAVE_ESSAY_TITLE(useTitle.getState().essayId, titleRecommend);
		set(() => {
			return {
				title: titleRecommend,
				loading: false,
			};
		});
	},
	fetch: async (essayId: number) => {
		const res = await GET_ESSAY_TITLE_RECOMMEND(essayId);
		const title = res.data.titleRecommend;
		set(() => {
			return {
				essayId,
				title,
				loading: false,
			};
		});
	},
	setTitle: (title) => {
		debounceUpdateTitle(useTitle.getState().essayId, title);
		set(() => {
			return { title };
		});
	},
}));
