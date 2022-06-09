import *as req from "../services.js";
import { createNewRecipe } from "../api.js"
import { getToken, updateAuth } from "../auth.js";
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
    console.log(req.post);
    createNewRecipe(data);
});

// function create(e) {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const data = {
//         name: formData.get('name'),
//         img: formData.get('img'),
//         ingredients: formData.get('ingredients').split('\n'),
//         steps: formData.get('steps').split('\n')
//     }

//     let token = getToken();
//     req.post('/data/recipes', data)
//         // fetch('http://localhost:3030/data/recipes', {
//         //     method: 'POST',
//         //     headers: {
//         //         'content-type': 'application/json',
//         //         'X-Authorization': token
//         //     },
//         //     body: JSON.stringify(data)
//         // })
//         //     .then(res => res.json())
//         .then(res => console.log(res))
// }
