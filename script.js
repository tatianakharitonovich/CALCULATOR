let inputField = document.getElementById("disabledTextInput");
let resultField = document.getElementById("disabledTextResult");

console.log(inputField);

function insertField (symbol) {
	inputField.value = inputField.value + symbol;
	checkInputEnd ();
	checkBrackets ();
	checkInputStart ();
	checkBracketStartAfter ();
	checkBracketEndAfter ();
	checkBracketStartBefore ();
	checkBracketEndBefore ();
}

function clean() {
	inputField.value = "";
	resultField.value = "";
}

function cleanSymbol() {
	inputField.value = inputField.value.substr(0, inputField.value.length - 1);
}

function calc() {
	resultField.value = +eval(inputField.value).toFixed(10);
}

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
	if (str[str.length-1] ===")") {
		let pos1 = -1;
		let i=0;
		while ((pos1 = str.indexOf("(", pos1 + 1)) != -1) {
			i++;
		};
		let pos2 = -1;
		let j=0;
		while ((pos2 = str.indexOf(")", pos2 + 1)) != -1) {
			j++;
		};
		if (i >= j) {
			inputField.value = inputField.value;
		} else {
			cleanSymbol();
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