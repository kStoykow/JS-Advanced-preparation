import { updateAuth } from "../auth.js";

const rootElem = document.querySelector('.root');
const createElem = rootElem.querySelector('.create-recipe-page');
const formElem = createElem.querySelector('form');

formElem.addEventListener('submit', create);

function create(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients'),
        steps: formData.get('steps')
    }

    let token = localStorage.getItem('token');
    console.log(token);

}

export function renderCreate() {
    createElem.style.display = 'block';
}