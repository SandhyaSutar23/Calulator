document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = Array.from(document.querySelectorAll(".btn"));
  const clearButton = document.getElementById("clear");
  const equalsButton = document.getElementById("equals");

  let currentInput = "";
  let operator = "";
  let previousInput = "";
  let expression = "";

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const value = e.target.dataset.value;

      if (value === "C") {
        currentInput = "";
        previousInput = "";
        operator = "";
        expression = "";
        display.textContent = "";
        return;
      }

      if (value === "=") {
        if (previousInput && currentInput && operator) {
          try {
            // Calculate the result
            const result = eval(`${previousInput} ${operator} ${currentInput}`);
            // Update the display to show the full expression and result
            display.textContent = `${previousInput} ${operator} ${currentInput} = ${result}`;
            // Reset for the next calculation
            currentInput = String(result);
            previousInput = "";
            operator = "";
            expression = "";
          } catch (error) {
            display.textContent = "Error";
          }
        }
        return;
      }

      if (["+", "-", "*", "/"].includes(value)) {
        if (currentInput === "") return; // Prevent setting operator with empty input

        // Update the expression and operator
        if (previousInput && operator) {
          try {
            currentInput = String(
              eval(`${previousInput} ${operator} ${currentInput}`)
            );
            display.textContent = `${currentInput} ${value}`;
          } catch (error) {
            display.textContent = "Error";
            return;
          }
        } else {
          display.textContent = `${currentInput} ${value}`;
        }

        previousInput = currentInput;
        operator = value;
        currentInput = "";
      } else {
        // Append the digit or dot to the current input
        currentInput += value;
        display.textContent =
          `${previousInput} ${operator} ${currentInput}`.trim();
      }
    });
  });
});
