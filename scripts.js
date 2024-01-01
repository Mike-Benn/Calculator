let operator = null;
let firstNum = null;
let secondNum = null;
let lastButton = null;
let decimalActive = false;

const MAXIMUM_NUMBER = 99999999999999;
const MINIMUM_NUMBER = -99999999999999;
const screenText = document.querySelector('.screen-text');
const operationText = document.querySelector('.operation-text');
const deleteBtn = document.querySelector('#delete-btn');
const clearBtn = document.querySelector('#clear-btn');
const equalsBtn = document.querySelector('#equals-btn');
const zeroBtn = document.querySelector('#zero-btn');
const oneBtn = document.querySelector('#one-btn');
const twoBtn = document.querySelector('#two-btn');
const threeBtn = document.querySelector('#three-btn');
const fourBtn = document.querySelector('#four-btn');
const fiveBtn = document.querySelector('#five-btn');
const sixBtn = document.querySelector('#six-btn');
const sevenBtn = document.querySelector('#seven-btn');
const eightBtn = document.querySelector('#eight-btn');
const nineBtn = document.querySelector('#nine-btn');
const decimalBtn = document.querySelector('#decimal-btn');
const timesBtn = document.querySelector('#times-btn');
const divideBtn = document.querySelector('#divide-btn');
const addBtn = document.querySelector('#add-btn');
const minusBtn = document.querySelector('#minus-btn');


function isDecimalActive() {
    if (screenText.textContent.split(".").length > 1) {
        decimalActive = true;
    } else {
        decimalActive = false;
    }
}


function equalsReset() {
    lastButton = "equals";
    operationText.textContent = operationText.textContent + secondNum + " =";
    if (screenText.textContent.includes("e-")) {
        screenText.textContent = "0";
    } 
    firstNum = null;
    secondNum = null;
    operator = null;
    decimalActive = false;


}



function roundValue(num) {
    let str = num + "";
    if (parseFloat(str) < 0) {
        if (str.length <= 15) {
            return str;
        } else {
            let subStr = str.slice(1);
            let strArray = subStr.split(".");
            let precision = 13 - strArray[0].length;
            str = (parseFloat(str)).toFixed(precision);
            return str + "";
            
        } 
    } else {
        if (str.length <= 14) {
            return str;
        } else {
            let strArray = str.split(".");
            let precision = 13 - strArray[0].length;
            str = (parseFloat(str)).toFixed(precision);
            return str + "";
        }
    }

}

function del() {
    deleteBtn.addEventListener('click' , () => {
        if (screenText.textContent.length == 1) {
            screenText.textContent = "0";
        } else if (screenText.textContent.slice(screenText.textContent.length - 1 , screenText.textContent.length) === ".") {
            decimalActive = false;
            screenText.textContent = screenText.textContent.slice(0 , screenText.textContent.length - 1);
        } else {
            screenText.textContent = screenText.textContent.slice(0 , screenText.textContent.length - 1);
        }
    })

}

function clear() {
    clearBtn.addEventListener('click' , () => {
        screenText.textContent = "0";
        operationText.textContent = "";
        operator = null;
        firstNum = null;
        secondNum = null;
        lastButton = null;
        decimalActive = false;
    })
}

function operate() {
    if (operator === "/") {
        if (firstNum / secondNum > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();

        } else if (firstNum / secondNum < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset();

        } else {
            screenText.textContent = roundValue(firstNum / secondNum);
            equalsReset();
            console.log(screenText.textContent);

        }

    } else if (operator === "x") {
        if (firstNum * secondNum > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();
        } else if (firstNum * secondNum < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset()
        } else {
            screenText.textContent = roundValue(firstNum * secondNum);
            equalsReset();
        }

    } else if (operator === "+") {
        if (firstNum + secondNum > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();
        } else if (firstNum + secondNum < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset();
        } else {
            screenText.textContent = roundValue(firstNum + secondNum);
            equalsReset();
        }
        
    } else if (operator === "-") {
        if (firstNum - secondNum > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();
        } else if (firstNum - secondNum < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset();
        } else {
            screenText.textContent = roundValue(firstNum - secondNum);
            equalsReset();
        }
    
    }
}

function equals() {
    equalsBtn.addEventListener('click' , () => {
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            if (screenText.textContent.split(".").length > 1) {
                secondNum = parseFloat(screenText.textContent);
                operate();
                
            } else {
                secondNum = parseInt(screenText.textContent);
                operate();
                

            }
        }
    })
}

