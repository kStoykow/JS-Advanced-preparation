function add(x) {
    let sum = x;

    function calc(y) {
        sum += y;
        return calc;
    }

    calc.toString = function () {
        return sum;
    };
    return calc;
}
console.log(add(1)(3)(5).toString());