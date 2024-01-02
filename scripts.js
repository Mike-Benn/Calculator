// Status and value variables

let operator = null;
let firstNum = null;
let secondNum = null;
let lastButton = null;
let decimalActive = false;
let negativeActive = false;
let answerNegative = false;  // Specific status check where negative sign is used as the next button after an expression has been computed



// DOM element variables and MIN MAX for Calculator value limits

const MAXIMUM_NUMBER = 99999999999999;
const MINIMUM_NUMBER = -99999999999999;
const screenText = document.querySelector('.screen-text');
const operationText = document.querySelector('.operation-text');
const deleteBtn = document.querySelector('#delete-btn');
const clearBtn = document.querySelector('#clear-btn');
const negativeBtn = document.querySelector('#negative-btn');
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
    if (screenText.textContent[0] === "-") {
        negativeActive = true;
    } else {
        negativeActive = false;
    }

}

// Handles answer values and round them down when necessary to fit the calculator's character limit 
// Accepts a number and immediately checks if a negative number to adjust for character limit difference between negative and positive numbers
// Splits the string at its decimal point and checks the length of the returned array to determine if number is a float or not
// Finally calculates the precision required to ensure that value fits within the calculator's set character limit by subtracting the length

function roundValue(num) {
    let str = num + "";
    if (parseFloat(str) < 0) {
        if (str.length <= 15) {
            return str;

        } else {
            let subStr = str.slice(1);
            let strArray = subStr.split(".");

            if (strArray.length == 1) {
                let precision = 14 - strArray[0].length;
                str = (parseFloat(str)).toFixed(precision);
                return str + "";

            } else if (strArray.length == 2) {
                let precision = 13 - strArray[0].length;
                str = (parseFloat(str)).toFixed(precision);
                return parseFloat(str) + "";

            }
        } 
    } else {
        if (str.length <= 14) {
            return str;

        } else {
            let strArray = str.split(".");
            if (strArray.length == 1) {
                let precision = 14 - strArray[0].length;
                console.log(precision);
                str = (parseFloat(str)).toFixed(precision);
                return str + "";

            } else if (strArray.length == 2) {
                let precision;
                if (13 - strArray[0].length < 0) {
                    precision = 0;

                } else {
                    precision = 13 - strArray[0].length;

                }
                console.log(precision);
                str = (parseFloat(str)).toFixed(precision);
                return parseFloat(str) + "";

            }
        }
    }
}

// Handles arithmetic operations by checking what current operator is set to.  
// Checks if value will be out of range of the calculator's limits and adjusts accordingly if it is capping the value off at it's max/min limit 
// If value is within limit rounds to the nearest decimal place that allows value to fit into calculator's screen character limit

function operate() {
    if (operator === "/") {
        let total = firstNum / secondNum;
        if (total > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();

        } else if (total < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset();

        } else {
            screenText.textContent = roundValue(total);
            equalsReset();
            
        }

    } else if (operator === "x") {
        let total = firstNum * secondNum;
        if (total > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();

        } else if (total < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset();

        } else {
            screenText.textContent = roundValue(total);
            equalsReset();

        }

    } else if (operator === "+") {
        let total = firstNum + secondNum;
        if (total > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();

        } else if (total < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset();

        } else {
            screenText.textContent = roundValue(total);
            equalsReset();

        }
        
    } else if (operator === "-") {
        let total = firstNum - secondNum;
        if (total > MAXIMUM_NUMBER) {
            screenText.textContent = MAXIMUM_NUMBER + "";
            equalsReset();

        } else if (total < MINIMUM_NUMBER) {
            screenText.textContent = MINIMUM_NUMBER + "";
            equalsReset();

        } else {
            screenText.textContent = roundValue(total);
            equalsReset();

        }
    
    }
}

// Accepts string representing a numerical digit setting the screenText textContent value to that digit

function setScreenText(str) {
    screenText.textContent = str;
    lastButton = str;

}

