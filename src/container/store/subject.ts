import { create } from "zustand";
import { Fetch } from "./common";
import { GET_SUBJECT } from "../../api/subject";

type subject = {
	subjectId: string;
	createdDt: string;
	updatedDt: string;
	subjectPurpose: string;
	subjectContent: string;
	subjectTitle: string;
};

type SubjectState = {
	subject: subject;
};

export const useSubject = create<SubjectState & Fetch>((set) => ({
	subject: {
		subjectId: "",
		createdDt: "",
		updatedDt: "",
		subjectPurpose: "",
		subjectContent: "",
		subjectTitle: "",
	},
	loading: true,
	error: null,
	fetch: async (subectId: string) => {
		try {
			const res = await GET_SUBJECT(subectId);
			const subject = res.data;
			set({ subject: subject, loading: false });
		} catch (error) {
			set({ error: error as string, loading: false });
		}
	},
}));
