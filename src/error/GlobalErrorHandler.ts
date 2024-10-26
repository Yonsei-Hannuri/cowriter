class GloablErroHandler {
	constructor() {}
	public handle(error: Error) {
		alert(error.message);
	}
}

export default GloablErroHandler;
