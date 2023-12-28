let operator = null;
let firstNum = null;
let secondNum = null;



function operate(operator , num1 , num2) {
    if (operator === "/") {
        return num1 / num2;
    } else if (operator === "x") {
        return num1 * num2;
    } else if (operator === "+") {
        return num1 + num2;
    } else if (operator === "-") {
        return num1 - num2;
    }
}