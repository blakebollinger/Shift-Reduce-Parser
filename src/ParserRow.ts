class ParserRow {

	state: number;

	actions: string[];

	goTo: string[];

	constructor(state: number, actions: string[], goTo: string[]) {

		this.state = state;
		this.actions = actions;
		this.goTo = goTo;

	}

}

export default ParserRow;