function elemFactory(type, content) {
    let e = document.createElement(type);
    if (content == undefined) {
        content = '';

    } else if (typeof content == 'string') {
        if (type == 'img') {
            e.src = content;
        } else {
            e.innerHTML = `${content}`;
        }

    } else {
        e.appendChild(content);
    }

    return e;
}
const article = elemFactory.bind(null, 'article');
const div = elemFactory.bind(null, 'div');
const img = elemFactory.bind(null, 'img');
const h2 = elemFactory.bind(null, 'h2');
const h3 = elemFactory.bind(null, 'h3');
const p = elemFactory.bind(null, 'p');
const ul = elemFactory.bind(null, 'ul');
const li = elemFactory.bind(null, 'li');

function loadRecipes() {
    return fetch('http://localhost:3030/jsonstore/cookbook/recipes')
        .then(response => response.json())
        .then(data => Object.values(data))
        .catch(e => console.log(e));
}

function getRecipeById(id) {
    return fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`)
        .then(e => e.json())
        .catch(err => console.log(err));
}

function shrinkCard(e) {
    let childIndex = Array.from(e.currentTarget.parentElement.children).indexOf(e.currentTarget);
    let currArticle = e.currentTarget.parentElement.children[childIndex];

    loadRecipes()
        .then(el => {
            for (const e of el) {
                if (e == el[childIndex]) {
                    currArticle.replaceWith(createInitRecipes(e));
                }
            }
        })
}

function createInitRecipes(recipe) {
    function toggleCard() {
        getRecipeById(recipe._id).then(fullRecipe => articleElem.replaceWith(createRecipeCard(fullRecipe)));
    }

    const articleElem = article();
    articleElem.classList.add('preview');

    const titleDiv = div(h2(recipe.name));
    titleDiv.classList.add('title');

    const srcDiv = div(img(recipe.img));
    srcDiv.classList.add('small');

    articleElem.appendChild(titleDiv);
    articleElem.appendChild(srcDiv);
    articleElem.addEventListener('click', toggleCard);

    return articleElem;

    // async function toggleCard() {
    //     const fullRecipe = await getRecipeById(recipe._id);
    //     articleElem.replaceWith(createRecipeCard(fullRecipe));
    // }
}

function createRecipeCard(recipe) {
    const articleElem = article();
    const titleElem = h2(`${recipe.name}`);

    const bandElem = div();
    bandElem.classList.add('band');
    const thumbElem = div(img(recipe.img));
    thumbElem.classList.add('thumb');

    const ingredientsElem = div(h3('Ingredients:'));
    ingredientsElem.classList.add('ingredients');
    const ulElem = ul();
    recipe.ingredients.map(e => ulElem.appendChild(li(e)));
    ingredientsElem.appendChild(ulElem);

    bandElem.appendChild(thumbElem);
    bandElem.appendChild(ingredientsElem);


    const descriptionElem = div(h3('Preparation:'));
    descriptionElem.classList.add('description');
    recipe.steps.map(e => descriptionElem.appendChild(p(e)));

    articleElem.appendChild(titleElem);
    articleElem.appendChild(bandElem);
    articleElem.appendChild(descriptionElem);
    articleElem.addEventListener('click', shrinkCard)

    return articleElem;
}

window.addEventListener('load', async () => {
    let main = document.querySelector('main');
    main.innerHTML = '';

    let recipes = await loadRecipes();
    let cards = recipes.map(createInitRecipes);

    cards.forEach(e => main.appendChild(e));
});
