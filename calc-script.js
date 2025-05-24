const calcTerminalContainer = document.getElementById("calc-teminal-container");
let runButtons = Array.from(document.getElementsByClassName("run-button"));
let calcInputs = Array.from(document.getElementsByClassName("calc-input"));

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

addEvents();

function addEvents() {
    for (let runButton of runButtons) {
        runButton.addEventListener("click", () => { if (runButton.nextElementSibling.value != "") { run(runButton) } });
    }
}

function run(button) {
    let calcInputValue = button.nextElementSibling.value;
    calcInputValue = calcInputValue.split("").filter(char => prohibitedCharacters.includes(char) == false).join("");

    let outputText = document.createElement("label");
    let newExpression = document.createElement("label");
    newExpression.innerHTML = "< New Expression >" + " <button name='run-button' class='run-button'>Run</button><input spellcheck='false' type='text' placeholder='Type here...' name='calc-input' class='calc-input'>";

    //the isNaN part is to make sure the user can't just enter only numbers
    if(calcInputValue == "" || isNaN(parseInt(calcInputValue)) == false) {
        outputText.innerHTML = "< Output > <span name='output-value'>error</span>";
    }
    else {
        if(calcInputValue.toLowerCase().includes("manual")) {
            let splitInput = calcInputValue.toLowerCase().split(" ");
            //first if statement is to make sure the first word is manual
            if(splitInput[0] != "manual") {
                outputText.innerHTML = "< Output > <span name='output-value'>error</span>";
            }
            else {
                for(let tag in allFunctions){
                    if(String(tag).toLowerCase().includes(splitInput[1]) == true){
                        outputText.innerHTML = "< Output > <span name='output-value'>" + allFunctions[tag].join("<br/>") + "</span>";
                    }
                }
            }

            calcTerminalContainer.appendChild(outputText);
        }
        else if (calcInputValue == "clear") {
            calcTerminalContainer.innerHTML = "";
        }
        else {
            if (calcInputValue.split("").filter(char => char == "(").length != calcInputValue.split("").filter(char => char == ")").length) {
                outputText.innerHTML = "< Output > <span name='output-value'>error</span>";
            }
            else {
                //removes the space between the numbers to avoid an instance where num(3 * 6) would return an error because it was changed to num(3 6) instead of num(36)
                outputValue = eval(calcInputValue.split("").filter(char => char != " ").join(""));
                outputText.innerHTML = "< Output > " + "<span name='output-value'>" + outputValue + "</span>";
            }

            calcTerminalContainer.appendChild(outputText);
        }
    }

    calcTerminalContainer.appendChild(newExpression);

    runButtons = Array.from(document.getElementsByClassName("run-button"));
    calcInputs = Array.from(document.getElementsByClassName("calc-input"));

    addEvents();
}


//calc number functions
function num(number, operator) {
    if (operator == null) {
        return number;
    }
    else {
        return eval(number + operator);
    }
}

function numSquared(number, operator) {
    if (operator == null) {
        return Math.pow(number, 2);
    }
    else {
        return eval(Math.pow(number, 2) + operator);
    }
}

function numCubed(number, operator) {
    if (operator == null) {
        return Math.pow(number, 3);
    }
    else {
        return eval(Math.pow(number, 3) + operator);
    }
}

function numToIndex(number, index, operator) {
    if (operator == null) {
        return Math.pow(number, index);
    }
    else {
        return eval(Math.pow(number, index) + operator);
    }
}

function numSquareRoot(number, operator) {
    if (operator == null) {
        return Math.pow(number, 1 / 2);
    }
    else {
        return eval(Math.pow(number, 1 / 2) + operator);
    }
}

function numCubeRoot(number, operator) {
    if (operator == null) {
        return Math.pow(number, 1 / 3);
    }
    else {
        return eval(Math.pow(number, 1 / 3) + operator);
    }
}

function numToRoot(number, rootValue, operator) {
    if (operator == null) {
        return Math.pow(number, 1 / rootValue);
    }
    else {
        return eval(Math.pow(number, 1 / rootValue) + operator);
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
        return eval(factorialValue + operator);
    }
}

//apply to all(return of all functions nested in it) functions
function squareAll(expression) {
    return eval(Math.pow(eval(expression), 2));
}
function cubeAll(expression) {
    return eval(Math.pow(eval(expression), 3));
}
function allToIndex(expression, index) {
    return eval(Math.pow(eval(expression), index));
}
function squareRootAll(expression) {
    return eval(Math.pow(eval(expression), 1 / 2));
}
function cubeRootAll(expression) {
    return eval(Math.pow(eval(expression), 1 / 3));
}
function allToRoot(expression, rootValue) {
    return eval(Math.pow(eval(expression), 1 / rootValue));
}
function allFactorial(expression) {
    let factorialValue = 1;

    for (i = eval(expression); i > 1; i--) {
        factorialValue *= i;
    }

    return factorialValue;
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
function randomInt(minNum, maxNum){
    return Math.round((Math.random() * (maxNum - minNum)) + minNum);
}
function randomNumToDp(minNum, maxNum, dPValue){
    return eval((Math.random() * (maxNum - minNum) + minNum).toFixed(dPValue));
}