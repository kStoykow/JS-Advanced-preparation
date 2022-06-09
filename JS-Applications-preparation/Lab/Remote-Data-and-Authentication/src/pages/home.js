import { hideContent } from "../router.js";
import { loadRecipes } from '../api.js';
import { clearOldRecipes, createInitRecipeCards, changeActiveBtnStyle } from '../utilities.js';

const rootElem = document.querySelector('.root');
const mainNav = document.querySelector('nav');

const baseUrl = 'http://localhost:3030';
const recipeUrl = `${baseUrl}/data/recipes`;

export function renderHome() {
        hideContent();
        changeActiveBtnStyle(mainNav, document.querySelector('nav a[href="/"]'));

        clearOldRecipes();
        loadRecipes()
                .then(data => data.forEach(e => rootElem.appendChild(createInitRecipeCards(e))));
}