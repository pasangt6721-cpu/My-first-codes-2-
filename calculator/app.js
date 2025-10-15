// Select display and all buttons
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    const operators = ['+', '-', '×', '÷'];

    if (button.classList.contains('clear')) {
      // Clear display
      display.value = '';
    } else if (button.classList.contains('equals')) {
      // Calculate result
      try {
        // Replace calculator symbols with JS operators
        const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expression);

        // Handle division by zero
        if (result === Infinity || result === -Infinity) {
          display.value = 'Cannot divide by zero';
        } else {
          // Format result: max 8 decimals, no trailing zeros
          display.value = Number.isInteger(result) ? 
                          result : 
                          result.toFixed(8).replace(/\.?0+$/, '');
        }
      } catch (error) {
        display.value = 'Error';
      }
    } else if (value === '.') {
      // Prevent multiple decimals in one number
      const parts = display.value.split(/[\+\-\×\÷]/);
      const lastNumber = parts[parts.length - 1];
      if (!lastNumber.includes('.')) {
        display.value += value;
      }
    } else if (operators.includes(value)) {
      // Prevent starting with an operator
      if (display.value === '') return;

      // Prevent two operators in a row; replace last operator if needed
      const lastChar = display.value.slice(-1);
      if (operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + value;
      } else {
        display.value += value;
      }
    } else {
      // Add number to display
      display.value += value;
    }
  });
});
