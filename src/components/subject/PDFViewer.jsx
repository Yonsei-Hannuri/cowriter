import { useState, useEffect, useRef } from "react";
import { Page, Document } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ src }) {
	const [numPages, setNumpages] = useState(1);
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const containerRef = useRef(null);
	const [pageWidth, setPageWidth] = useState(600);

	const [scale, setScale] = useState(1);
	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumpages(numPages);
		setLoading(false);
	};

	const openUpWithNewWindowWhenDoubleClick = (e) => {
		if (e.detail === 2) {
			window.open(src);
		}
	};

	useEffect(() => {
		const updateScale = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				setScale(containerWidth / pageWidth); // 부모 너비에 맞게 스케일 설정
			}
		};

		updateScale();
		window.addEventListener("resize", updateScale);
		return () => window.removeEventListener("resize", updateScale);
	}, [pageWidth]);

	const onPageLoadSuccess = (page) => {
		setPageWidth(page.originalWidth);
	};

	return (
		<div id="pdf" ref={containerRef}>
			{/* <div id="pdfLoading" style={{ display: loading ? "" : "none" }}>
				<div className="d-flex justify-content-center">
					<div className="spinner-border text-primary m-5" role="status">
						<span className="sr-only"></span>
					</div>
				</div>
			</div> */}
			<div
				id="pdfDocument"
				style={{
					display: !loading ? "" : "none",
				}}
				className="carousel slide"
				onClick={openUpWithNewWindowWhenDoubleClick}
			>
				<div className="carousel-inner">
					<Document
						file={src}
						onLoadSuccess={onDocumentLoadSuccess}
						options={{
							cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
							cMapPacked: true,
						}}
					>
						<div className="carousel-item active">
							<Page
								pageNumber={curPage}
								scale={scale}
								onLoadSuccess={onPageLoadSuccess}
							/>
						</div>
					</Document>
				</div>
				{numPages > 1 && (
					<>
						<button
							className="carousel-control-prev"
							onClick={() => {
								setCurPage(curPage - 1 > 0 ? curPage - 1 : numPages);
							}}
							type="button"
						>
							<span
								className="carousel-control-prev-icon"
								aria-hidden="true"
								style={{ filter: "brightness(0)" }}
							></span>
						</button>
						<button
							className="carousel-control-next"
							onClick={() => {
								setCurPage((curPage % numPages) + 1);
							}}
							type="button"
						>
							<span
								className="carousel-control-next-icon"
								aria-hidden="true"
								style={{ filter: "brightness(0)" }}
							></span>
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default PDFViewer;
