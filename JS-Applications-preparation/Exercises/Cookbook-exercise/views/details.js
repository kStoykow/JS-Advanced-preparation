import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { getAllComments } from '../services/comments.js';
import * as recipeService from '../services/recipes.js'
import { commentsSetup } from './comments.js';
import { formView } from './commentsForm.js';

const ingredientsTemplate = (ingredients) => html`
    ${ingredients.map(e => html`<li>${e}</li>`)}
`;

const preparationTemplate = (steps) => html`
    ${steps.map(e => html`<p>${e}</p>`)}
`;

const cardDetailsTemplate = (recipe, ctx, commentsSetup) => html`
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
    </article>
    
    ${commentsSetup}
`;

const deletedRecipeTemplate = html`
    <article>
        <h2>Recipe deleted</h2>
    </article>
    `;

const editHandler = (ctx) => ctx.page.redirect(`/ edit / ${ctx.params.id} `);

const deleteHandler = (ctx) => recipeService.deleteRecipe(ctx.params.id)
    .then(() => ctx.render(deletedRecipeTemplate));

    const toggleForm = (e) => {
        e.preventDefault();
        console.log('asd');
        // let data = Object.fromEntries(new FormData(e.currentTarget));
        // console.log(data);
    }

export const detailsView = async (ctx) => {
    const recipeId = ctx.params.id;
    const comments = await getAllComments();
    recipeService.getRecipeById(recipeId)
        .then(recipe => ctx.render(cardDetailsTemplate(recipe, ctx, commentsSetup(recipe,formView.bind(null,true,toggleForm) ,comments))));
}