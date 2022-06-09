import { loadRecipes, getRecipeById } from "./api.js";
const pagesCount = 4;

function DOMElementFactory(type, content, attribute) {
    const elem = document.createElement(type);
    if (typeof content == 'string') {
        if (type == 'img') {
            elem.src = content;
        } else {
            elem.textContent = content;
        }
    } else {
        if (Array.isArray(content)) {
            content.forEach(e => elem.appendChild(e));
        } else {
            elem.appendChild(content);
        }
    }
    if (attribute !== undefined) {
        attribute.forEach(([k, v]) => elem[k] = v);
    }

    return elem;
}
export const create = {
    article: DOMElementFactory.bind(null, 'article'),
    div: DOMElementFactory.bind(null, 'div'),
    img: DOMElementFactory.bind(null, 'img'),
    h2: DOMElementFactory.bind(null, 'h2'),
    h3: DOMElementFactory.bind(null, 'h3'),
    p: DOMElementFactory.bind(null, 'p'),
    ul: DOMElementFactory.bind(null, 'ul'),
    li: DOMElementFactory.bind(null, 'li'),
}

export function changeActiveBtnStyle(nav, elem) {
    nav.querySelector('.active').classList.remove('active');
    elem.classList.add('active');
}

export function shrinkCard(e) {
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

export function createInitRecipeCards(recipe) {
    function toggleCard(recipe, parent) {
        getRecipeById(recipe._id).then(recipeDetails => parent.replaceWith(createRecipeCard(recipeDetails)));
    }

    const articleElem = create.article([
        create.div(create.h2(recipe.name), [['className', 'title']]),
        create.div(create.img(recipe.img), [['className', 'small']]),
    ], [['className', 'preview']]);

    articleElem.addEventListener('click', toggleCard.bind(null, recipe, articleElem));

    return articleElem;
}

export function createRecipeCard(recipe) {
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

export function clearOldRecipes() {
    [...document.querySelectorAll('.preview')].forEach(e => e.remove());
}