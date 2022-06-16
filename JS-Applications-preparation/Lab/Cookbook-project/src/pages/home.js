import { hideContent } from "../router.js";
import { loadRecipes } from '../api.js';
import { clearOldRecipes } from '../utilities.js';
import { createInitRecipeCards } from '../utilities.js';

const rootElem = document.querySelector('.root');

function appendRecipes(recipes) {
        recipes.forEach(e => rootElem.appendChild(createInitRecipeCards(e)));
}
export function renderHome() {
        hideContent();

        clearOldRecipes();
        loadRecipes()
                .then(appendRecipes)
                .catch(err => console.log(err));
}