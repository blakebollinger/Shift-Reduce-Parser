import React from 'react';
import './App.css';
import {
	Text,
	Textarea,
	Flex,
	Table,
	TableContainer,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Spacer,
    VStack
} from '@chakra-ui/react';

function App() {
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

					<TableContainer >
					<Table variant='simple' size={'sm'}>
						<TableCaption>Generated from the Input Grammar</TableCaption>
						<Thead>
							<Tr>
								<Th>Action</Th>
								<Th></Th>
								<Th>Goto</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>State</Td>
								<Td></Td>
								<Td></Td>
							</Tr>
							<Tr>
								<Td>0</Td>
								<Td></Td>
								<Td ></Td>
							</Tr>
							<Tr>
								<Td>1</Td>
								<Td></Td>
								<Td></Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
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
