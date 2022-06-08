import { updateAuth } from "../auth.js";
import { loadRecipes, createInitRecipeCards, createRecipeCard } from '../utilities.js';

const rootElem = document.querySelector('.root');
const homeElem = rootElem.querySelector('.home');

export function renderHome() {
        updateAuth();
        homeElem.style.display = 'block';
        loadRecipes()
                .then(createInitRecipeCards);
}