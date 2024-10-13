import LoadingWrapper from "../components/common/LoadingWrapper";
import Title from "../components/title/Title";
import { useTitle } from "./store/title";

export default function () {
	const { title, loading, getTitleRecommendation, setTitle } = useTitle();
	return (
		<LoadingWrapper isLoading={loading} style={{ height: "fit-content" }}>
			<Title
				title={title}
				onRecommendClick={() => {
					getTitleRecommendation();
				}}
				setTitle={(title) => {
					setTitle(title);
				}}
			/>
		</LoadingWrapper>
	);
}
