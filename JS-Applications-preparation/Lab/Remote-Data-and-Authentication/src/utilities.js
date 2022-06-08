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
const article = DOMElementFactory.bind(null, 'article');
const div = DOMElementFactory.bind(null, 'div');
const img = DOMElementFactory.bind(null, 'img');
const h2 = DOMElementFactory.bind(null, 'h2');
const h3 = DOMElementFactory.bind(null, 'h3');
const p = DOMElementFactory.bind(null, 'p');
const ul = DOMElementFactory.bind(null, 'ul');
const li = DOMElementFactory.bind(null, 'li');

export const create = {
    article, div, img, h2, h3, p, ul, li
};

export function changeActiveBtnStyle(nav, elem) {
    nav.querySelector('.active').classList.remove('active');
    elem.classList.add('active');
}

//app funcs
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

const pagesCount = 3;
export function shrinkCard(e) {
    let childIndex = Array.from(e.currentTarget.parentElement.children).indexOf(e.currentTarget);
    let currArticle = e.currentTarget.parentElement.children[childIndex];
console.log(currArticle);
console.log(childIndex);
    loadRecipes()
        // .then(el => {
        //     for (const e of el) {
        //         console.log(e);
        //         if (e == el[childIndex - pagesCount]) {
        //             currArticle.replaceWith(createInitRecipeCards(e));
        //         }
        //     }
        // });

        //TO FINISH SHRINK
}

export function createInitRecipeCards(recipes) {
    const root = document.querySelector('.root');

    function toggleCard(recipe, parent) {
        getRecipeById(recipe._id).then(recipeDetails => parent.replaceWith(createRecipeCard(recipeDetails)));
    }
    for (const recipe of recipes) {
        const articleElem = create.article([
            create.div(create.h2(recipe.name), [['className', 'title']]),
            create.div(create.img(recipe.img), [['className', 'small']]),
        ], [['className', 'preview']]);

        articleElem.addEventListener('click', toggleCard.bind(null, recipe, articleElem));

        root.appendChild(articleElem);
    }
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