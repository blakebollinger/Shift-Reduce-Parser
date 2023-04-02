import {ShiftStep, ReduceStep} from "./ShiftStep";

class State {

	state: number;

	action: Record<string, string>;

	goTo: Record<string , number>;

	constructor(state: number, actions: Record<string , string>, goTo: Record<string , number>) {

		this.state = state;
		this.action = actions;
		this.goTo = goTo;

	}

}

export class ParserTableModel {

	inputGrammar: string;
	states: State[]
	actionIds: string[];
	goToIds: string[];

	constructor() {

		this.states = [

			new State(0, {"id": "s5", "+": "", "*": "", "(": "s4", ")": "", "$": ""}, {"E": 1, "T": 2, "F": 3}),
			new State(1, {"id": "", "+": "s6", "*": "", "(": "", ")": "", "$": "accept"}, {"E": -1, "T": -1, "F": -1}),
			new State(2, {"id": "", "+": "r2", "*": "s7", "(": "", ")": "r2", "$": "r2"}, {"E": -1, "T": -1, "F": -1}),
			new State(3, {"id": "", "+": "r4", "*": "r4", "(": "", ")": "r4", "$": "r4"}, {"E": -1, "T": -1, "F": -1}),
			new State(4, {"id": "s5", "+": "", "*": "", "(": "s4", ")": "", "$": ""}, {"E": 8, "T": 2, "F": 3}),
			new State(5, {"id": "", "+": "r6", "*": "r6", "(": "", ")": "r6", "$": "r6"}, {"E": -1, "T": -1, "F": -1}),
			new State(6, {"id": "s5", "+": "", "*": "", "(": "s4", ")": "", "$": ""}, {"E": -1, "T": 9, "F": 3}),
			new State(7, {"id": "s5", "+": "", "*": "", "(": "s4", ")": "", "$": ""}, {"E": -1, "T": -1, "F": 10}),
			new State(8, {"id": "", "+": "s6", "*": "", "(": "", ")": "s11", "$": ""}, {"E": -1, "T": -1, "F": -1}),
			new State(9, {"id": "", "+": "r1", "*": "s7", "(": "", ")": "r1", "$": "r1"}, {"E": -1, "T": -1, "F": -1}),
			new State(10, {"id": "", "+": "r3", "*": "r3", "(": "", ")": "r3", "$": "r3"}, {"E": -1, "T": -1, "F": -1}),
			new State(11, {"id": "", "+": "r5", "*": "r5", "(": "", ")": "r5", "$": "r5"}, {"E": -1, "T": -1, "F": -1})


		];

		this.actionIds = ["id", "+", "*", "(", ")", "$"];
		this.goToIds = ["E", "T", "F"];
		this.inputGrammar = "" +
			"E -> E + T\n" +
			"E -> F\n" +
			"E -> E * T\n" +
			"T -> F\n" +
			"F -> ( E )\n" +
			"F -> id";

	}


	// generateTable(grammar: string[]) {
	//
	//
	//
	// }

	/**
	 * Parses a grammar using the shift-reduce algorithm.
	 *
	 * @param grammar - The grammar to parse.
	 */
	parseGrammar(grammar: string) {

		// A function to get the action for a given state and symbol.
		const getAction = (state: number, symbol: string) => {

			return this.states[state].action[symbol];

		}


		const getGoTo = (state: number, symbol: string) => {

			return this.states[state].goTo[symbol];

		}

		// A function to get the next token in the grammar.
		const getNextToken = (grammar: string) => {

			let token: string = "";

			for (let i = 0; i < grammar.length; i++) {

				token += grammar[i];

				if (this.actionIds.includes(token)) {

					return token;

				}

			}

			return token;

		}

		const getRuleRightSide = (ruleNumber: number) => {

			const rightSide = this.inputGrammar.split("\n")[ruleNumber-1].split("->")[1].trim();

			// Split the right side by the individual symbols and return it.
			return rightSide.split(" ");

		}

		const getRuleLeft = (ruleNumber: number) => {

			return this.inputGrammar.split("\n")[ruleNumber-1].split("->")[0].trim();

		};

		const getRuleLength = (ruleNumber: number) => {

			return this.inputGrammar.split("\n")[ruleNumber-1].split("->")[1].trim().split(" ").length;

		};

		console.log("Parsing grammar: \"" + grammar + "\"");

		let stack: string[] = ["0"];
		let input: string = grammar.replace(/\s/g, "");
		let output: string[] = [];

		let stepNumber: number = 0;

		let nextAction: string = "";
		let currentState: number = 0;

		let stepLog: any[] = [];

		while (nextAction !== "accept") {

			stepNumber++;

			const nextToken = getNextToken(input);

			if (getAction(parseInt(stack[stack.length - 1]), nextToken)[0].toLowerCase() === "s") {

				// Shift

				// Push the next token to the stack.
				stack.push(nextToken);

				// Push the next state to the stack.
				stack.push(getAction(currentState, nextToken).substring(1));

				// Update the current state.
				currentState = parseInt(getAction(currentState, nextToken).substring(1));

				// Remove the next token from the input.
				input = input.substring(nextToken.length);

				// Log the action.
				console.log("Shifted \"" + nextToken + "\" to state " + getAction(parseInt(stack[stack.length - 3]), nextToken).substring(1) + ".");

				const step = new ShiftStep(stepNumber, nextToken, stack.slice(0), input);
				stepLog.push(step);

			} else {

				// Reduce

				// Get the rule number.
				const ruleNumber = parseInt(getAction(currentState, nextToken).substring(1));

				// Get the item to reduce.
				const itemToReduce = getRuleRightSide(ruleNumber);

				// Get the length of the item to reduce.
				const ruleLength = getRuleLength(ruleNumber);

				// Get the left side of the rule.
				const leftSide = getRuleLeft(ruleNumber);

				// Remove the item to reduce from the stack.
				stack.splice(stack.length - (ruleLength * 2));

				// Push the left side of the rule to the stack.
				stack.push(leftSide);

				// Push the next state to the stack.
				stack.push(getGoTo(parseInt(stack[stack.length - 2]), leftSide).toString());

				// Update the current state.
				currentState = parseInt(stack[stack.length - 1]);

				// Log the action.
				console.log("Reduced \"" + itemToReduce.join(" ") + "\" to \"" + leftSide + "\".");

				const step = new ReduceStep(stepNumber, itemToReduce, leftSide, ruleNumber, stack.slice(0), input)
				stepLog.push(step);

			}

			// Add the current stack to the output.
			output.push(stack.join(" "));

			// Get the next action.
			nextAction = getAction(currentState, nextToken)

		}

		console.log("Parsing successful!");

		return [output, stepLog];

	}

}
export default ParserTableModel;