// Status and value variables

let operator = null;
let firstNum = null;
let secondNum = null;
let lastButton = null;
let decimalActive = false;



// DOM element variables and MIN MAX for Calculator value limits

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



// ###########################################################
//              Miscellaneous Helper Functions             
// ###########################################################



// Resets states of many variables to null and rounds answer value to 0 once scientific notation values with negative exponents appear

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

// Handles answer values and round them down when necessary to fit the calculator's character limit 

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

// Handles arithmetic operations by checking what current operator is set to.  
// Checks if value will be out of range of the calculator's limits and adjusts accordingly if it is capping the value off at it's max/min limit

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
            
        }

    } else if (operator === "x") {
        if (firstNum * secondNum > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();

        } else if (firstNum * secondNum < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset();

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

// ###########################################################
//                 Non-numerical Buttons             
// ###########################################################



// Main decimal point function that calls decimalHelper() when the decimal point button is clicked

function decimal() {
    decimalBtn.addEventListener('click' , decimalHelper);

}

// Deletes one character from the end of the current screenText textContent value 
// Changes decimal status to false if deleted character is decimal point

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

// Sets screenText textContent to 0 and resets all status variables to their default values, resets the calculator to its base state

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

// Calls operate when first number and operator have been assigned a value by setting the secondNum variable to the screenText textContent value and then calling operate()

function equals() {
    equalsBtn.addEventListener('click' , () => {
        if (operator !== null && firstNum !== null) {
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

// Helper function that is called in main decimal function when the decimal point button is clicked
// Appends decimal point to end of screenText textContent value if there isn't a decimal point already active on the current value

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



// ###########################################################
//                Arithmetic Operator Buttons             
// ###########################################################



// The following functions erform several different tasks pertaining to the four common arithmetic operators and all behave very similarly

// If firstNum and operator have already been assigned a value and last button pressed isn't an operator when this button is clicked, sets current screenText to secondNum and calls operate() 
// Afterward it sets the result to firstNum and sets the operator to the operator button that was clicked

// If firstNum is assigned and operator isn't set to the operator button clicked, operator will be reassigned to the operator button clicked

// If neither is true and firstNum is null then firstNum is assigned the current screenText textContent value and current operator is set to operator button clicked



// Multiplication

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

// Division

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

// Addition

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

// Subtraction

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



// ###########################################################
//                      Numeric Buttons             
// ###########################################################



// Below buttons are the event listener functions for each of the numeric buttons
// When one of them is clicked a check is made to make sure character limit isn't surpassed based on if values are negative or positive
// If either an operator or the equals button was the last button clicked a new screenText textContent value is started with the value of the button clicked
// If this isn't the case and character limit won't be exceeded, append the character associated with the button clicked to the end of screenText textContent



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





// Initial setup of button event listeners on DOMContentLoaded

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