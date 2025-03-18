import { parseTemplate } from "./parser";

const instructions = parseTemplate("<div>Hello,mzkmnk!! {{ todo }}!</div>");
console.log(instructions);
