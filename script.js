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
	resultField.value = +eval(inputField.value).toFixed(15);
};

inputField.addEventListener('keyup', function () {
    inputField.value = inputField.value.replace(/[^\d()/*+=-]/,'');
});

inputField.addEventListener('keydown', function() {
	if (event.key=="=") {
		calc();
		cleanSymbol();
	} 
});


