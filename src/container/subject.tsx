import { useSubject } from "./store/subject";
import Subject from "../components/subject/Subject";
import LoadingWrapper from "../components/common/LoadingWrapper";

export default function ({}: {}) {
	const { subject, loading } = useSubject();
	return (
		<LoadingWrapper isLoading={loading} style={{ height: "inherit" }}>
			<Subject
				subjectTitle={subject.subjectTitle}
				subjectContent={subject.subjectContent}
			/>
		</LoadingWrapper>
	);
}
