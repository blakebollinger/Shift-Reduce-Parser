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
	remainingInput: string;
}

function ShiftCard({number, symbol, stack, remainingInput}: ShiftCardParams) {

	// Map the stack to kbds
	const stackDisplay = stack.map((s) => <Kbd key={Math.random()}>{s}</Kbd>);

	return (
		<Card data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-once={'true'} w={'100%'}>
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
							<Text fontSize={'md'} align={'left'}>Stack now consists of: {stackDisplay}</Text>
							<Text fontSize={'md'} align={'left'}>Remaining input is: <Kbd>{remainingInput}</Kbd></Text>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</CardBody>
		</Card>
	);

}

export default ShiftCard;