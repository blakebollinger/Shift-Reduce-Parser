import React, { useState } from 'react';
import './App.css';
import {
	Text,
	Textarea,
	VStack, Button, HStack
} from "@chakra-ui/react";
import ParserTable from "./ParserTable";
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
	const [parsingSteps, setParsingSteps] = useState("");

	let parseGrammar = () => {
		setParsingSteps(shiftReduceParser.table.parseGrammar(grammarToParse).join('\n'));
	}

	return (
		<div className="App">
			<Text>Welcome to my Shift Reduce Parser!</Text>

			<HStack p={'5%'} h={'20%'} align={'top'} justify={'center'} spacing={'50px'}>

				<VStack w={'30%'} spacing={'30px'}>
					<VStack w={'100%'}>
						<Text fontSize={'lg'}>Input Grammar</Text>
						<Textarea value={inputGrammar} onChange={(e) => setInputGrammar(e.target.value)} resize={'vertical'}/>
					</VStack>
					<Button onClick={() => setShiftReduceParser(new ShiftReduceParser(inputGrammar.split('\n')))} colorScheme='blue'>Generate Parser Table</Button>
				</VStack>

				<VStack w={'30%'} spacing={'30px'}>
					<VStack w={'100%'}>
						<Text fontSize={'lg'}>Grammar to Parse</Text>
						<Textarea value={grammarToParse} onChange={(e) => setGrammarToParse(e.target.value)} resize={'vertical'}/>
					</VStack>
					<Button onClick={parseGrammar} colorScheme='blue'>Parse</Button>
				</VStack>

			</HStack>

			<HStack align={'top'} justify={'space-evenly'} w={'100%'} p={'5%'} spacing={'50px'}>

				<VStack w={'50%'} >
					<Text fontSize={'lg'}>Parsing Steps</Text>
					<Textarea w={'60%'} h={'220px'} value={parsingSteps} isDisabled resize={'vertical'}/>
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
