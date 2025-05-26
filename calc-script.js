const calcTerminalContainer = document.getElementById("calc-teminal-container");
let runButtons = [];
let expressionInputs = [];

let outputValue = 0;

const allFunctions = {
    numfunctions: [
        "num(number, operatorOrOtherFunction)",
        "numSquared(number, operatorOrOtherFunction)",
        "numCubed(number, operatorOrOtherFunction)",
        "numToIndex(number, index, operatorOrOtherFunction)",
        "numSquareRoot(number, operatorOrOtherFunction)",
        "numCubeRoot(number, operatorOrOtherFunction)",
        "numToRoot(number, rootValue, operatorOrOtherFunction)",
        "numFactorial(number, operatorOrOtherFunction)"
    ],
    operatorFunctions: [
        "add(numOrOtherFunction)",
        "plus(numOrOtherFunction)",
        "minus(numOrOtherFunction)",
        "subtract(numOrOtherFunction)",
        "dividedBy(numOrOtherFunction)",
        "times(numOrOtherFunction)",
        "multipliedBy(numOrOtherFunction)"
    ],
    indexFunctions: [
        "numSquared(number, operatorOrOtherFunction)",
        "numCubed(number, operatorOrOtherFunction)",
        "numToIndex(number, index, operatorOrOtherFunction)",
        "squareAll(expression)",
        "cubeAll(expression)",
        "allToIndex(expression, index)"
    ],
    rootFunctions: [
        "numSquareRoot(number, operatorOrOtherFunction)",
        "numCubeRoot(number, operatorOrOtherFunction)",
        "numToRoot(number, rootValue, operatorOrOtherFunction)",
        "squareRootAll(expression)",
        "cubeRootAll(expression)",
        "allToRoot(expression, rootValue)"
    ],
    allFunctions: [
        "squareAll(expression)",
        "cubeAll(expression)",
        "allToIndex(expression, index)",
        "squareRootAll(expression)",
        "cubeRootAll(expression)",
        "allToRoot(expression, rootValue)",
        "allFactorial(expression)"
    ],
    otherFunctions: [
        "output(operatorOrOtherFunction)",
        "numFactorial(number, operatorOrOtherFunction)",
        "allFactorial(expression)",
        "randomInt(minValue, maxValue)",
        "randomNumToDp(minValue, maxValue, dPValue)",
        "inBrackets(brackettedPartOfExpression, operatorOrOtherFunction)"
    ]
}

const prohibitedCharacters = ["/", "*", "+", "-", "^", "%"];

getElements();

function getElements() {
    runButtons = Array.from(document.getElementsByClassName("run-button"));
    expressionInputs = Array.from(document.getElementsByClassName("expression-input"));
}

addEventsOnStartUp();

function addEventsOnStartUp() {
    for (let runButton of runButtons) {
        runButton.addEventListener("click", () => { if (runButton.nextElementSibling.value != "") { run(runButton) } });
    }
}

function run(button) {
    let expressionInputValue = button.nextElementSibling.value;
    expressionInputValue = expressionInputValue.split("").filter(char => prohibitedCharacters.includes(char) == false).join("");

    let outputTextLabel = document.createElement("label");
    let newExpressionLabel = document.createElement("label");
    newExpressionLabel.innerHTML = "< Expression >";
    createRunButtonAndExpressionInputFor(newExpressionLabel);

    //the isNaN part is to make sure the user can't just enter only numbers
    if (expressionInputValue == "" || isNaN(parseInt(expressionInputValue)) == false) {
        setOutputValue(error);
    }
    else {
        if (expressionInputValue.toLowerCase().includes("manual")) {
            runManualFunctions();

        }
        else if (expressionInputValue == "clear") {
            calcTerminalContainer.innerHTML = "";
        }
        else {
            calcInputtedExpression();
        }
    }

    calcTerminalContainer.appendChild(newExpressionLabel);
    getElements();


    function createRunButtonAndExpressionInputFor(label){
        let newRunButton = document.createElement("button");
        newRunButton.name = "run-button";
        newRunButton.classList.add(newRunButton.name);
        newRunButton.textContent = "Run";
        newRunButton.addEventListener('click', () => { if (newRunButton.nextElementSibling.value != "") { run(newRunButton) } });

        let newExpressionInput = document.createElement("input");
        newExpressionInput.name = "expression-input";
        newExpressionInput.classList.add(newExpressionInput.name);
        newExpressionInput.spellcheck = false; 
        newExpressionInput.placeholder = "Type here...";

        label.append(newRunButton, newExpressionInput);
    }

    function runManualFunctions() {
        let splitInput = expressionInputValue.toLowerCase().split(" ");
        //first if statement is to make sure the first word is manual
        if (splitInput[0] != "manual") {
            setOutputValue(error);
        }
        else {
            for (let tag in allFunctions) {
                if (String(tag).toLowerCase().includes(splitInput[1]) == true) {
                   setOutputValue(allFunctions[tag].join("<br/>"));
                }
            }
        }

        calcTerminalContainer.appendChild(outputTextLabel);
    }

    function calcInputtedExpression(){
        if (expressionInputValue.split("").filter(char => char == "(").length != expressionInputValue.split("").filter(char => char == ")").length) {
            setOutputValue(error);
        }
        else {
            //removes the space between the numbers to avoid an instance where num(3 * 6) would return an error because it was changed (* is prohibited) to num(3 6) instead of num(36)
            //also returns an actual mathematical expression (e.g, 5 + 5);
            let inputToExpression = eval(expressionInputValue.split("").filter(char => char != " ").join(""));
            outputValue = eval(inputToExpression)
            setOutputValue(eval(outputValue));
        }

        calcTerminalContainer.appendChild(outputTextLabel);
    }

    function setOutputValue(outputTextValue){
        let outputTextElement = document.createElement("span");
        outputTextElement.name = "output-value";
        outputTextElement.innerHTML = outputTextValue;

        outputTextLabel.textContent = "< Output >";
        outputTextLabel.appendChild(outputTextElement);
    }
}


