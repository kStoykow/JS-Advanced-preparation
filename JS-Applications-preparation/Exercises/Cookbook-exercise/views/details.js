import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipes.js'

const ingredientsTemplate = (ingredients) => html`
    ${ingredients.map(e => html`<li>${e}</li>`)}
`;

const preparationTemplate = (steps) => html`
    ${steps.map(e => html`<p>${e}</p>`)}
`;

const cardDetailsTemplate = (recipe, ctx) => html`
<article>
    <article>
        <h2>${recipe.name}</h2>
        <div class="band">
            <div class="thumb"><img src="../${recipe.img}"></div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${ingredientsTemplate(recipe.ingredients)}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${preparationTemplate(recipe.steps)}
        </div>
        ${ctx.user?._id == recipe._ownerId
        ? html`<div class="controls">
            <button @click=${editHandler.bind(null, ctx)}>✎ Edit</button>
            <button @click=${deleteHandler.bind(null, ctx)}>✖ Delete</button>
        </div>`
        : nothing}

    </article>
    `;

const editHandler = (ctx) => {
    ctx.page.redirect(`/edit/${ctx.params.id}`);
}

const deleteHandler = (ctx,e) => {

}

export const detailsView = async (ctx) => {
    const recipeId = ctx.params.id;
    const recipe = await recipeService.getRecipeById(recipeId);

    ctx.render(cardDetailsTemplate(recipe, ctx));
}