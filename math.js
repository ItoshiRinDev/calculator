let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
const action = ['+', '-', 'CE', 'C', 'X', '/'];

const out = document.querySelector('.calc-screen p');
const buttons = document.querySelector('.buttons');

function updateDisplay(value) {
    out.textContent = value;
    const len = value.length;
    let size = 40;
    if (len > 9) size = 32;
    if (len > 12) size = 26;
    if (len > 15) size = 20;
    if (len > 18) size = 16;
    out.style.fontSize = size + 'px';
}

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    updateDisplay(0);
}

document.querySelector('.C').onclick = clearAll;

buttons.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('C')) return;
    out.textContent = '';

    const key = event.target.textContent;

    if (key === '+/-') {
        if (finish) {
            if (a !== '') {
                a = a.startsWith('-') ? a.slice(1) : '-' + a;
                updateDisplay(a);
            }
            finish = false;
            return;
        }
        if (b === '' && sign === '') {
            if (a !== '') {
                a = a.startsWith('-') ? a.slice(1) : '-' + a;
                updateDisplay(a);
            }
        } else {
            if (b !== '') {
                b = b.startsWith('-') ? b.slice(1) : '-' + b;
                updateDisplay(b);
            }
        }
        return;
    }

    if (key === '%') {
        if (sign === '' || sign === '+' || sign === '-') {
            if (b === '') {
                a = (+a) / 100;
                updateDisplay(a);
            } else {
                b = (+a) * (+b) / 100;
                updateDisplay(b);
            }
        } else {
            if (b === '') {
                a = (+a) / 100;
                updateDisplay(a);
            } else {
                b = (+b) / 100;
                updateDisplay(b);
            }
        }
        return;
    }
    if (key === 'remove' || event.target.classList.contains('remove')) {
        if (b !== '' && sign !== '') {
            b = b.slice(0, -1);
            updateDisplay(b === '' ? 0 : b);
        } else {
            a = a.slice(0, -1);
            updateDisplay(a === '' ? 0 : a);
        }
    }

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            updateDisplay(a);
        }
        else if (a !== '' && b !== '' && finish) {
            a = key;
            b = '';
            sign = '';
            finish = false;
            updateDisplay(a);
        }
        else {
            b += key;
            updateDisplay(b);
        }
        return;
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        return;
    }

    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case '+': a = (+a) + (+b); break;
            case '-': a = (+a) - (+b); break;
            case 'X': a = (+a) * (+b); break;
            case '/':
                if ((+b) === 0) {
                    out.textContent = 'Ошибка';
                    a = ''; b = ''; sign = '';
                    return;
                }
                a = (+a) / (+b);
                break;
        }
        finish = true;
        updateDisplay(a);
    }
});