//calc number functions
function num(number, operatorOrOtherFunction) {
    if (operatorOrOtherFunction == null) {
        return number;
    }
    else {
        return String(number + operatorOrOtherFunction);
    }
}

function numSquared(number, operatorOrOtherFunction) {
    if (operatorOrOtherFunction == null) {
        return Math.pow(number, 2);
    }
    else {
        return String(Math.pow(number, 2) + operatorOrOtherFunction);
    }
}

function numCubed(number, operatorOrOtherFunction) {
    if (operatorOrOtherFunction == null) {
        return Math.pow(number, 3);
    }
    else {
        return String(Math.pow(number, 3) + operatorOrOtherFunction);
    }
}

function numToIndex(number, index, operatorOrOtherFunction) {
    if (operatorOrOtherFunction == null) {
        return Math.pow(number, index);
    }
    else {
        return String(Math.pow(number, index) + operatorOrOtherFunction);
    }
}

function numSquareRoot(number, operatorOrOtherFunction) {
    if (operatorOrOtherFunction == null) {
        return Math.pow(number, 1 / 2);
    }
    else {
        return String(Math.pow(number, 1 / 2) + operatorOrOtherFunction);
    }
}

function numCubeRoot(number, operatorOrOtherFunction) {
    if (operatorOrOtherFunction == null) {
        return Math.pow(number, 1 / 3);
    }
    else {
        return String(Math.pow(number, 1 / 3) + operatorOrOtherFunction);
    }
}

function numToRoot(number, rootValue, operatorOrOtherFunction) {
    if (operatorOrOtherFunction == null) {
        return Math.pow(number, 1 / rootValue);
    }
    else {
        return String(Math.pow(number, 1 / rootValue) + operatorOrOtherFunction);
    }
}

function numFactorial(number, operatorOrOtherFunction) {
    let factorialValue = 1;

    for (i = number; i > 1; i--) {
        factorialValue *= i;
    }

    if (operatorOrOtherFunction == null) {
        return factorialValue;
    }
    else {
        return String(factorialValue + operatorOrOtherFunction);
    }
}

//apply to all(return of all functions nested in it) functions
function squareAll(expression) {
    return String(Math.pow(eval(expression), 2));
}
function cubeAll(expression) {
    return String(Math.pow(eval(expression), 3));
}
function allToIndex(expression, index) {
    return String(Math.pow(eval(expression), index));
}
function squareRootAll(expression) {
    return String(Math.pow(eval(expression), 1 / 2));
}
function cubeRootAll(expression) {
    return String(Math.pow(eval(expression), 1 / 3));
}
function allToRoot(expression, rootValue) {
    return String(Math.pow(eval(expression), 1 / rootValue));
}
function allFactorial(expression) {
    let factorialValue = 1;

    for (i = eval(expression); i > 1; i--) {
        factorialValue *= i;
    }

    return String(factorialValue);
}



//operators
function add(numOrOtherFunction) {
    return "+" + numOrOtherFunction;
}
function plus(numOrOtherFunction) {
    return "+" + numOrOtherFunction;
}

function minus(numOrOtherFunction) {
    return "-" + numOrOtherFunction;
}
function subtract(numOrOtherFunction) {
    return "-" + numOrOtherFunction;
}

function dividedBy(numOrOtherFunction) {
    return "/" + numOrOtherFunction;
}

function times(numOrOtherFunction) {
    return "*" + numOrOtherFunction;
}
function multipliedBy(numOrOtherFunction) {
    return "*" + numOrOtherFunction;
}

//other functions
function output(operatorOrOtherFunction) {
    if(operatorOrOtherFunction == null){
        return outputValue;
    }
    else{
        return String(outputValue + operatorOrOtherFunction);
    }
}
function inBrackets(brackettedPartOfExpression, operatorOrOtherFunction){
    if(operatorOrOtherFunction == null){
        return "(" + brackettedPartOfExpression + ")";
    }
    else{
        return "(" + brackettedPartOfExpression + ")" + operatorOrOtherFunction;
    }
}
function randomInt(minNum, maxNum) {
    return Math.round((Math.random() * (maxNum - minNum)) + minNum);
}
function randomNumToDp(minNum, maxNum, dPValue) {
    return Number((Math.random() * (maxNum - minNum) + minNum).toFixed(dPValue));
}