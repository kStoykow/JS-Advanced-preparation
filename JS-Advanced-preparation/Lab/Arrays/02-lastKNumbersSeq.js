function solve(x, y) {
    let r = [1];

    for (let i = 0; i < x - 1; i++) {
        r.push(r.slice(-y).reduce((a, b) => a + b))
    }
    return r;
}
console.log(solve(6, 3));