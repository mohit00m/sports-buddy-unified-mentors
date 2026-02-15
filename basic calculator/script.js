const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const toggle = document.getElementById("themeToggle");




let input = "";

// Theme toggle
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggle.checked);
});
buttons.forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.innerText));
});

function handleInput(value) {
  if (value === "C") {
    input = "";
    display.value = "";
    return;
  }

  if (value === "=") {
    display.value = calculate(input);
    input = display.value.toString();
    return;
  }

  input += value;
  display.value = input;
}

// Safe calculation
function calculate(expression) {
  try {
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
    if (!tokens) return "Error";

    let stack = [];
    let num = Number(tokens[0]);
    stack.push(num);

    for (let i = 1; i < tokens.length; i += 2) {
      let operator = tokens[i];
      let nextNum = Number(tokens[i + 1]);

      if (operator === "*") {
        stack.push(stack.pop() * nextNum);
      } else if (operator === "/") {
        if (nextNum === 0) return "Error";
        stack.push(stack.pop() / nextNum);
      } else if (operator === "+") {
        stack.push(nextNum);
      } else if (operator === "-") {
        stack.push(-nextNum);
      }
    }

    return stack.reduce((a, b) => a + b, 0);
  } catch {
    return "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ("0123456789+-*/.".includes(e.key)) handleInput(e.key);
  if (e.key === "Enter") handleInput("=");
  if (e.key === "Backspace") {
    input = input.slice(0, -1);
    display.value = input;
  }
});
const historyList = document.getElementById("history");

function addHistory(expression, result) {
  const li = document.createElement("li");
  li.textContent = `${expression} = ${result}`;
  historyList.prepend(li);
}
if (value === "=") {
  const result = calculate(input);
  display.value = result;
  addHistory(input, result);
  input = result.toString();
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
