let inputField = document.getElementById("disabledTextInput");
let resultField = document.getElementById("disabledTextResult");

console.log(inputField);

function insertField (symbol) {
	inputField.value = inputField.value + symbol;
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

inputField.addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^\d()/*+.-]/g,'');
    checkInputEnd ();
});

inputField.addEventListener('keypress', function(event) {
	if (event.key === "=") {
		calc();
	} 
});

function checkInputEnd () {
	if (event.target.value[event.target.value.length-1] === "+") ||
	   (event.target.value[event.target.value.length-1] === "-") ||
	   (event.target.value[event.target.value.length-1] === "*") || 
	   (event.target.value[event.target.value.length-1] === "/") || 
	   (event.target.value[event.target.value.length-1] === ".") {
		event.target.value = event.target.value.replace(/[+*/.-]/g,'');
	}
}


