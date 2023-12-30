let operator = null;
let firstNum = null;
let secondNum = null;

const screenText = document.querySelector('.screen-text');
const deleteBtn = document.querySelector('#delete-btn');
const clearBtn = document.querySelector('#clear-btn');
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



document.addEventListener("DOMContentLoaded", () => {
    
  });