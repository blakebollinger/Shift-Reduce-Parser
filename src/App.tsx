import React from 'react';
import './App.css';
import {
	Text,
	Textarea,
	Flex,
	Spacer,
    VStack
} from '@chakra-ui/react';
import ParserTableModel from "./ParserTableModel";
import ParserTable from "./ParserTable";
import ParserRow from "./ParserRow";

function App() {

	const tableModel = new ParserTableModel([new ParserRow(0, ['S'], ['S'])]);

	return (
		<div className="App">
			<Text>Welcome to my Shift Reduce Parser!</Text>

			<Flex p={'5%'}>

				<VStack w={'40%'}>
					<Text fontSize={'lg'}>Input Grammar</Text>
					<Textarea resize={'none'}/>
				</VStack>

				<Spacer />

				<VStack w={'40%'}>
					<Text fontSize={'lg'}>Parser Table</Text>

					<ParserTable table={tableModel}/>

				</VStack>

			</Flex>

			<VStack w={'40%'} m={'auto'}>
				<Text fontSize={'lg'}>Parsing Steps</Text>
				<Textarea isDisabled resize={'none'}/>
			</VStack>

		</div>
	);
}

export default App;
