const calcTerminalContainer = document.getElementById("calc-teminal-container");
let runButtons = [];
let expressionInputs = [];

let outputValue = 0;

const allFunctions = {
    numfunctions: [
        "num(number, operator)",
        "numSquared(number, operator)",
        "numCubed(number, operator)",
        "numToIndex(number, index, operator)",
        "numSquareRoot(number, operator)",
        "numCubeRoot(number, operator)",
        "numToRoot(number, rootValue, operator)",
        "numFactorial(number, operator)"
    ],
    operatorFunctions: [
        "add(number)",
        "plus(number)",
        "minus(number)",
        "subtract(number)",
        "dividedBy(number)",
        "times(number)",
        "multipliedBy(number)"
    ],
    indexFunctions: [
        "numSquared(number, operator)",
        "numCubed(number, operator)",
        "numToIndex(number, index, operator)",
        "squareAll(expression)",
        "cubeAll(expression)",
        "allToIndex(expression, index)"
    ],
    rootFunctions: [
        "numSquareRoot(number, operator)",
        "numCubeRoot(number, operator)",
        "numToRoot(number, rootValue, operator)",
        "squareRootAll(expression)",
        "cubeRootAll(expression)",
        "allToRoot(rootValue, expression)"
    ],
    allFunctions: [
        "squareAll(expression)",
        "cubeAll(expression)",
        "allToIndex(expression, index)",
        "squareRootAll(expression)",
        "cubeRootAll(expression)",
        "allToRoot(rootValue, expression)",
        "allFactorial(expression)"
    ],
    otherFunctions: [
        "output()",
        "numFactorial(number, operator)",
        "allFactorial(expression)",
        "randomInt(minValue, maxValue)",
        "randomNumToDp(minValue, maxValue, dPValue)"
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
            setOutputValue(eval(inputToExpression));
        }

        calcTerminalContainer.appendChild(outputTextLabel);
    }

    function setOutputValue(outputValue){
        let outputTextElement = document.createElement("span");
        outputTextElement.name = "output-value";
        outputTextElement.innerHTML = outputValue;

        outputTextLabel.textContent = "< Output >";
        outputTextLabel.appendChild(outputTextElement);
    }
}


//calc number functions
function num(number, operator) {
    if (operator == null) {
        return number;
    }
    else {
        return String(number + operator);
    }
}

function numSquared(number, operator) {
    if (operator == null) {
        return Math.pow(number, 2);
    }
    else {
        return String(Math.pow(number, 2) + operator);
    }
}

function numCubed(number, operator) {
    if (operator == null) {
        return Math.pow(number, 3);
    }
    else {
        return String(Math.pow(number, 3) + operator);
    }
}

function numToIndex(number, index, operator) {
    if (operator == null) {
        return Math.pow(number, index);
    }
    else {
        return String(Math.pow(number, index) + operator);
    }
}

function numSquareRoot(number, operator) {
    if (operator == null) {
        return Math.pow(number, 1 / 2);
    }
    else {
        return String(Math.pow(number, 1 / 2) + operator);
    }
}

function numCubeRoot(number, operator) {
    if (operator == null) {
        return Math.pow(number, 1 / 3);
    }
    else {
        return String(Math.pow(number, 1 / 3) + operator);
    }
}

function numToRoot(number, rootValue, operator) {
    if (operator == null) {
        return Math.pow(number, 1 / rootValue);
    }
    else {
        return String(Math.pow(number, 1 / rootValue) + operator);
    }
}

function numFactorial(number, operator) {
    let factorialValue = 1;

    for (i = number; i > 1; i--) {
        factorialValue *= i;
    }

    if (operator == null) {
        return factorialValue;
    }
    else {
        return String(factorialValue + operator);
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
function add(number) {
    return "+" + number;
}
function plus(number) {
    return "+" + number;
}

function minus(number) {
    return "-" + number;
}
function subtract(number) {
    return "-" + number;
}

function dividedBy(number) {
    return "/" + number;
}

function times(number) {
    return "*" + number;
}
function multipliedBy(number) {
    return "*" + number;
}

//other functions
function output() {
    return outputValue;
}
function randomInt(minNum, maxNum) {
    return Math.round((Math.random() * (maxNum - minNum)) + minNum);
}
function randomNumToDp(minNum, maxNum, dPValue) {
    return Number((Math.random() * (maxNum - minNum) + minNum).toFixed(dPValue));
}