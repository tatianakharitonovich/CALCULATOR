let inputField = document.getElementById("disabledTextInput");
let resultField = document.getElementById("disabledTextResult");

function insertField (symbol) {
	inputField.value = inputField.value + symbol;
	checkInputEnd ();
	checkBrackets ();
	checkInputStart ();
	checkBracketStartAfter ();
	checkBracketEndAfter ();
	checkBracketStartBefore ();
	checkBracketEndBefore ();
	checkBeforeSinCos ();
	checkBeforeTgLnLg ();
}

function clean() {
	inputField.value = "";
	resultField.value = "";
}

function cleanSymbol() {
	inputField.value = inputField.value.substr(0, inputField.value.length - 1);
}

function calc() {
	checkBracketsCalc ();
	let resMath=inputField.value;
	resMath=resMath.replace('sin(','Math.sin(');
	resMath=resMath.replace('cos(','Math.cos(');
	resMath=resMath.replace('tg(','Math.tan(');
	resMath=resMath.replace('ln(','Math.log(');
	resMath=resMath.replace('lg(','Math.log10(');
	console.log(resMath);
	resultField.value =`=${+eval(resMath).toFixed(10)}`;
}

function checkBeforeSinCos () {
  let forbiddenSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  let forbiddenFunc = ["sin(", "cos("];
  let str = inputField.value;
  if (forbiddenFunc.includes(str.slice(str.length-4)) && forbiddenSymbols.includes(str[str.length-5]) ) {
  	inputField.value = inputField.value.substr(0, inputField.value.length - 4);
	}
}

function checkBeforeTgLnLg() {
  let forbiddenSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  let forbiddenFunc = ["tg(", "ln(", "lg("];
  let str = inputField.value;
  if (forbiddenFunc.includes(str.slice(str.length-3)) && forbiddenSymbols.includes(str[str.length-4]) ) {
  	inputField.value = inputField.value.substr(0, inputField.value.length - 3);
	}
}

// function tg() {
// 	let rad=+eval(inputField.value).toFixed(2)*Math.PI/180;
// 	let deg=+eval(inputField.value).toFixed(2);
// 	inputField.value=deg;
// 	resultField.value = `tg(${deg})=${+Math.tan(rad).toFixed(2)}`;
// }


function checkInputEnd () {
  let forbiddenSymbols = ["+", "*", "/", "-", "."];
  let str = inputField.value;
  if (forbiddenSymbols.includes(str[str.length-1]) &&
    forbiddenSymbols.includes(str[str.length-2]) ) {
  	cleanSymbol();
  }
}

function checkInputStart () {
  let forbiddenSymbols = ["+", "*", "/", ")", "."];
  let str = inputField.value;
  if (forbiddenSymbols.includes(str[0])) {
  	cleanSymbol();
  }
}

function checkBracketStartAfter () {
  let forbiddenSymbols = ["+", "*", "/", ")", "."];
  let str = inputField.value;
  if (str[str.length-2]==="(" && forbiddenSymbols.includes(str[str.length-1]) ) {
  	cleanSymbol();
  }
}

function checkBracketEndAfter () {
  let forbiddenSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "(", "."];
  let str = inputField.value;
  if (str[str.length-2]===")" && forbiddenSymbols.includes(str[str.length-1]) ) {
  	cleanSymbol();
  }
}

function checkBracketStartBefore () {
  let forbiddenSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  let str = inputField.value;
  if (str[str.length-1]==="(" && forbiddenSymbols.includes(str[str.length-2]) ) {
  	cleanSymbol();
  }
}

function checkBracketEndBefore () {
  let forbiddenSymbols = ["/", "*", "-", "+"];
  let str = inputField.value;
  if (str[str.length-1]===")" && forbiddenSymbols.includes(str[str.length-2]) ) {
  	cleanSymbol();
  }
}

function checkBrackets () {
	let str = inputField.value;
	let openBracket=0;
	let closeBracket=0;
	for (let symbol of str) {
		if (symbol==="(") {openBracket++;};
		if (symbol===")") {closeBracket++;};
	};
	if (openBracket < closeBracket) {
		cleanSymbol();
	}
}

function checkBracketsCalc () {
	let str = inputField.value;
	let openBracket=0;
	let closeBracket=0;
	for (let symbol of str) {
		if (symbol==="(") {openBracket++;};
		if (symbol===")") {closeBracket++;};
	};
	if (openBracket > closeBracket) {
		for (let i=1; i<=(openBracket-closeBracket); i++) {
			inputField.value=inputField.value + ")";
		}
	}
}

inputField.addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^\d()/*+.-]/g,'');
 });

inputField.addEventListener ('input', checkInputStart);

inputField.addEventListener ('input', checkInputEnd);

inputField.addEventListener ('input', checkBrackets);

inputField.addEventListener ('input', checkBracketStartAfter);

inputField.addEventListener ('input', checkBracketEndAfter);

inputField.addEventListener ('input', checkBracketStartBefore);

inputField.addEventListener ('input', checkBracketEndBefore);

inputField.addEventListener('keypress', function(event) {
	if (event.key === "=") {
		calc();
	} 
});