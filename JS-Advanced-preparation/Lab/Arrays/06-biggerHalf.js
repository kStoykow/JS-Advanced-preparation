function solve(arr) {
    return arr.sort((a, b) => b - a).slice(0, arr.length % 2 == 0 ? arr.length / 2 : arr.length / 2 + 1).reverse();
}
console.log(solve([3, 19, 14, 7, 2, 19, 6]));