// Helper for the four arithmetic button event listeners below when one of the operator buttons is clicked
// Is called when the firstNum has been assigned a non-null value, an operator has been assigned, and the last button pressed wasn't an operator 
// Sets secondNum to current screenText textContent value and then calls operate() 
// Return value is assigned to firstNum and operator is set to the operator associated with the button that was clicked
// Finishes by updating all status variables to their appropriate values based on the button that was clicked

function consecutiveOperator(str) {
    secondNum = parseFloat(screenText.textContent);
    operate();
    firstNum = parseFloat(screenText.textContent);
    lastButton = "operator";
    operator = str;
    updateScreenText(str);
    

}

// Accepts a string representing an operator
// Checks if firstNum is assigned and operator isn't set to the operator button clicked, operator will be reassigned to the operator button clicked

function changeOperator(str) {
    operator = str;
    lastButton = "operator";
    decimalActive = false;
    updateScreenText(str);

}

// Is called when an operator is clicked and the firstNum hasn't been set to a non-null value
// Accepts string representing an arithmetic operator and sets the firstNum to the current screenText textContent value and sets the operator to the string parameter

function setOperator(str) {
    firstNum = parseFloat(screenText.textContent);
    operator = str;
    lastButton = "operator";
    decimalActive = false;
    updateScreenText(str);

}

// Is called when an operator is clicked and the firstNum hasn't been set to a non-null value
// Accepts string representing an arithmetic operator and sets the operationText textContent to the expression that represents firstNum followed by the operator selected

function updateScreenText(str) {
    console.log(str);
    if (str === "x") {
        operationText.textContent = "" + firstNum + " × ";

    } else if (str === "/") {
        operationText.textContent = "" + firstNum + " ÷ ";

    } else if (str === "+") {
        operationText.textContent = "" + firstNum + " + ";

    } else if (str === "-") {
        operationText.textContent = "" + firstNum + " - ";

    }    
}

// ###########################################################
//                 Non-numerical Buttons             
// ###########################################################



// Main decimal point function that calls decimalHelper() when the decimal point button is clicked

function decimal() {
    decimalBtn.addEventListener('click' , decimalHelper);

}

// Deletes entire screenText textContent value setting it to "0"
// Changes decimal status and negative status to false to account for a decimal being deleted and negative being removed

function del() {
    deleteBtn.addEventListener('click' , () => {
        screenText.textContent = "0";
        decimalActive = false;
        negativeActive = false;
        answerNegative = false;

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
        negativeActive = false;
        answerNegative = false;

    })
}

// Calls operate when firstNum and operator have been assigned a value by setting the secondNum variable to the screenText textContent value and then calling operate()

function equals() {
    equalsBtn.addEventListener('click' , () => {
        if (operator !== null && firstNum !== null && lastButton !== "operator" || operator!== null && firstNum !== null && answerNegative == true && lastButton !== "operator") {
            secondNum = parseFloat(screenText.textContent);
            operate();

        }
    })
}

// Toggles whether current screenText textContent value is negative or not and adjusts negativeActive state accordingly
// Also includes check for a 0 as negative 0 is not a value typically seen on a standard calculator

