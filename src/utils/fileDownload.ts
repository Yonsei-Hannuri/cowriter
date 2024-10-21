/**
 * @param {Blob} blob
 * @param {string} title
 * @returns void
 */
const fileDownload = (blob: Blob, title: string) => {
	const url = URL.createObjectURL(blob); // Blob을 URL로 변환
	// a 태그를 생성하여 다운로드 기능 구현
	const link = document.createElement("a");
	link.href = url;
	link.download = title; // 다운로드할 파일 이름 설정
	document.body.appendChild(link); // 링크를 문서에 추가
	link.click(); // 링크 클릭 이벤트 발생
	document.body.removeChild(link); // 링크 제거
	URL.revokeObjectURL(url); // 메모리 해제
};
export default fileDownload;
