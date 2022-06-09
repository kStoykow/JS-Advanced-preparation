export function loadRecipes() {
    return fetch('http://localhost:3030/data/recipes')
        .then(response => response.json())
        .then(data => Object.values(data))
        .catch(e => console.log(e));
}

export function getRecipeById(id) {
    return fetch(`http://localhost:3030/data/recipes/${id}`)
        .then(e => e.json())
        .catch(err => console.log(err));
}