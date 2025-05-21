const calcTerminalContainer = document.getElementById("calc-teminal-container");
let runButtons = Array.from(document.getElementsByClassName("run-button"));
let calcInputs = Array.from(document.getElementsByClassName("calc-input"));

let outputValue = 0;

const numFunctions = [
    "num(number, operator)",
    "numSquared(number, operator)",
    "numCubed(number, operator)",
    "numToIndex(number, index, operator)",
    "numSquareRoot(number, operator)",
    "numCubeRoot(number, operator)",
    "numToRoot(number, rootValue, operator)"
]

const operatorFunctions = [
    "add(number)",
    "plus(number)",
    "minus(number)",
    "subtract(number)",
    "dividedBy(number)",
    "times(number)",
    "multipliedBy(number)"
]

const indexFunctions = [
    "squareAll(expression)",
    "cubeAll(expression)",
    "allToIndex(index, expression)",
    "squareRootAll(expression)",
    "cubeRootAll(expression)",
    "allToRoot(rootValue, expression)"
]

const otherFunctions = [
    "output()"
]

const prohibitedCharacters = ["/", "*", "+", "-", "^", "%"];

addEvents();

function addEvents(){
    for(let runButton of runButtons){
        runButton.addEventListener("click", () => {if(runButton.nextElementSibling.value != ""){run(runButton)}});
    }
}

function run(button){
    let nextInput = button.nextElementSibling;
    nextInput.value = nextInput.value.split("").filter(char => prohibitedCharacters.includes(char) == false).join("");

    let outputText = document.createElement("label");
    let newExpression = document.createElement("label");
    newExpression.innerHTML = "// New Expression: " + " <button class='run-button'>Run</button><input spellcheck='false' type='text' placeholder='Type here...' class='calc-input'>";
    
    //the isNaN part is to make sure the user can't just enter only numbers
    if(nextInput.value == "" || isNaN(parseInt(nextInput.value)) == false){
        outputText.innerHTML = "// Output: <span>error</span>";
    }
    else{
        if(nextInput.value.includes("manual")){
            let splitInput = nextInput.value.toLowerCase().split(" ");
            //first if statement is to make sure the first word is manual
            if(splitInput[0] != "manual"){
                outputText.innerHTML = "// Output: <span>error</span>";
            }
            else if(splitInput[1] == "number" || splitInput[1] == "num"){
                outputText.innerHTML = "// Output: " + "<span>" + numFunctions.join("<br/>") + "</span>";
            }
            else if(splitInput[1] == "operator"){
                outputText.innerHTML = "// Output: " + "<span>" + operatorFunctions.join("<br/>") + "</span>";
            }
            else if(splitInput[1] == "index" || splitInput[1] == "root"){
                outputText.innerHTML = "// Output: " + "<span>" + indexFunctions.join("<br/>") + "</span>";
            }
            else if(splitInput[1] == "other"){
                outputText.innerHTML = "// Output: " + "<span>" + otherFunctions.join("<br/>") + "</span>";
            }
            else{
                outputText.innerHTML = "// Output: <span>error</span>";
            }

            calcTerminalContainer.appendChild(outputText);
        }
        else if(nextInput.value == "clear"){
            calcTerminalContainer.innerHTML = "";
        }
        else{
            if(nextInput.value.split("").filter(char => char == "(").length != nextInput.value.split("").filter(char => char == ")").length){
                outputText.innerHTML = "// Output: <span>error</span>";
            }
            else{
                //removes the space between the numbers to avoid an instance where num(3 * 6) would return an error because it was changed to num(3 6) instead of num(36)
                outputValue = eval(nextInput.value.split("").filter(char => char != " ").join(""));
                outputText.innerHTML = "// Output: " + "<span>" + outputValue + "</span>";
            }
            
            calcTerminalContainer.appendChild(outputText);
        }
    }
    
    calcTerminalContainer.appendChild(newExpression);

    runButtons = Array.from(document.getElementsByClassName("run-button"));
    calcInputs = Array.from(document.getElementsByClassName("calc-input"));

    addEvents();
}


//number functions
function num(number, operator){
    if(operator == null){
        return number;
    }
    else{
        return eval(number + operator);
    }
}

function numSquared(number, operator){
    if(operator == null){
        return Math.pow(number, 2);
    }
    else{
        return eval(Math.pow(number, 2) + operator);
    }
}

function numCubed(number, operator){
    if(operator == null){
        return Math.pow(number, 3);
    }
    else{
        return eval(Math.pow(number, 3) + operator);
    }
}

function numToIndex(number, index, operator){
    if(operator == null){
        return Math.pow(number, index);
    }
    else{
        return eval(Math.pow(number, index) + operator);
    }
}

function numSquareRoot(number, operator){
    if(operator == null){
        return Math.pow(number, 1/2);
    }
    else{
        return eval(Math.pow(number, 1/2) + operator);
    }
}

function numCubeRoot(number, operator){
    if(operator == null){
        return Math.pow(number, 1/3);
    }
    else{
        return eval(Math.pow(number, 1/3) + operator);
    }
}

function numToRoot(number, rootValue, operator){
    if(operator == null){
        return Math.pow(number, 1/rootValue);
    }
    else{
        return eval(Math.pow(number, 1/rootValue) + operator);
    }
}

function squareAll(expression){
    return eval(Math.pow(eval(expression), 2));
}
function cubeAll(expression){
    return eval(Math.pow(eval(expression), 3));
}
function allToIndex(index, expression){
    return eval(Math.pow(eval(expression), index));
}

function squareRootAll(expression){
    return eval(Math.pow(eval(expression), 1/2));
}
function cubeRootAll(expression){
    return eval(Math.pow(eval(expression), 1/3));
}
function allToRoot(rootValue, expression){
    return eval(Math.pow(eval(expression), 1/rootValue));
}

function output(){
    return outputValue;
}



//operators
function add(number){
    return "+" + number;
}
function plus(number){
    return "+" + number;
}

function minus(number){
    return "-" + number;
}
function subtract(number){
    return "-" + number;
}

function dividedBy(number){
    return "/" + number;
}

function times(number){
    return "*" + number;
}
function multipliedBy(number){
    return "*" + number;
}