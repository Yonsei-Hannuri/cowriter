import { client } from "./client";

type subject = {
	subjectId: string;
	createdDt: string;
	updatedDt: string;
	subjectPurpose: string;
	subjectContent: string;
	subjectTitle: string;
	subjectUrl: string;
};

export const GET_SUBJECT = (subjectId: string, subjectContentUrl?: string) => {
	let query;
	if (subjectContentUrl) {
		query = `subject/${subjectId}/?subjectUrl=${subjectContentUrl}`;
	} else {
		query = `subject/${subjectId}/`;
	}
	return client.get<subject>(query);
};
