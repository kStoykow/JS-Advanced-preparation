export function loadRecipes() {
    fetch('http://localhost:3030/data/recipes')
        .then(response => response.json())
        .then(data => Object.values(data))
        .catch(e => console.log(e));
}