import { html } from '../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipes.js';

const cardTemplate = (recipe, ctx, toggleDetailsHandler) => html`
<article class="preview" @click=${toggleDetailsHandler.bind(null, recipe, ctx)}>
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small"><img src=${recipe.img}></div>
</article>
`;

const catalogTemplate = (recipes, ctx) => html`
    ${recipes.map(recipe =>     cardTemplate(recipe, ctx, toggleDetailsHandler))}
`;

const toggleDetailsHandler = (recipe, ctx) => ctx.page.redirect(`/details/${recipe._id}`);

export const catalogView = (ctx) => recipeService.loadRecipes()
        .then(recipes => {
            ctx.render(catalogTemplate(recipes, ctx));
        });