let inputField = document.getElementsByName("inputfield")[0];
let resultField = document.getElementsByName("result")[0];

console.log(inputField);

function insertField (symbol) {
	inputField.value = inputField.value + symbol;
};

function clean() {
	inputField.value = "";
	resultField.value = "";
};

function cleanSymbol() {
	inputField.value = inputField.value.substr(0, inputField.value.length - 1);
};

function calc() {
	resultField.value = eval(inputField.value);
};

// const operators = {
//     '+': (x, y) => x + y,
//     '-': (x, y) => x - y,
//     '*': (x, y) => x * y,
//     '/': (x, y) => x / y
// };

// function calcNew () {
// 	evaluate (inputField.value);
// }

// let evaluate = (expr) => {
//     let stack = [];

//     expr.split('').forEach((token) => {
//         if (token in operators) {
//             let [y, x] = [stack.pop(), stack.pop()];
//             stack.push(operators[token](x, y));
//         } else {
//             stack.push(parseFloat(token));
//         }
//     });

//     return resultField.value = stack.pop();
// };


