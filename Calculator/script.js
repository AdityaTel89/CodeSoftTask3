let model = ["0"];

function userPressedNumber(event) {
  let num;
  const classList = [...event.target.classList];

  if (classList.indexOf("doublezero") > -1) {
    num = "0";
  } else {
    if (classList.indexOf("one") > -1) {
      num = "1";
    } else if (classList.indexOf("two") > -1) {
      num = "2";
    } else if (classList.indexOf("three") > -1) {
      num = "3";
    } else if (classList.indexOf("four") > -1) {
      num = "4";
    } else if (classList.indexOf("five") > -1) {
      num = "5";
    } else if (classList.indexOf("six") > -1) {
      num = "6";
    } else if (classList.indexOf("seven") > -1) {
      num = "7";
    } else if (classList.indexOf("eight") > -1) {
      num = "8";
    } else if (classList.indexOf("nine") > -1) {
      num = "9";
    } else if (classList.indexOf("zero") > -1) {
      num = "0";
    }
  }

  var last = model[model.length - 1];
  const isLastMathOperator = isMathOperator(last);

  if (isLastMathOperator) {
    model.push(num);
  } else {
    if (last === "0") {
      model[model.length - 1] = num;
    } else {
      model[model.length - 1] = last + num;
    }
  }

  render();
}

function addListeners() {
  let numbers = document.querySelectorAll(".number");
  for (let elem of numbers) {
    elem.addEventListener("click", userPressedNumber);
  }
  document.getElementById("dot").addEventListener("click", userPressedDot);
  document.getElementById("ac").addEventListener("click", clear);
  document.getElementById("equal").addEventListener("click", userPressedEqual);
  let elements = document.querySelectorAll(".operator");
  for (let elem of elements) {
    elem.addEventListener("click", userPressedMathOperator);
  }
  document.querySelector(".doublezero").addEventListener("click", () => {
    userPressedNumber({ target: { classList: ["doublezero"] } });
  });
}
addListeners();

function clear() {
  model = ["0"];
  render();
}

function isMathOperator(str) {
  return ["+", "-", "*", "/"].indexOf(str) > -1;
}

function userPressedDot() {
  let last = model[model.length - 1];
  const isLastMathOperator = isMathOperator(last);
  if (last.indexOf(".") === -1 && !isLastMathOperator) {
    model[model.length - 1] = last + ".";
  } else if (isLastMathOperator) {
    model.push("0.");
  }
  render();
}

function userPressedEqual() {
  calculate();
  render();
}

function userPressedMathOperator(event) {
  let operator;
  const classList = [...event.target.classList];
  if (classList.indexOf("divide") > -1) {
    operator = "/";
  } else if (classList.indexOf("multiple") > -1) {
    operator = "*";
  } else if (classList.indexOf("plus") > -1) {
    operator = "+";
  } else if (classList.indexOf("minus") > -1) {
    operator = "-";
  }
  let last = model[model.length - 1];
  if (isMathOperator(last) && last !== operator) {
    model[model.length - 1] = operator;
    calculate();
  } else {
    if (model.length === 1) {
      model.push(operator);
    }
    if (model.length === 3) {
      model.push(operator);
      calculate();
    }
  }
  render();
}

function calculate() {
  let last = model[model.length - 1];
  let length = model.length;
  if (length === 2) {
    model = [calcThree([model[0], model[1], model[0]])];
  }
  if (length === 3) {
    model = [calcThree(model)];
  }
  if (length === 4) {
    if (last === "+" || last === "-" || model[1] === "*" || model[1] === "/") {
      model = [calcThree(model), last];
    }
  }
  if (length === 5) {
    model = [
      calcThree([model[0], model[1], calcThree([model[2], model[3], model[4]])])
    ];
  }
}

function calcThree(arr) {
  if (arr[1] === "+") {
    return String(Number(arr[0]) + Number(arr[2]));
  }
  if (arr[1] === "-") {
    return String(Number(arr[0]) - Number(arr[2]));
  }
  if (arr[1] === "*") {
    return String(Number(arr[0]) * Number(arr[2]));
  }
  if (arr[1] === "/") {
    return String(Number(arr[0]) / Number(arr[2]));
  }
}

function render() {
  var last = model[model.length - 1];
  removeHighlights();
  switch (last) {
    case "+": {
      const preLast = model[model.length - 2];
      document.getElementById("result").value = preLast;
      document.getElementById("plus").classList.add("org");
      break;
    }
    case "-": {
      const preLast = model[model.length - 2];
      document.getElementById("result").value = preLast;
      document.getElementById("minus").classList.add("org");
      break;
    }
    case "*": {
      const preLast = model[model.length - 2];
      document.getElementById("result").value = preLast;
      document.getElementById("multiple").classList.add("org");
      break;
    }
    case "/": {
      const preLast = model[model.length - 2];
      document.getElementById("result").value = preLast;
      document.getElementById("divide").classList.add("org");
      break;
    }
    default: {
      document.getElementById("result").value = last;
    }
  }
}

function removeHighlights() {
  document.getElementById("plus").classList.remove("org");
  document.getElementById("minus").classList.remove("org");
  document.getElementById("multiple").classList.remove("org");
  document.getElementById("divide").classList.remove("org");
}
render();
