import { createNewRecipe } from "../api.js"
import { updateAuth } from "../auth.js";

const createElem = document.querySelector('.create-recipe-page');
const formElem = createElem.querySelector('form');

export function renderCreate() {
    createElem.style.display = 'block';
}

formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients').split('\n'),
        steps: formData.get('steps').split('\n')
    }
    updateAuth();
    createNewRecipe(data);
});