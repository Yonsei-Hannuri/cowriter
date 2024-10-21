/**
 *
 * @returns string
 */
const getNewlineCharacter: () => string = () => {
	const userAgent = navigator.userAgent;
	if (userAgent.includes("Win")) {
		return "\r\n"; // Windows: \r\n
	} else {
		return "\n"; // macOS, Linux: \n
	}
};
export default getNewlineCharacter;
