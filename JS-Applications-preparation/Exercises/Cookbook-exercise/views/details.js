import { html, nothing } from '../node_modules/lit-html/lit-html.js';

import { commentsView } from './comments.js';

import * as recipeService from '../services/recipes.js'
import * as commentsService from '../services/comments.js';

const ingredientsTemplate = (ingredients) => html`
    ${ingredients.map(e => html`<li>${e}</li>`)}
`;

const preparationTemplate = (steps) => html`
    ${steps.map(e => html`<p>${e}</p>`)}
`;

const cardDetailsTemplate = (recipe, allComments, ctx) => html`
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
                <button @click=${deleteHandler.bind(null, ctx, recipe)}>✖ Delete</button>
            </div>`
            : nothing}
        </article>
    </article>
    ${commentsView(recipe, allComments, ctx)}
`;

const deletedRecipeTemplate = html`
    <article>
        <h2>Recipe deleted</h2>
    </article>
    `;

const editHandler = (ctx) => ctx.page.redirect(`/ edit / ${ctx.params.id} `);

const deleteHandler = (ctx, recipe) => {
    const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
    if (confirmed) {
        recipeService.deleteRecipe(recipe)
            .then(() => ctx.render(deletedRecipeTemplate));
    }
}

export const detailsView = async (ctx) => {
    const recipeId = ctx.params.id;

    Promise.all([
        recipeService.getRecipeById(recipeId),
        commentsService.getAllComments(recipeId)
    ])
        .then(([recipe, allComments]) => ctx.render(cardDetailsTemplate(recipe, allComments, ctx)));
}