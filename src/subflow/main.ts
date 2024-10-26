import introduce from "./introduce";

export const Introduce = introduce({
	stageClassName:
		"position-absolute top-0 w-100 h-100 z-30 d-flex justify-content-center",
	descriptionStageClassName:
		"w-75 m-5 h-25 d-flex justify-content-center align-items-center p-3 border border-secondary rounded bg-light position-absolute top-0 left-0 bottom-0 right-0 m-auto z-40 font-weight-normal fst-italic lh-lg text-start pointer-events-none",
	highlightClassName: "position-relative border border-info rounded",
	curtainClassName:
		"position-absolute rounded top-0 w-100 h-100 bg-secondary opacity-50",
	tooltipClassName:
		"font-weight-normal w-100 h-100 position-absolute top-0 left-0 bottom-0 right-0 m-auto text-center text-wrap d-flex justify-content-center align-items-center fw-semibold fs-5",
});
