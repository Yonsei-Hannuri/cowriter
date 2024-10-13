import { essayClient } from "./client";

type essay = {
	essayId: number;
	createdDt: string;
	updatedDt: string;
	essayTitle: string;
	owner: string;
	completeYn: string;
	subjectId: string;
};

export const GET_ESSAYS = () => essayClient.get<essay[]>(`/`);

export const GET_ESSAY = (essayId: number) =>
	essayClient.get<essay>(`${essayId}/`);

export const GET_RECENT_SUBJECT_ESSAY = (subjectId: string) =>
	essayClient.get<essay[]>(
		`/?action=recent-subject-essay&subject-id=${subjectId}`
	);

export const CREATE_ESSAY = (subjectId: string) =>
	essayClient.post<essay>("/", { subjectId });

export const DELETE_ESSAY = (essayId: number) =>
	essayClient.delete(`${essayId}/`);

export const COMPLETE_ESSAY = (essayId: number) =>
	essayClient.put<essay>(`${essayId}/?action=complete`, {
		complete: "true",
	});

export const GET_ESSAY_TITLE_RECOMMEND = (essayId: number) =>
	essayClient.get<{ titleRecommend: string }>(
		`${essayId}/?action=title-recommend`
	);

export const SAVE_ESSAY_TITLE = (essayId: number, title: string) =>
	essayClient.put<essay>(`${essayId}/?action=title`, { title });
