let runButtons = Array.from(document.getElementsByClassName("run-button"));
let calcInputs = Array.from(document.getElementsByClassName("calc-input"));

let outputValue = 0;

addEvents();

function addEvents(){
    for(buttons of runButtons){
        buttons.addEventListener("click", run);
    }
}

function run(){
    let nextInput = this.nextElementSibling;

    let outputText = document.createElement("label");
    let newExpression = document.createElement("label");
    newExpression.innerHTML = "// New Expression: " + " <button class='run-button'>Run</button><input spellcheck='false' type='text' placeholder='Type here...' class='calc-input'>";
    
    //the isNaN part is to make sure the user can't just enter only numbers
    if(nextInput.value == "" || isNaN(parseInt(nextInput.value)) == false){
        outputText.textContent = "// Output: error";
    }
    else{
        outputValue = eval(nextInput.value);
        outputText.textContent = "// Output: " + eval(outputValue);
    }
    

    document.body.appendChild(outputText);
    document.body.appendChild(newExpression);

    runButtons = Array.from(document.getElementsByClassName("run-button"));
    calcInputs = Array.from(document.getElementsByClassName("calc-input"));

    addEvents();
}


//number functions
function num(number, operator){
    if(operator == null){
        return String(number);
    }
    else{
        return String(number + operator);
    }
}

function numSquared(number, operator){
    if(operator == null){
        return String(Math.pow(number, 2));
    }
    else{
        return String(Math.pow(number, 2) + operator);
    }
}

function numCubed(number, operator){
    if(operator == null){
        return String(Math.pow(number, 3));
    }
    else{
        return String(Math.pow(number, 3) + operator);
    }
}

function numToIndex(number, index, operator){
    if(operator == null){
        return String(Math.pow(number, index));
    }
    else{
        return String(Math.pow(number, index) + operator);
    }
}

function numSquareRoot(number, operator){
    if(operator == null){
        return String(Math.pow(number, 1/2));
    }
    else{
        return String(Math.pow(number, 1/2) + operator);
    }
}

function numCubeRoot(number, operator){
    if(operator == null){
        return String(Math.pow(number, 1/3));
    }
    else{
        return String(Math.pow(number, 1/3) + operator);
    }
}

function numToRoot(number, rootValue, operator){
    if(operator == null){
        return String(Math.pow(number, 1/rootValue));
    }
    else{
        return String(Math.pow(number, 1/rootValue) + operator);
    }
}

function squareAll(expression){
    return String(Math.pow(eval(expression), 2));
}
function cubeAll(expression){
    return String(Math.pow(eval(expression), 3));
}
function allToIndex(index, expression){
    return String(Math.pow(eval(expression), index));
}

function squareRootAll(expression){
    return String(Math.pow(eval(expression), 1/2));
}
function cubeRootAll(expression){
    return String(Math.pow(eval(expression), 1/3));
}
function allToRoot(rootValue, expression){
    return String(Math.pow(eval(expression), 1/rootValue));
}

function output(){
    return String(outputValue);
}



//operators
function add(number){
    return "+" + String(number);
}
function plus(number){
    return "+" + String(number);
}

function minus(number){
    return "-" + String(number);
}
function subtract(number){
    return "-" + String(number);
}

function dividedBy(number){
    return "/" + String(number);
}

function times(number){
    return "*" + String(number);
}
function multipliedBy(number){
    return "*" + String(number);
}