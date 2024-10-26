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
					{essays.map((essay) => {
						const dateObj = new Date(essay.createdDt);

						// 날짜와 시간만 추출하여 형식 지정
						const formattedDate = dateObj.toLocaleDateString(); // YYYY-MM-DD 형태
						const formattedTime = dateObj.toLocaleTimeString(); // HH:MM:SS 형태

						const dateTime = `${formattedDate} ${formattedTime}`;
						return (
							<div
								onClick={() => onEssayClick(essay)}
								key={essay.essayId}
								className="list-group-item list-group-item-action d-flex justify-content-between"
							>
								<span>{essay.essayTitle ? essay.essayTitle : "제목 없음"}</span>
								<span className="fw-lighter" style={{ fontSize: 12 }}>
									{dateTime}
								</span>
							</div>
						);
					})}
				</div>
			</LoadingWrapper>
		</div>
	);
}
