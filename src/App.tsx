import React, { useState, useRef } from "react";
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

	let parseGrammar = () => {
		// setParsingSteps(shiftReduceParser.table.parseGrammar(grammarToParse).join('\n'));

		const calculatedSteps = shiftReduceParser.table.parseGrammar(grammarToParse).join('\n');

		let cards = [] as JSX.Element[];
		let steps = calculatedSteps.split('\n');

		for (let i = 0; i < steps.length; i++) {
			let step = steps[i];
			let stepNumber = i + 1;

			// @ts-ignore
			let stepText = step.match(/[a-zA-Z]+/g)[step.match(/[a-zA-Z]+/g).length - 1];

			let stack = step.match(/\d+/g) as string[];
			cards.push(<ShiftCard key={stepNumber} number={stepNumber} symbol={stepText} stack={stack}/>);
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
						<Textarea boxShadow='dark-lg' value={inputGrammar} onChange={(e) => setInputGrammar(e.target.value)} resize={'vertical'}/>
					</VStack>
					<Button onClick={() => setShiftReduceParser(new ShiftReduceParser(inputGrammar.split('\n')))} colorScheme='blue'>Generate Parser Table</Button>
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
					{/*<Textarea boxShadow='dark-lg' w={'60%'} h={'220px'} value={parsingSteps} isDisabled resize={'vertical'}/>*/}

					{/*<ShiftCard number={1} symbol={"id"} stack={["0", "id"]} />*/}
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
