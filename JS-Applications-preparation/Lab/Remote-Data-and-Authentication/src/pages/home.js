import { hideContent } from "../router.js";
import { loadRecipes } from '../api.js';
import { clearOldRecipes, createInitRecipeCards, changeActiveBtnStyle } from '../utilities.js';

const rootElem = document.querySelector('.root');
const mainNav = document.querySelector('nav');



export function renderHome() {
        hideContent();
        changeActiveBtnStyle(mainNav, document.querySelector('nav a[href="/"]'));

        clearOldRecipes();
        loadRecipes().then(data => data.forEach(e => rootElem.appendChild(createInitRecipeCards(e))));
}