export class MzRenderer {
	createElement(tag: string) {
		return document.createElement(tag);
	}

	createText(value: string) {
		return document.createTextNode(value);
	}
}
