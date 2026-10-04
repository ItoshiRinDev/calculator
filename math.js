let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['+', '-', 'CE', 'C', 'X', '/'];

const out = document.querySelector('.calc-screen p');
const buttons = document.querySelector('.buttons');
const MAX_LEN = 12;

function updateDisplay(value) {
    out.textContent = value;
    out.style.fontSize = '40px';

    const maxWidth = out.parentElement.clientWidth - 20;
    let size = 40;

    while (out.scrollWidth > maxWidth && size > 10) {
        size -= 1;
        out.style.fontSize = size + 'px';
    }
}

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
};

function round(x) {
    return +(+x).toFixed(8);
};

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
                out.textContent = a;
            }
            finish = false;
            return;
        }
        if (b === '' && sign === '') {
            if (a !== '') {
                a = a.startsWith('-') ? a.slice(1) : '-' + a;
                out.textContent = a;
            }
        } else {
            if (b !== '') {
                b = b.startsWith('-') ? b.slice(1) : '-' + b;
                out.textContent = b;
            }
        }
        return;
    }

    if (key === '%') {
        if (sign === '' || sign === '+' || sign === '-') {
            if (b === '') {
                a = (+a) / 100;
                out.textContent = a;
            } else {
                b = (+a) * (+b) / 100;
                out.textContent = b;
            }
        } else {
            if (b === '') {
                a = (+a) / 100;
                out.textContent = a;
            } else {
                b = (+b) / 100;
                out.textContent = b;
            }
        }
        return;
    }

    if (event.target.classList.contains('remove')) {
        if (b !== '' && sign !== '') {
            b = b.slice(0, -1);
            out.textContent = b === '' ? 0 : b;
        } else {
            a = a.slice(0, -1);
            out.textContent = a === '' ? 0 : a;
        }
        return;
    }

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            if (a.length >= MAX_LEN){
                out.textContent = a;
                return;
            }
            a += key;
            out.textContent = a;
        }
        else if (a !== '' && b !== '' && finish) {
            a = key;
            b = '';
            sign = '';
            finish = false;
            out.textContent = a;
        }
        else {
            if (b.length >= MAX_LEN){
                out.textContent = b;
                return;
            }
            b += key;
            out.textContent = b;
        }
        return;
    }

    if (action.includes(key)) {
        sign = key;
        b = '';
        finish = false;
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
                a = round(a);
                break;
        }
        finish = true;
        updateDisplay(a);
    }
});
