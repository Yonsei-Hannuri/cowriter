import LoadingWrapper from "../components/common/LoadingWrapper";
import { useEssay } from "./store/essay";

export default function ({
	onEssayClick,
}: {
	onEssayClick: (essay: { essayId: number; subjectId: string }) => void;
}) {
	const { essays, loading } = useEssay();
	return (
		<div>
			<LoadingWrapper isLoading={loading}>
				<div className="list-group">
					{essays.map((essay) => (
						<div
							onClick={() => onEssayClick(essay)}
							key={essay.essayId}
							className="list-group-item list-group-item-action"
						>
							{essay.createdDt}, {essay.essayTitle}, {essay.completeYn}
						</div>
					))}
				</div>
			</LoadingWrapper>
		</div>
	);
}
