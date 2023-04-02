import React, {useState, useRef, useEffect} from "react";
import './App.css';
import {
	Text,
	Textarea,
	VStack,
	Button,
	HStack
} from "@chakra-ui/react";
import ParserTable from "./ParserTable";
import ShiftCard from "./ShiftCard";
import ShiftReduceParser from "./ShiftReduceParser";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReduceCard from "./ReduceCard";
import {ShiftStep, ReduceStep} from "./ShiftStep";

function App() {

	const [inputGrammar, setInputGrammar] = useState("" +
		"E -> E + T\n" +
		"E -> F\n" +
		"E -> E * T\n" +
		"T -> F\n" +
		"F -> ( E )\n" +
		"F -> id");
	const [shiftReduceParser, setShiftReduceParser] = useState(new ShiftReduceParser(inputGrammar.split('\n')));
	const [grammarToParse, setGrammarToParse] = useState("id + (id)$");
	// const [parsingSteps, setParsingSteps] = useState("");
	const parsingStepCardBacklog = useRef([] as JSX.Element[]);
	let cardHolder = [] as JSX.Element[];
	const [parsingStepCards, setParsingStepCards] = useState([] as JSX.Element[]);

	useEffect(() => {
		AOS.init({duration: 500});
	}, []);

	let parseGrammar = () => {

		const [calculatedSteps, stepLog] = shiftReduceParser.table.parseGrammar(grammarToParse);
		let cards = [] as JSX.Element[];

		for (let i = 0; i < stepLog.length; i++) {
			const step = stepLog[i];
			const stepNumber = i + 1;

			if (step instanceof ShiftStep) {
				cards.push(<ShiftCard key={stepNumber} number={stepNumber} symbol={step.itemShifted} stack={step.resultingStack} remainingInput={step.remainingInput}/>);
			} else if (step instanceof ReduceStep) {
				cards.push(<ReduceCard key={stepNumber} number={stepNumber} symbol={step.itemReduced} reducedTo={step.reductionResult} ruleNumber={step.ruleNumber} stack={step.resultingStack} remainingInput={step.remainingInput}/>);
			}
		}

		parsingStepCardBacklog.current = cards;

		animateParsingSteps();

	}

	const animateParsingSteps = () => {

		new Promise(r => setTimeout(r, 30)).then(() => {

			console.log("Adding: " + parsingStepCardBacklog.current[0].props.number);

			setParsingStepCards([...cardHolder, parsingStepCardBacklog.current[0]]);

			cardHolder.push(parsingStepCardBacklog.current[0]);

			parsingStepCardBacklog.current = parsingStepCardBacklog.current.slice(1);

			if (parsingStepCardBacklog.current.length > 0)
				animateParsingSteps();

		});


	}

	return (
		<div className="App">
			<Text>Welcome to my Shift Reduce Parser!</Text>

			<HStack p={'5%'} h={'20%'} align={'top'} justify={'center'} spacing={'50px'}>

				<VStack w={'30%'} spacing={'30px'}>
					<VStack w={'100%'}>
						<Text fontSize={'lg'}>Input Grammar</Text>
						<Textarea boxShadow='dark-lg' value={inputGrammar} isDisabled onChange={(e) => setInputGrammar(e.target.value)} resize={'vertical'}/>
					</VStack>
					<Button isDisabled onClick={() => setShiftReduceParser(new ShiftReduceParser(inputGrammar.split('\n')))} colorScheme='blue'>Generate Parser Table</Button>
				</VStack>

				<VStack w={'30%'} spacing={'30px'}>
					<VStack w={'100%'}>
						<Text fontSize={'lg'}>Grammar to Parse</Text>
						<Textarea boxShadow='dark-lg' value={grammarToParse} onChange={(e) => setGrammarToParse(e.target.value)} resize={'vertical'}/>
					</VStack>
					<Button onClick={parseGrammar} colorScheme='blue'>Parse</Button>
				</VStack>

			</HStack>

			<HStack align={'top'} justify={'space-evenly'} w={'100%'} p={'5%'} spacing={'50px'}>

				<VStack w={'50%'} >

					<Text fontSize={'lg'}>Parsing Steps</Text>

					{parsingStepCards}

				</VStack>

				<VStack w={'50%'}>

					<Text fontSize={'lg'}>Parser Table</Text>

					<ParserTable table={shiftReduceParser.table}/>

				</VStack>
			</HStack>

		</div>
	);
}

export default App;
