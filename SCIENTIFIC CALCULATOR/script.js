function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

// Function for Trigonometric functions (sin, cos, tan) in Degrees
function appendTrig(func) {
    document.getElementById("display").value += `${func}(`;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    let currentValue = document.getElementById("display").value;
    document.getElementById("display").value = currentValue.slice(0, -1);
}

// Convert degrees to radians
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function calculate() {
    try {
        let expression = document.getElementById("display").value;

        // Convert trigonometric functions to degrees
        expression = expression.replace(/sin\(([^)]+)\)/g, (_, angle) => `Math.sin(degToRad(${angle}))`);
        expression = expression.replace(/cos\(([^)]+)\)/g, (_, angle) => `Math.cos(degToRad(${angle}))`);
        expression = expression.replace(/tan\(([^)]+)\)/g, (_, angle) => `Math.tan(degToRad(${angle}))`);

        // Evaluate the expression
        let result = eval(expression);
		// Fix floating-point precision issues (rounding to 10 decimal places)
        result = parseFloat(result.toFixed(10));
        document.getElementById("display").value = result;
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}
