type Instruction =
	| { type: "elementStart"; tag: string; attributes: Record<string, string> }
	| { type: "elementEnd"; tag: string }
	| { type: "text"; value: string }
	| { type: "binding"; key: string };
