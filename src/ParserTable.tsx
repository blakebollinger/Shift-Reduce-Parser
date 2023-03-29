import {Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React from "react";
import { ParserTableModel } from "./ParserTableModel";

interface RTable {
	table: ParserTableModel;
}

function ParserTable({table}: RTable) {

	const rows = table.rows.map((row) => {

		const actionItems = row.actions.map((actions) => {
			return <Td>{actions}</Td>;
		});

		const goToItems = row.goTo.map((goTo) => {
			return <Td>{goTo}</Td>;
		});

		return (
			<Tr>
				<Td>{row.state}</Td>
				{actionItems}
				{goToItems}
			</Tr>
		);
	});

	return (

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
					{rows}
				</Tbody>
			</Table>
		</TableContainer>

	)
}


export default ParserTable