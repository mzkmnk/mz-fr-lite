type Instruction =
	| { type: "elementStart"; tag: string; attributes: Record<string, string> }
	| { type: "elementEnd"; tag: string }
	| { type: "text"; value: string }
	| { type: "binding"; key: string };

export function parseTemplate(template: string): Instruction[] {
	const instructions: Instruction[] = [];

	let pos = 0;

	while (pos < template.length) {
		const tagIndex = template.indexOf("<", pos);
		const binding = template.indexOf("{{", pos);

		if (tagIndex === -1 && binding === -1) {
			const text = template.substring(pos);
			instructions.push({ type: "text", value: text });
			break;
		}

		if (tagIndex < binding || binding === -1) {
			// 閉じタグの位置を見つける
			const nextTagIndex = template.indexOf(">", tagIndex);

			// セルフクロージングタグの場合
			if (template[nextTagIndex - 1] === "/") {
				const tag = template.substring(tagIndex + 1, nextTagIndex - 1);
				instructions.push({ type: "elementEnd", tag });
			} else {
				// 閉じタグの場合
				if (template[tagIndex + 1] === "/") {
					const tag = template.substring(tagIndex + 2, nextTagIndex);
					instructions.push({ type: "elementEnd", tag });
				} else {
					const tag = template.substring(tagIndex + 1, nextTagIndex);
					instructions.push({ type: "elementStart", tag, attributes: {} });
				}
			}

			pos = nextTagIndex + 1;

			if (pos < binding && binding !== -1) {
				const text = template.substring(pos, binding);
				instructions.push({ type: "text", value: text });
			}
		} else {
			const nextBindingIndex = template.indexOf("}}", binding);

			const key = template.substring(binding + 2, nextBindingIndex).trim();

			instructions.push({ type: "binding", key });

			pos = nextBindingIndex + 2;

			if (pos < tagIndex && tagIndex !== -1) {
				const text = template.substring(pos, tagIndex);
				instructions.push({ type: "text", value: text });
			}
		}
	}

	return instructions;
}