function negative() {
    negativeBtn.addEventListener('click' , () => {
        if (screenText.textContent !== "0") {
            if (lastButton === "equals" || lastButton === "operator") {
                answerNegative = true;

            }
            if (negativeActive) {
                screenText.textContent = screenText.textContent.slice(1);
                negativeActive = false;
                lastButton = "negative";
                
            } else {
                screenText.textContent = "-" + screenText.textContent;
                negativeActive = true;
                lastButton = "negative";
                
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



// The following functions perform several different tasks pertaining to the four common arithmetic operators all of these functions behave very similarly

// If firstNum and operator have already been assigned a value and last button pressed isn't an operator when this button is clicked, sets current screenText to secondNum and calls operate() 
// Afterward it sets the result to firstNum and sets the operator to the operator button that was clicked



// If neither is true and firstNum is null then firstNum is assigned the current screenText textContent value and current operator is set to operator button clicked



// Multiplication

function times() {
    timesBtn.addEventListener('click' , () => {
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            consecutiveOperator("x");
            answerNegative = false;
            
        } else if (firstNum !== null && operator !== "x") {
            changeOperator("x");
            
        } else if (firstNum === null) {
            setOperator("x");
            
        }
    })
}

// Division

function divide() {
    divideBtn.addEventListener('click' , () => {
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            consecutiveOperator("/");
            
        } else if (firstNum !== null && operator !== "/") {
            changeOperator("/");

        } else if (firstNum === null) {
            setOperator("/");

        }
    })
}

// Addition

function add() {
    addBtn.addEventListener('click' , () => {
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            consecutiveOperator("+");
            
        } else if (firstNum !== null && operator !== "+") {
            changeOperator("+");

        } else if (firstNum === null) {
            setOperator("+");

        }
    })
}

// Minus

function minus() {
    minusBtn.addEventListener('click' , () => {
        if (operator !== null && firstNum !== null && lastButton !== "operator") {
            consecutiveOperator("-");
            
        } else if (firstNum !== null && operator !== "-") {
            changeOperator("-");

        } else if (firstNum === null) {
            setOperator("-");

        }
    })
}

// ###########################################################
//                      Numeric Buttons             
// ###########################################################



// Below buttons are the event listener functions for each of the numeric buttons
// When one of them is clicked the value associated with that button is fed into the numberListener() function which acts as a helper to all of the numeric buttons
// A check is made to make sure character limit isn't surpassed based on if values are negative or positive
// If either an operator or the equals button was the last button clicked a new screenText textContent value is started with the value of the button clicked
// If this isn't the case and character limit won't be exceeded, append the character associated with the button clicked to the end of screenText textContent

function numberListener(str) {
    if (parseFloat(screenText.textContent) < 0) {
        if (screenText.textContent.length <= 15) {
            if (lastButton === "operator" || lastButton === "equals" || lastButton === "negative") {
                console.log(lastButton);
                answerNegative = false;
                negativeActive = false;
                setScreenText(str);

            } else if (screenText.textContent === "0") {
                setScreenText(str);
                
            } else if (screenText.textContent.length < 15) {
                screenText.textContent = screenText.textContent + str;
                lastButton = str;
                
            }
        }

    } else {
        if (screenText.textContent.length <= 14) {
            if (lastButton === "operator" || lastButton === "equals" || lastButton === "negative") {
                answerNegative = false;
                negativeActive = false;
                setScreenText(str);

            } else if (screenText.textContent === "0") {
                setScreenText(str);

            } else if (screenText.textContent.length < 14) {
                screenText.textContent = screenText.textContent + str;
                lastButton = str;

            }
        }
    }
}

function numberZero() {
    zeroBtn.addEventListener('click' , () => {
        numberListener("0");
    })
}

function numberOne() {
    oneBtn.addEventListener('click' , () => {
        numberListener("1");

    })
}

function numberTwo() {
    twoBtn.addEventListener('click' , () => {
        numberListener("2");

    })
}

function numberThree() {
    threeBtn.addEventListener('click' , () => {
        numberListener("3");

    })
}

function numberFour() {
    fourBtn.addEventListener('click' , () => {
        numberListener("4");

    })
}

function numberFive() {
    fiveBtn.addEventListener('click' , () => {
        numberListener("5");

    })
}

function numberSix() {
    sixBtn.addEventListener('click' , () => {
        numberListener("6");

    })
}

function numberSeven() {
    sevenBtn.addEventListener('click' , () => {
        numberListener("7");

    })
}

function numberEight() {
    eightBtn.addEventListener('click' , () => {
        numberListener("8");

    })
}

function numberNine() {
    nineBtn.addEventListener('click' , () => {
        numberListener("9");

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
    negative();
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