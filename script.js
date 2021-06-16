let inputField = document.getElementById("disabledTextInput");
let resultField = document.getElementById("disabledTextResult");

function insertField (symbol) {
	inputField.value = inputField.value + symbol;
	checkInputLenght ();	
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
	inputField.classList.remove('input_text');
	inputField.classList.remove('input_text_small');
	resultField.classList.remove('input_text');
	resultField.classList.remove('input_text_small');
}

function cleanSymbol() {
	let str = inputField.value;

  if (str.slice(str.length-4)==='sin(' || str.slice(str.length-4)==='cos(') {
  	inputField.value = inputField.value.substr(0, inputField.value.length - 4);
  	return;
  }

  if (str.slice(str.length-3)==='lg(' || 
  	str.slice(str.length-3)==='ln(' || 
  	str.slice(str.length-3)==='tg(') {
  	inputField.value = inputField.value.substr(0, inputField.value.length - 3);
  	return;
  }

  inputField.value = inputField.value.substr(0, inputField.value.length - 1);
}

function calc() {
	if (inputField.value[inputField.value.length-1]==="(") {
		resultField.value = "Неверный ввод";
		return;
	};

	checkBracketsCalc ();

	let resMath=inputField.value;
	resMath=resMath.replaceAll('sin(','Math.sin(');
	resMath=resMath.replaceAll('cos(','Math.cos(');
	resMath=resMath.replaceAll('tg(','Math.tan(');
	resMath=resMath.replaceAll('ln(','Math.log(');
	resMath=resMath.replaceAll('lg(','Math.log10(');
	
	resultField.value =`=${+eval(resMath).toFixed(10)}`;

	if (resultField.value.length > 19 && resultField.value.length < 28) {
		resultField.classList.add('input_text');
	};

	if (resultField.value.length >= 28) {
		resultField.classList.add('input_text_small');
	};
}

function checkInputLenght () {
	if (inputField.value.length > 19 && inputField.value.length < 28) {
		inputField.classList.add('input_text');
	};

	if (inputField.value.length >= 28) {
		inputField.classList.add('input_text_small');
	};
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

function checkSin () {
  let str = inputField.value;
  if (str[str.length-1]==="s") {
  	cleanSymbol ();
  	inputField.value=inputField.value + "sin(";
  }
}

function checkCos () {
  let str = inputField.value;
  if (str[str.length-1]==="c") {
  	cleanSymbol ();
  	inputField.value=inputField.value + "cos(";
  }
}

function checkTg () {
  let str = inputField.value;
  if (str[str.length-1]==="t") {
  	cleanSymbol ();
  	inputField.value=inputField.value + "tg(";
  }
}

function checkLn () {
  let str = inputField.value;
  if (str[str.length-1]==="l") {
  	cleanSymbol ();
  	inputField.value=inputField.value + "ln(";
  }
}

function checkLg () {
  let str = inputField.value;
  if (str[str.length-1]==="g") {
  	cleanSymbol ();
  	inputField.value=inputField.value + "lg(";
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
	let s = openBracket - closeBracket;
	if (openBracket > closeBracket) {
		for (let i=1; i <= s; i++) {
			inputField.value=inputField.value + ")";
		}
	}
}

inputField.addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^\d()/*+.sincolgt-]/g,'');
 });

inputField.addEventListener ('input', checkInputLenght);

inputField.addEventListener ('input', checkInputStart);

inputField.addEventListener ('input', checkInputEnd);

inputField.addEventListener ('input', checkBrackets);

inputField.addEventListener ('input', checkBracketStartAfter);

inputField.addEventListener ('input', checkBracketEndAfter);

inputField.addEventListener ('input', checkBracketStartBefore);

inputField.addEventListener ('input', checkBracketEndBefore);

inputField.addEventListener ('input', checkSin);

inputField.addEventListener ('input', checkCos);

inputField.addEventListener ('input', checkTg);

inputField.addEventListener ('input', checkLg);

inputField.addEventListener ('input', checkLn);

inputField.addEventListener('keypress', function(event) {
	if (event.key === "=") {
		calc();
	} 
});

inputField.addEventListener('keydown', function(event) {
	if (event.key === "Backspace") {
		let str = inputField.value;

		if (str.slice(str.length-4)==='sin(' || str.slice(str.length-4)==='cos(') {
  		inputField.value = inputField.value.substr(0, inputField.value.length - 3);
  		return;
  	};

  	if (str.slice(str.length-3)==='lg(' || 
  		str.slice(str.length-3)==='ln(' || 
  		str.slice(str.length-3)==='tg(') {
  		inputField.value = inputField.value.substr(0, inputField.value.length - 2);
  		return;
  	}
	} 
});