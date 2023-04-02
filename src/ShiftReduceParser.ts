import ParserTableModel from "./ParserTableModel";

export class ShiftReduceParser {

	inputGrammar: string[];

	table: ParserTableModel;

	constructor(inputGrammar: string[]) {

		this.inputGrammar = inputGrammar;
		this.table = new ParserTableModel();

	}



}

export default ShiftReduceParser;