function times() {
    timesBtn.addEventListener('click' , () => {
        
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            if (screenText.textContent.split(".").length > 1) {
                secondNum = parseFloat(screenText.textContent);
                operate();
                if (screenText.textContent.split(".").length > 1) {
                    firstNum = parseFloat(screenText.textContent);
                } else {
                    firstNum = parseInt(screenText.textContent);
                }
                operationText.textContent = "" + firstNum + " × ";
                operator = "x";
                lastButton = "operator";
            } else {
                secondNum = parseInt(screenText.textContent);
                operate();
                if (screenText.textContent.split(".").length > 1) {
                    firstNum = parseFloat(screenText.textContent);
                } else {
                    firstNum = parseInt(screenText.textContent);
                }
                operationText.textContent = "" + firstNum + " × ";
                operator = "x";
                lastButton = "operator";
            }
            
        } else if (firstNum !== null && operator !== "x") {
            operator = "x";
            lastButton = "operator";
            decimalActive = false;
            operationText.textContent = "" + firstNum + " × ";

        } else if (firstNum === null) {
            if (screenText.textContent.split(".").length > 1) {
                firstNum = parseFloat(screenText.textContent);
            } else {
                firstNum = parseInt(screenText.textContent);
            }
            operator = "x";
            lastButton = "operator";
            decimalActive = false;
            operationText.textContent = "" + firstNum + " × ";
        
        }
            
    })
}

function divide() {
    divideBtn.addEventListener('click' , () => {
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            if (screenText.textContent.split(".").length > 1) {
                secondNum = parseFloat(screenText.textContent);
                operate();
                if (screenText.textContent.split(".").length > 1) {
                    firstNum = parseFloat(screenText.textContent);
                } else {
                    firstNum = parseInt(screenText.textContent);
                }
                operationText.textContent = "" + firstNum + " ÷ ";
                operator = "/";
                lastButton = "operator";
                
            } else {
                secondNum = parseInt(screenText.textContent);
                operate();
                if (screenText.textContent.split(".").length > 1) {
                    firstNum = parseFloat(screenText.textContent);
                } else {
                    firstNum = parseInt(screenText.textContent);
                }
                operationText.textContent = "" + firstNum + " ÷ ";
                operator = "/";
                lastButton = "operator";
            }
            
        } else if (firstNum !== null && operator !== "/") {
            operator = "/";
            lastButton = "operator";
            decimalActive = false;
            operationText.textContent = "" + firstNum + " ÷ ";

        } else if (firstNum === null) {
            if (screenText.textContent.split(".").length > 1) {
                firstNum = parseFloat(screenText.textContent);
            } else {
                firstNum = parseInt(screenText.textContent);
            }
            operationText.textContent = "" + firstNum + " ÷ ";
            operator = "/";
            lastButton = "operator";
            decimalActive = false;
        
        }
            
    })
}

function add() {
    addBtn.addEventListener('click' , () => {
        
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            if (screenText.textContent.split(".").length > 1) {
                secondNum = parseFloat(screenText.textContent);
                operate();
                if (screenText.textContent.split(".").length > 1) {
                    firstNum = parseFloat(screenText.textContent);
                } else {
                    firstNum = parseInt(screenText.textContent);
                }
                operationText.textContent = "" + firstNum + " + ";
                operator = "+";
                lastButton = "operator";
            } else {
                secondNum = parseInt(screenText.textContent);
                operate();
                if (screenText.textContent.split(".").length > 1) {
                    firstNum = parseFloat(screenText.textContent);
                } else {
                    firstNum = parseInt(screenText.textContent);
                }
                operationText.textContent = "" + firstNum + " + ";
                operator = "+";
                lastButton = "operator";
            }
            
            
        } else if(firstNum !== null && operator !== "+") {
            operator = "+";
            lastButton = "operator";
            decimalActive = false;
            operationText.textContent = "" + firstNum + " + ";

        } else if (firstNum === null) {
            if (screenText.textContent.split(".").length > 1) {
                firstNum = parseFloat(screenText.textContent);
            } else {
                firstNum = parseInt(screenText.textContent);
            }
            operationText.textContent = "" + firstNum + " + ";
            operator = "+";
            lastButton = "operator";
            decimalActive = false;
        
        }
            
    })
}

function minus() {
    minusBtn.addEventListener('click' , () => {
        
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            if (screenText.textContent.split(".").length > 1) {
                secondNum = parseFloat(screenText.textContent);
                operate();
                if (screenText.textContent.split(".").length > 1) {
                    firstNum = parseFloat(screenText.textContent);
                } else {
                    firstNum = parseInt(screenText.textContent);
                }
                operationText.textContent = "" + firstNum + " - ";
                operator = "-";
                lastButton = "operator";
            } else {
                secondNum = parseInt(screenText.textContent);
                operate();
                if (screenText.textContent.split(".").length > 1) {
                    firstNum = parseFloat(screenText.textContent);
                } else {
                    firstNum = parseInt(screenText.textContent);
                }
                operationText.textContent = "" + firstNum + " - ";
                operator = "-";
                lastButton = "operator";
            }
            
        } else if (firstNum !== null && operator !== "-") {
            operator = "-";
            lastButton = "operator";
            decimalActive = false;
            operationText.textContent = "" + firstNum + " - ";

        } else if (firstNum === null) {
            if (screenText.textContent.split(".").length > 1) {
                firstNum = parseFloat(screenText.textContent);
            } else {
                firstNum = parseInt(screenText.textContent);
            }
            operationText.textContent = "" + firstNum + " - ";
            operator = "-";
            lastButton = "operator";
            decimalActive = false;
        
        }
            
    })
}

