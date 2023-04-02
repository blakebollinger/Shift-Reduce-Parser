import { cardAnatomy } from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers, extendTheme} from "@chakra-ui/react";
import {accordionTheme} from "./Accordion";
import {kbdTheme} from "./Kbd";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(cardAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
	// define the part you're going to style
	container: {
		backgroundColor: "gray",
		// _hover: {
		// 	bg: 'gray.500'
		// }
	},
});

const sizes = {
	md: definePartsStyle({
		container: {
			borderRadius: "8"
		}
	})
};

// export the component theme
export const cardTheme = defineMultiStyleConfig({
	baseStyle,
	sizes,
	// variants,
	defaultProps: {
		// define which size and variant is applied by default
		size: "md",
		variant: "funky"
	},
});

export const theme = extendTheme({
	components: {
		Card: cardTheme,
		Accordion: accordionTheme,
		Kbd: kbdTheme
	},
	styles: {
		global: () => ({
			body: {
				fontFamily: 'mono',
			},
		}),
	},
});