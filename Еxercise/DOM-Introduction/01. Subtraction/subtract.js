function subtract() {
    let x = document.getElementById('firstNumber');
    let y = document.getElementById('firstNumber');
    let r = document.getElementById('result');

    if (x == null || y == null || r == null) {
        throw new Error('Missing DOM element!');
    }
    return r.textContent = Number(x.value) - Number(y.value);
}