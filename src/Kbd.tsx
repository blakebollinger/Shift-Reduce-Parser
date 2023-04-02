import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
	color: 'black',
	// border: "2px dashed",
	background: `gray.500`,
	borderColor: `gray.900`,
	_dark: {
		background: `gray.300`,
	},	// borderRadius: 0, // disable the border radius
})

export const kbdTheme = defineStyleConfig({
	baseStyle
})