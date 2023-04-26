
# Shift-Reduce-Parser

This repository contains a web implementation of a shift-reduce parser. You can view the parser live at https://srp.blakebollinger.dev

## What is a Shift-Reduce Parser?

A shift-reduce parser is a type of bottom-up parser for context-free grammars. It works by shifting input onto a stack and then reducing the stack to a non-terminal symbol when a production rule is matched.

The parser operates in two main steps: the shift step and the reduce step. In the shift step, the parser reads the next input symbol and pushes it onto the stack. In the reduce step, the parser checks if the top symbols on the stack match any production rules. If they do, the parser pops those symbols off the stack and replaces them with the non-terminal symbol on the left-hand side of the production rule.

The parser continues to alternate between these two steps until either all input has been consumed and the stack contains only the start symbol (in which case parsing is successful), or no further reductions are possible (in which case parsing fails).

## How to Use

### Prerequisites

This project requires [Node.js](https://nodejs.org/en/) to be installed on your machine.

After Node.js is installed, you can run the following commands in the project directory:

### `npm install`

This will install all the dependencies required to run the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

(Note: The output of this folder can be found at https://srp.blakebollinger.dev)
