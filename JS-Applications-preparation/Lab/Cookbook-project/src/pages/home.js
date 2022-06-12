import { hideContent } from "../router.js";
import { loadRecipes } from '../api.js';
import { clearOldRecipes } from '../utilities.js';

export function renderHome() {
        hideContent();

        clearOldRecipes();
        loadRecipes();
}