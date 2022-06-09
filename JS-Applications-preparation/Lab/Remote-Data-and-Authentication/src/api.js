import * as req from "./services.js"
import { renderError } from "./pages/404.js";
import { renderHome } from "./pages/home.js";
import { updateAuth, getToken } from "./auth.js";

const baseUrl = 'http://localhost:3030';
const recipesUrl = `${baseUrl}/data/recipes`;
const guestRecipes = `${baseUrl}/jsonstore/cookbook/recipes`;
const loginUrl = `${baseUrl}/users/login`;

export function loadRecipes() {
    let token = getToken();
    if (!token) {
        return req.get(guestRecipes)
            .then(data => Object.values(data))
            .catch(e => console.log(e));
    }
    return req.get(recipesUrl)
        .then(data => Object.values(data))
        .catch(e => console.log(e));
}

export function getRecipeById(id) {
    return fetch(`${recipesUrl}/${id}`)
        .catch(err => console.log(err));
}

export const login = (email, password) => {
    return req.post(loginUrl, { email, password })
        .then(res => {
            if (res.code != 403) {
                let user = { username: res.username, token: res.accessToken };
                localStorage.setItem('user', JSON.stringify(user));
                updateAuth();
                renderHome();
            } else {
                renderError('Wrong Email or Password. Please try again.');
            }
        });
};

export const createNewRecipe = (data) => req.post(recipesUrl, data).then(renderHome());
