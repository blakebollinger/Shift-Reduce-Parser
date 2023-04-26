import {Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React from "react";
import { ParserTableModel } from "./ParserTableModel";

interface RTable {
	table: ParserTableModel;
}

function ParserTable({table}: RTable) {

	const rows = table.states.map((state, i) => {

		const actions = [];
		// For each key in the actions list, create a new td with the value
		for (const value of Object.values(state.action)) {
			actions.push(<Td key={Math.random()}>{value}</Td>)
		}

		const gotoLabels = [];
		// For each key in the goTo list, create a new td with the value
		for (const value of Object.values(state.goTo)) {

			if (value === -1) {
				gotoLabels.push(<Td key={Math.random()}></Td>)
			} else
			gotoLabels.push(<Td key={Math.random()}>{value}</Td>)
		}

		return (
			<Tr key={i}>
				<Td>{state.state}</Td>
				{actions}
				<Td></Td>
				<Td></Td>
				<Td></Td>
				{gotoLabels}
			</Tr>
		);
	});

	// Make a list that contains all the action ids
	const actionIds = table.actionIds.map((id, i) => {

		return (
			<Td key={i}>
				{id}
			</Td>
		)

	});

	// Make a list that contains all the goto ids
	const gotoIds = table.goToIds.map((id, i) => {

		return (
			<Td key={i}>
				{id}
			</Td>
		)

	});

	// Make a header row that contains all the action ids and goto ids
	const header = (
		<Tr>
			<Td>State</Td>
			{actionIds}
			<Td></Td>
			<Td></Td>
			<Td></Td>
			{gotoIds}
		</Tr>
	);


	return (

		<TableContainer >
			<Table variant='simple' size={'sm'}>
				<TableCaption>Generated from the Input Grammar</TableCaption>
				<Thead>
					<Tr>
						<Td></Td>
						<Th></Th>
						<Th></Th>
						<Td>Action</Td>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Td>Goto</Td>
						<Td></Td>

					</Tr>
				</Thead>
				<Tbody>
					{header}
					{rows}
				</Tbody>
			</Table>
		</TableContainer>

	)
}


export default ParserTable