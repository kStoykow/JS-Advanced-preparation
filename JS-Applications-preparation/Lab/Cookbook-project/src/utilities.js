import { getOwner } from "./api.js";
import { getToken } from './auth.js';
import { updateRecipe } from "./api.js";
import { hideContent } from "./router.js";
import { deleteRecipeById } from "./api.js";
import { renderDetails } from "./pages/details.js";

const root = document.querySelector('.root');

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
            content.forEach(e => {
                if (typeof e == 'string') {
                    elem.textContent = e;
                } else {
                    elem.appendChild(e)
                }
            });
        } else {
            elem.appendChild(content);
        }
    }
    if (attribute !== undefined) {
        attribute.forEach(([k, v]) => elem[k] = v);
    }

    return elem;
}

function editRecipeHandler(recipe) {
    hideContent();
    const article = createUpdateForm(recipe);
    root.appendChild(article);
}

function deleteRecipeHandler(recipe) {
    const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
    if (confirmed) {
        deleteRecipeById(recipe._id);
    }
}

function updateFormHandler(recipe, e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients').split('\n'),
        steps: formData.get('steps').split('\n')
    }
    updateRecipe(data, recipe._id);
}

function recipeOwnerBtnsFactory(recipe) {
    const editBtn = create.button('\u270E Edit');
    const deleteBtn = create.button('\u2716 Delete');

    editBtn.addEventListener('click', editRecipeHandler.bind(null, recipe));
    deleteBtn.addEventListener('click', deleteRecipeHandler.bind(null, recipe));

    return create.div([editBtn, deleteBtn], [['className', 'controls']]);
}

const create = {
    textarea: DOMElementFactory.bind(null, 'textarea'),
    article: DOMElementFactory.bind(null, 'article'),
    button: DOMElementFactory.bind(null, 'button'),
    label: DOMElementFactory.bind(null, 'label'),
    input: DOMElementFactory.bind(null, 'input'),
    form: DOMElementFactory.bind(null, 'form'),
    div: DOMElementFactory.bind(null, 'div'),
    img: DOMElementFactory.bind(null, 'img'),
    h2: DOMElementFactory.bind(null, 'h2'),
    h3: DOMElementFactory.bind(null, 'h3'),
    ul: DOMElementFactory.bind(null, 'ul'),
    li: DOMElementFactory.bind(null, 'li'),
    p: DOMElementFactory.bind(null, 'p'),
}

export function changeActiveBtnStyle(nav, elem) {
    nav.querySelector('.active').classList.remove('active');
    elem.classList.add('active');
}

export function createInitRecipeCards(recipe) {
    const articleElem = create.article([
        create.div(create.h2(recipe.name), [['className', 'title']]),
        create.div(create.img(recipe.img), [['className', 'small']]),
    ], [['className', 'preview']]);
    articleElem.addEventListener('click', renderDetails.bind(null, recipe));

    return articleElem;
}

export function createRecipeCard(recipe) {
    const ulElem = create.ul('');
    recipe.ingredients.map(e => ulElem.appendChild(create.li(e)));

    const container = document.createDocumentFragment();
    recipe.steps.map(e => container.appendChild(create.p(e)));

    const articleElem = create.article([
        create.h2(`${recipe.name}`),
        create.div([create.div(create.img(recipe.img), [['className', 'thumb']]),
        create.div([create.h3('Ingredients:'), ulElem,], [['className', 'ingredients']]),], [['className', 'band']]),
        create.div([create.h3('Preparation:'), container], [['className', 'description']])
    ]);

    const showEdit = recipeOwnerBtnsFactory(recipe);
    let token = getToken();
    if (token) {
        getOwner()
            .then(user => {
                if (user._id == recipe._ownerId) {
                    articleElem.appendChild(showEdit);
                }
            });
    }

    return articleElem;
}

export function clearOldRecipes() {
    [...document.querySelectorAll('.preview')].forEach(e => e.remove());
}

export function createUpdateForm(recipe) {
    const form = create.form([
        create.label(['Name: ', create.input('', [['type', 'text'], ['name', 'name'], ['value', `${recipe.name}`]])]),
        create.label(['Image: ', create.input('', [['type', 'text'], ['name', 'img'], ['value', `${recipe.img}`]])]),
        create.label(['Ingredients: ', create.textarea('', [['name', 'ingredients'], ['value', `${recipe.ingredients.join('\n')}`]])], [['className', 'ml']]),
        create.label(['Preparation: ', create.textarea('', [['name', 'steps'], ['value', `${recipe.steps.join('\n')}`]])], [['className', 'ml']]),
        create.input('', [['id', 'edit-recipe-btn'], ['type', 'submit'], ['value', 'Update Recipe']])
    ]);
    form.addEventListener('submit', updateFormHandler.bind(null, recipe));

    return create.article([
        create.h2('Edit Recipe'),
        form
    ], [['className', 'update-recipe-page']]);
}

export function renderDeletedRecipe() {
    hideContent();
    root.appendChild(create.article([create.h2('Recipe deleted')]));
}