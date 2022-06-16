import { getRecipeById } from "../api.js";
import { hideContent } from "../router.js";
import { createRecipeCard } from "../utilities.js";

const root = document.querySelector('.root');

export function renderDetails(recipe) {
    hideContent();

    getRecipeById(recipe._id)
        .then(createRecipeCard)
        .then(article => root.appendChild(article));
}