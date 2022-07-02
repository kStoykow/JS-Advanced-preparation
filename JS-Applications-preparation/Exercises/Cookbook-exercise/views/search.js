import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipes.js'
import { catalogTemplate } from './catalog.js';
const searchForm = (searchHandler) => html`
<form id="searchForm" @submit=${searchHandler}>
    <input class="search-input" name="searchParam" placeholder="Search">
    <input class="search-input" type="submit" .value="Search">
</form>`;

const searchHandler = (ctx, e) => {
    e.preventDefault();
    const { searchParam } = Object.fromEntries(new FormData(e.currentTarget));
    console.log(searchParam);
    recipeService.searchRecipe(searchParam)
        .then(recipes => {
            if (recipes.length > 0) {
                let query = Object.fromEntries([...new URLSearchParams(ctx.querystring).entries()]);
                const page = Number(query.page || 1);

                const totalPages = recipeService.totalPages;
                ctx.render(catalogTemplate(recipes, ctx, page, totalPages));
            } else {
                ctx.render(html`<p style="background-color:#cccccc">No results found.</p>`);
            }
        });
}

export const searchView = (ctx) => searchForm(searchHandler.bind(null, ctx));