function decimalHelper() {
    if (decimalActive == false) {
        if (parseInt(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    decimalActive = true;
                    screenText.textContent = "0.";
                    lastButton = "decimal";

                } else if (screenText.textContent.length < 14) {
                    decimalActive = true;
                    screenText.textContent = screenText.textContent + ".";
                    lastButton = "decimal";
                }
            }
        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    decimalActive = true;
                    screenText.textContent = "0.";
                    lastButton = "decimal";
                } else if (screenText.textContent.length < 14) {
                    decimalActive = true;
                    screenText.textContent = screenText.textContent + ".";
                    lastButton = "decimal";
                }
            }
        }
    }
}

function decimal() {
    decimalBtn.addEventListener('click' , decimalHelper);
}

function numberZero() {
    zeroBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "0";
                    lastButton = "0";
                } else if (screenText.textContent === "0") {
                    lastButton = "0";
                
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "0";
                    lastButton = "0";
        
                }
            }
        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "0";
                    lastButton = "0";
                } else if (screenText.textContent === "0") {
                    lastButton ="0";
                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "0";
                    lastButton = "0";

                }
            }
        }
    })
}

function numberOne() {
    oneBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "1";
                    lastButton = "1";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "1";
                    lastButton = "1";
                    
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "1";
                    lastButton = "1";
                    
                }
            }

        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "1";
                    lastButton = "1";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "1";
                    lastButton = "1";

                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "1";
                    lastButton = "1";

                }
            }
        }
    })
}

function numberTwo() {
    twoBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "2";
                    lastButton = "2";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "2";
                    lastButton = "2";
                    
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "2";
                    lastButton = "2";
                    
                }
            }

        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "2";
                    lastButton = "2";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "2";
                    lastButton = "2";

                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "2";
                    lastButton = "2";

                }
            }
        }
    })
}




function numberThree() {
    threeBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "3";
                    lastButton = "3";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "3";
                    lastButton = "3";
                    
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "3";
                    lastButton = "3";
                    
                }
            }

        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "3";
                    lastButton = "3";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "3";
                    lastButton = "3";

                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "3";
                    lastButton = "3";

                }
            }
        }
    })
}


function numberFour() {
    fourBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "4";
                    lastButton = "4";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "4";
                    lastButton = "4";
                    
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "4";
                    lastButton = "4";
                    
                }
            }

        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "4";
                    lastButton = "4";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "4";
                    lastButton = "4";

                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "4";
                    lastButton = "4";

                }
            }
        }
    })
}


function numberFive() {
    fiveBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "5";
                    lastButton = "5";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "5";
                    lastButton = "5";
                    
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "5";
                    lastButton = "5";
                    
                }
            }

        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "5";
                    lastButton = "5";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "5";
                    lastButton = "5";

                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "5";
                    lastButton = "5";

                }
            }
        }
    })
}


function numberSix() {
    sixBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "6";
                    lastButton = "6";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "6";
                    lastButton = "6";
                    
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "6";
                    lastButton = "6";
                    
                }
            }

        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "6";
                    lastButton = "6";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "6";
                    lastButton = "6";

                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "6";
                    lastButton = "6";

                }
            }
        }
    })
}



function numberSeven() {
    sevenBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "7";
                    lastButton = "7";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "7";
                    lastButton = "7";
                    
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "7";
                    lastButton = "7";
                    
                }
            }

        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "7";
                    lastButton = "7";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "7";
                    lastButton = "7";

                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "7";
                    lastButton = "7";

                }
            }
        }
    })
}

function numberEight() {
    eightBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "8";
                    lastButton = "8";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "8";
                    lastButton = "8";
                    
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "8";
                    lastButton = "8";
                    
                }
            }

        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "8";
                    lastButton = "8";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "8";
                    lastButton = "8";

                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "8";
                    lastButton = "8";

                }
            }
        }
    })
}

function numberNine() {
    nineBtn.addEventListener('click' , () => {
        if (parseFloat(screenText.textContent) < 0) {
            if (screenText.textContent.length <= 15) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "9";
                    lastButton = "9";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "9";
                    lastButton = "9";
                    
                } else if (screenText.textContent.length < 15) {
                    screenText.textContent = screenText.textContent + "9";
                    lastButton = "9";
                    
                }
            }

        } else {
            if (screenText.textContent.length <= 14) {
                if (lastButton === "operator" || lastButton === "equals") {
                    screenText.textContent = "9";
                    lastButton = "9";

                } else if (screenText.textContent === "0") {
                    screenText.textContent = "9";
                    lastButton = "9";

                } else if (screenText.textContent.length < 14) {
                    screenText.textContent = screenText.textContent + "9";
                    lastButton = "9";

                }
            }
        }
    })
}


document.addEventListener("DOMContentLoaded", () => {
    clear();
    del();
    equals();
    times();
    divide();
    add();
    minus();
    decimal();
    numberZero();
    numberOne();
    numberTwo();
    numberThree();
    numberFour();
    numberFive();
    numberSix();
    numberSeven();
    numberEight();
    numberNine();
    
  });