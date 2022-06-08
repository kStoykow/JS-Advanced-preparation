import { create } from "./utilities.js";
import { router } from './router.js';
import { renderHome } from "./pages/home.js";

const pagesCount = 3;

function loadRecipes() {
    return fetch('http://localhost:3030/data/recipes')
        .then(response => response.json())
        .then(data => Object.values(data))
        .catch(e => console.log(e));
}

function getRecipeById(id) {
    return fetch(`http://localhost:3030/data/recipes/${id}`)
        .then(e => e.json())
        .catch(err => console.log(err));
}

function shrinkCard(e) {
    let childIndex = Array.from(e.currentTarget.parentElement.children).indexOf(e.currentTarget);
    let currArticle = e.currentTarget.parentElement.children[childIndex];

    loadRecipes()
        .then(el => {
            for (const e of el) {
                if (e == el[childIndex - pagesCount]) {
                    currArticle.replaceWith(createInitRecipeCards(e));
                }
            }
        });
}

function createInitRecipeCards(recipe) {
    function toggleCard() {
        getRecipeById(recipe._id).then(recipeDetails => articleElem.replaceWith(createRecipeCard(recipeDetails)));
    }

    const articleElem = create.article([
        create.div(create.h2(recipe.name), [['className', 'title']]),
        create.div(create.img(recipe.img), [['className', 'small']]),
    ], [['className', 'preview']]);

    articleElem.addEventListener('click', toggleCard);

    return articleElem;
}

function createRecipeCard(recipe) {
    const ulElem = create.ul('');
    recipe.ingredients.map(e => ulElem.appendChild(create.li(e)));

    const ingredientsElem = create.div([
        create.h3('Ingredients:'),
        ulElem,
    ], [['className', 'ingredients']]);

    const bandElem = create.div([
        create.div(create.img(recipe.img), [['className', 'thumb']]),
        ingredientsElem,
    ], [['className', 'band']]);


    const descriptionElem = create.div(create.h3('Preparation:'), [['className', 'description']]);
    recipe.steps.map(e => descriptionElem.appendChild(create.p(e)));

    const articleElem = create.article([create.h2(`${recipe.name}`), bandElem, descriptionElem]);
    articleElem.addEventListener('click', shrinkCard);

    return articleElem;
}

const main = document.querySelector('main');
const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');

userNav.style.display = 'inline';
guestNav.style.display = 'inline';

renderHome();

document.querySelector('nav').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.nodeName == 'A') {
        const url = new URL(e.target.href);
        [...main.querySelectorAll('article')].forEach(e => e.style.display = 'none');
        router(url.pathname);
    }
});