const display = document.getElementById('output');

function displayAppend(input) {
    const operators = ['+', '-', '÷', '×'];

    // Prevent adding more characters if the length is 10
    if (display.value.length >= 10) {
        return; // exit if display already has 10 characters
    }

    // check for multiple decimal points in the same number
    if (input === '.') {
        const tokens = display.value.split(/[\+\-\×÷]/);
        const lastNumber = tokens[tokens.length - 1];
        if (lastNumber.includes('.')) {
            return; // exit if there's already a decimal point
        }
    }

    // handle operators
    if (operators.includes(input)) {
        const lastCharacter = display.value[display.value.length - 1];
        const secondLastCharacter = display.value[display.value.length - 2];

        // allow double minus (e.g., 9--3)
        if (input === '-' && lastCharacter === '-' && secondLastCharacter !== '-') {
            // allow double minus
        } else if (lastCharacter === '' && input === '-') {
            return; // block operator at the start
        } else if (operators.includes(lastCharacter)) {
            if (input !== '-') {
                return; // block consecutive operators
            } else if (lastCharacter === '-' && secondLastCharacter === '-') {
                return; // block more than double minus
            }
        }
    }

    // handle "=" for evaluating the expression
    if (input === "=") {
        try {
            // replace ÷ with / and × with *, handle double minus
            let expression = display.value
                .replace(/÷/g, '/')
                .replace(/×/g, '*')
                .replace(/--/g, '+');

            let result = eval(expression); // evaluate the expression

            // Convert the result to string and limit to 10 characters
            display.value = String(result).slice(0, 10);
        } catch {
            display.value = "Error"; // show error for invalid expressions
            setTimeout(() => {
                display.value = ''; // clear display after a delay
            }, 1000);
        }
    } else {
        // append input to the display
        display.value += input;
    }
}



function resetDisplay() {
    const buttons = document.querySelectorAll('#buttons button');
    buttons.forEach(button => {
        if (button.disabled)
            button.disabled = false; // enable all buttons
    });
    display.value = ''; // clear display
}

function deleteDisplay() {
    display.value = display.value.slice(0, -1); // remove last character
}

function turnOff() {
    const buttons = document.querySelectorAll('#buttons button');
    buttons.forEach(button => {
        if (button.id !== 'clear')
            button.disabled = true; // disable buttons except clear
    });
    display.value = "Goodbye!"; // show goodbye message
    setTimeout(() => {
        display.value = ''; // clear display after a delay
    }, 1000);
}

function greet() {
    const greetings = [
        "Hello!",       // english
        "¡Hola!",       // spanish
        "Bonjour!",     // french
        "Hallo!",       // german
        "Ciao!",        // italian
        "こんにちは!",  // japanese
        "你好!",        // chinese
        "안녕하세요!",    // korean
        "Olá!",         // portuguese
        "Привет!",      // russian
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    const buttons = document.querySelectorAll('#buttons button');
    buttons.forEach(button => {
        if (button.id !== 'clear')
            button.disabled = true; // disable other buttons
    });

    display.value = randomGreeting; // display random greeting
    setTimeout(() => {
        display.value = ''; // clear display after delay
        buttons.forEach(button => {
            if (button.id !== 'clear')
                button.disabled = false; // enable buttons again
        });
    }, 1000);
}

