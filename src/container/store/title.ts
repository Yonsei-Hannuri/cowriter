import { create } from "zustand";
import { Fetch } from "./common";
import {
	GET_ESSAY,
	GET_ESSAY_TITLE_RECOMMEND,
	SAVE_ESSAY_TITLE,
} from "../../api/essay";
import { debounce } from "../../utils/debounce";

type TitleState = {
	title: string;
	essayId: number;
};

type TitleAction = {
	getTitleRecommendation: () => void;
	setTitle: (title: string) => void;
};

const debounceDelay = 1500;
const debounceUpdateTitle = debounce(SAVE_ESSAY_TITLE, debounceDelay);

export const useTitle = create<TitleState & TitleAction & Fetch>((set) => ({
	title: "",
	loading: true,
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
		const { data } = await GET_ESSAY(essayId);
		const title = data.essayTitle;
		set(() => {
			return {
				essayId,
				title: title ? title : "",
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
