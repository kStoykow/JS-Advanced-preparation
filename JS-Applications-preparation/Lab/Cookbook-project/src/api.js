import * as req from "./services.js";
import { renderHome } from "./pages/home.js";
import { updateAuth, getToken } from "./auth.js";
import { renderDetails } from "./pages/details.js";
import { renderMessage } from "./pages/msgPage.js";
import { changeActiveBtnStyle, renderDeletedRecipe } from './utilities.js';

const baseUrl = 'http://localhost:3030';
const ownerUrl = `${baseUrl}/users/me`;
const loginUrl = `${baseUrl}/users/login`;
const logoutUrl = `${baseUrl}/users/logout`;
const recipesUrl = `${baseUrl}/data/recipes`;
const registerUrl = `${baseUrl}/users/register`;
const guestRecipeUrl = `${baseUrl}/jsonstore/coockbook/recipes`;

const root = document.querySelector('.root');
const mainNav = document.querySelector('nav');
const msgPage = root.querySelector('.msg');

export const articleHolders = {};

export const getOwner = () => req.get(ownerUrl).catch(err => console.log(err));

export const loadRecipes = () =>
    req.get(recipesUrl)
        .then(data => Object.values(data))
        .then(recipes => {
            let token = getToken();
            if (!token) {
                req.get(guestRecipeUrl);

            } else {
                recipes.forEach(recipe => {
                    getOwner()
                        .then(owner => {
                            if (articleHolders.hasOwnProperty(owner._id) == false) {
                                articleHolders[owner._id] = [];
                            }
                            if (owner._id == recipe._ownerId) {
                                articleHolders[owner._id].push(recipe._id);
                            }
                        })
                        .catch(err => console.log(err));
                });
            }

            return recipes;
        })
        .catch(err => console.log(err));

export const getRecipeById = (id) =>
    req.get(`${recipesUrl}/${id}`)
        .catch(err => console.log(err));

export const login = (email, password) =>
    req.post(loginUrl, { email, password })
        .then(res => {
            if (res.code != 403) {
                const user = { username: res.username, token: res.accessToken };
                localStorage.setItem('user', JSON.stringify(user));
                updateAuth();
                renderHome();
                changeActiveBtnStyle(mainNav, document.querySelector('nav a[href="/"]'));

            } else {
                throw new Error('Wrong Email or Password. Please try again.');
            }
        })
        .catch(err => renderMessage(err.message, 'login'));

export let logout = () =>
    req.get(logoutUrl)
        .then(res => {
            if (res.ok) {
                msgPage.style.display = 'block';
                msgPage.textContent = 'Successfully Logged out';

                localStorage.removeItem('user');
                updateAuth();
                changeActiveBtnStyle(mainNav, document.querySelector(`nav a[href="/"]`));

                setTimeout(() => {
                    msgPage.style.display = 'none';
                    renderHome();
                }, 1500);
            }
        })
        .catch(e => console.log(e));

export const register = (email, password, repeat) =>
    req.post(registerUrl, { email, password, repeat })
        .then(res => {
            if (res.code == 409) {
                throw new Error('Email already exists!');
            }

            if (res.password != res.repeat) {
                throw new Error('Passwords must match!');
            }

            renderMessage('Successfully registration.', 'login');
        })
        .catch(err => renderMessage(err.message, 'register'));

export const createNewRecipe = (data) =>
    req.post(recipesUrl, data)
        .then(renderDetails)
        .catch(e => console.log(e));

export const updateRecipe = (data, id) => req.put(recipesUrl + `/${id}`, data)
    .then(renderHome())
    .catch(err => console.log(err))

export const deleteRecipeById = (id) =>
    req.del(recipesUrl + `/${id}`)
        .then(renderDeletedRecipe)
        .catch(err => console.log(err));