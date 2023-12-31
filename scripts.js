let operator = null;
let firstNum = null;
let secondNum = null;
let lastButton = null;

const MAXIMUM_NUMBER = 99999999999999;
const MINIMUM_NUMBER = -99999999999999;
const screenText = document.querySelector('.screen-text');
const deleteBtn = document.querySelector('#delete-btn');
const clearBtn = document.querySelector('#clear-btn');
const equalsBtn = document.querySelector('#equals-btn');
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

function equalsReset() {
    lastButton = "equals";
    firstNum = null;
    secondNum = null;
    operator = null;

}

function del() {
    deleteBtn.addEventListener('click' , () => {
        if (screenText.textContent.length == 1) {
            screenText.textContent = "0";
        } else {
            screenText.textContent = screenText.textContent.slice(0 , screenText.textContent.length - 1);
        }
    })

}

function clear() {
    clearBtn.addEventListener('click' , () => {
        screenText.textContent = "0";
        operator = null;
        firstNum = null;
        secondNum = null;
        lastButton = null;
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
            screenText.textContent = (firstNum / secondNum) + "";
            equalsReset();

        }

    } else if (operator === "x") {
        if (firstNum * secondNum > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();
        } else if (firstNum * secondNum < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset()
        } else {
            screenText.textContent = (firstNum * secondNum) + "";
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
            screenText.textContent = (firstNum + secondNum) + "";
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
            screenText.textContent = (firstNum - secondNum) + "";
            equalsReset();
        }
    
    }
}

function equals() {
    equalsBtn.addEventListener('click' , () => {
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            secondNum = parseInt(screenText.textContent);
            operate();
        }
    })
}

function times() {
    timesBtn.addEventListener('click' , () => {
        
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            secondNum = parseInt(screenText.textContent);
            operate();
            firstNum = parseInt(screenText.textContent);
            operator = "x";
            lastButton = "operator";
            
        } else if (firstNum !== null && operator !== "x") {
            operator = "x";
            lastButton = "operator";

        } else if (firstNum === null) {
            firstNum = parseInt(screenText.textContent);
            operator = "x";
            lastButton = "operator";
        
        }
            
    })
}

function divide() {
    divideBtn.addEventListener('click' , () => {
        
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            secondNum = parseInt(screenText.textContent);
            operate();
            firstNum = parseInt(screenText.textContent);
            operator = "x";
            lastButton = "operator";
            
        } else if (firstNum !== null && operator !== "x") {
            operator = "x";
            lastButton = "operator";

        } else if (firstNum === null) {
            firstNum = parseInt(screenText.textContent);
            operator = "x";
            lastButton = "operator";
        
        }
            
    })
}

function add() {
    addBtn.addEventListener('click' , () => {
        
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            secondNum = parseInt(screenText.textContent);
            operate();
            firstNum = parseInt(screenText.textContent);
            operator = "+";
            lastButton = "operator";
            
        } else if(firstNum !== null && operator !== "+") {
            operator = "+";
            lastButton = "operator";

        } else if (firstNum === null) {
            firstNum = parseInt(screenText.textContent);
            operator = "+";
            lastButton = "operator";
        
        }
            
    })
}

function minus() {
    minusBtn.addEventListener('click' , () => {
        
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            secondNum = parseInt(screenText.textContent);
            operate();
            firstNum = parseInt(screenText.textContent);
            operator = "-";
            lastButton = "operator";
            
        } else if (firstNum !== null && operator !== "-") {
            operator = "-";
            lastButton = "operator";
        } else if (firstNum === null) {
            firstNum = parseInt(screenText.textContent);
            operator = "-";
            lastButton = "operator";
        
        }
            
    })
}

function numberOne() {
    oneBtn.addEventListener('click' , () => {
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
    })
}

function numberTwo() {
    twoBtn.addEventListener('click' , () => {
        if (screenText.textContent.length < 14) {
            if (lastButton === "operator" || lastButton === "equals") {
                screenText.textContent = "2";
                lastButton = "2";

            } else if (screenText.textContent === "0") {
                screenText.textContent = "2";
                lastButton = "2";

            } else if (screenText.textContent.length < 14) {
                screenText.textContent = screenText.textContent + "2";
                lastButton = "2"

            }
        }
    })
}

function numberThree() {
    threeBtn.addEventListener('click' , () => {
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
    })
}

function numberFour() {
    fourBtn.addEventListener('click' , () => {
        if (screenText.textContent.length < 14) {
            if (lastButton === "operator" || lastButton === "equals") {
                screenText.textContent = "4";
                lastButton = "4";

            } else if (screenText.textContent === "0") {
                screenText.textContent = "4";
                lastButton = "4";

            } else if (screenText.textContent.length < 14) {
                screenText.textContent = screenText.textContent + "4";
                lastButton = "4"

            }
        }
    })
}

function numberFive() {
    fiveBtn.addEventListener('click' , () => {
        if (screenText.textContent.length < 14) {
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
    })
}

function numberSix() {
    sixBtn.addEventListener('click' , () => {
        if (screenText.textContent.length < 14) {
            if(lastButton === "operator" || lastButton === "equals") {
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
    })
}

function numberSeven() {
    sevenBtn.addEventListener('click' , () => {
        if (screenText.textContent.length < 14) {
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
    })
}

function numberEight() {
    eightBtn.addEventListener('click' , () => {
        if (screenText.textContent.length < 14) {
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
    })
}

function numberNine() {
    nineBtn.addEventListener('click' , () => {
        if (screenText.textContent.length < 14) {
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
    })
}

document.addEventListener("DOMContentLoaded", () => {
    clear();
    del();
    equals();
    times();
    add();
    minus();
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