import ParserRow from "./ParserRow";

export class ParserTableModel {

	rows: ParserRow[]

	constructor(rows: ParserRow[]) {

		this.rows = rows;

	}

}
export default ParserTableModel;