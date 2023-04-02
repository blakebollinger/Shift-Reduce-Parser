class ShiftStep {

	stepNumber: number;

	itemShifted: string;

	resultingStack: string[];

	remainingInput: string;


	constructor(stepNumber: number, itemShifted: string, resultingStack: string[], remainingInput: string) {

		this.stepNumber = stepNumber;
		this.itemShifted = itemShifted;
		this.resultingStack = resultingStack;
		this.remainingInput = remainingInput;

	}

}

class ReduceStep {

	stepNumber: number;

	itemReduced: string[];

	reductionResult: string;

	ruleNumber: number;

	resultingStack: string[];

	remainingInput: string;

	constructor(stepNumber: number, itemReduced: string[], reductionResult: string, ruleNumber: number, resultingStack: string[], remainingInput: string) {
		this.stepNumber = stepNumber;
		this.itemReduced = itemReduced;
		this.reductionResult = reductionResult;
		this.ruleNumber = ruleNumber;
		this.resultingStack = resultingStack;
		this.remainingInput = remainingInput;
	}

}


export {
	ShiftStep,
	ReduceStep
};