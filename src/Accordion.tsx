import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import {
	createMultiStyleConfigHelpers,
	defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(parts.keys);

// default base style from the Input theme
const baseStyle = definePartsStyle({
	container: defineStyle({
		boxShadow: "sm",
		// _focus: {
		// 	boxShadow: "outline",
		// },
		_hover: {
			// boxShadow: "none",
		}
	}),
});

const size = {
	md: defineStyle({
		w: 5,
		h: 5,
	}),
};

const sizes = {
	md: definePartsStyle({
		icon: size.md,
	}),
};

export const accordionTheme = defineMultiStyleConfig({
	baseStyle,
	sizes,
	defaultProps: {
		size: "md",
		variant: "outline",
	},
});