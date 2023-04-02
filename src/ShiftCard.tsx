import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Card,
	CardBody,
	Kbd, Text
} from "@chakra-ui/react";
import React from "react";


interface ShiftCardParams {
	number: number;
	symbol: string;
	stack: string[];
}

function ShiftCard({number, symbol, stack}: ShiftCardParams) {

	return (
		<Card w={'100%'}>
			<CardBody>
				<Accordion allowMultiple>
					<AccordionItem border='none' _hover={{ bg: "gray.500", boxShadow: 'none'}}>
						<h2>
							<AccordionButton>
								<Box as="span" flex='1' textAlign='left'>
									{number}) Shift <Kbd>{symbol}</Kbd> onto the stack
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<Text fontSize={'md'}>Stack now consists of {stack}</Text>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</CardBody>
		</Card>
	);

}

export default ShiftCard;