import { getOwner } from "./api.js";
import { renderDetails } from "./pages/details.js";
import { getToken } from './auth.js';

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

function editHandler(e) {

}
function deleteHandler(e) {

}

function showMoreFactory() {
    const editBtn = create.button('\u270E Edit');
    const deleteBtn = create.button('\u2716 Delete');

    return create.div([editBtn, deleteBtn], [['className', 'controls']]);
}

export const create = {
    article: DOMElementFactory.bind(null, 'article'),
    button: DOMElementFactory.bind(null, 'button'),
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

    const showEdit = showMoreFactory();
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