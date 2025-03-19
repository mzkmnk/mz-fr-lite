import { parseTemplate } from "./parser";
import { MzRenderer } from "./renderer";

const instructions = parseTemplate("<div>Hello,mzkmnk!! {{ todo }}!</div>");

const renderer = new MzRenderer();

for (const instruction of instructions) {
	renderer.createElement(instruction.type);
}
