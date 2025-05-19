let runButtons = Array.from(document.getElementsByClassName("run-button"));
let calcInputs = Array.from(document.getElementsByClassName("calc-input"));

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



//operators
function add(number){
    return "+" + String(number);
}

function minus(number){
    return "-" + String(number);
}

function dividedBy(number){
    return "/" + String(number);
}
function multipliedBy(number){
    return "*" + String(number);
}