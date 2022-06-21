import { html } from '../node_modules/lit-html/lit-html.js';
import * as recipeServices from '../services/recipes.js';

const editTemplate = (recipe, submitHandler) => html`
<article class="edit-recipe-page">
    <h2>New Recipe</h2>
    <form @submit=${submitHandler}>
        <label>Name: <input type="text" name="name" .value=${recipe.name}></label>
        <label>Image: <input type="text" name="img" .value=${recipe.img}></label>
        <label class="ml">Ingredients: <textarea name="ingredients"
                .value=${recipe.ingredients.join('\n')}></textarea></label>
        <label class="ml">Preparation: <textarea name="steps" .value=${recipe.steps.join('\n')}></textarea></label>
        <input id="edit-btn" type="submit" value="Edit Recipe">
    </form>
</article>
`;

const submitHandler = (ctx, recipe, e) => {
    e.preventDefault();

    let { name, img, ingredients, steps } = Object.fromEntries(new FormData(e.currentTarget));
    ingredients = ingredients.split('\n');
    steps = steps.split('\n');
    
    const data = { name, img, ingredients, steps };

    recipeServices.editRecipe(recipe._id, data)
        .then(recipe => ctx.page.redirect(`/details/${recipe._id}`));
}

export const editView = (ctx) => {
    recipeServices.getRecipeById(ctx.params.id)
        .then(recipe => {
            ctx.render(editTemplate(recipe, submitHandler.bind(null, ctx, recipe)));
        });
}