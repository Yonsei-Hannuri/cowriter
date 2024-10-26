import { create } from "zustand";
import { Fetch } from "./common";
import { GET_ESSAYS } from "../../api/essay";

type essay = {
	essayTitle: string;
	essayId: number;
	subjectId: string;
	completeYn: string;
	createdDt: string;
};

type EssayState = {
	essays: essay[];
};

export const useEssay = create<EssayState & Fetch>((set) => ({
	essays: [],
	loading: true,

	fetch: async () => {
		const { data: essays } = await GET_ESSAYS();
		set(() => {
			return {
				essays,
				loading: false,
			};
		});
	},
}));
