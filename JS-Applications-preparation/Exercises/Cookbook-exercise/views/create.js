import { html } from '../node_modules/lit-html/lit-html.js';
import * as recipeServices from '../services/recipes.js';

const createTemplate = (submitHandler) => html`
<article class="create-recipe-page">
    <h2>New Recipe</h2>
    <form @submit=${submitHandler}>
        <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
        <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
        <label class="ml">Ingredients: <textarea name="ingredients"
                placeholder="Enter ingredients on separate lines"></textarea></label>
        <label class="ml">Preparation: <textarea name="steps"
                placeholder="Enter preparation steps on separate lines"></textarea></label>
        <input id="create-btn" type="submit" value="Create Recipe">
    </form>
</article>
`;

const submitHandler = (ctx, e) => {
    e.preventDefault();

    let { name, img, ingredients, steps } = Object.fromEntries(new FormData(e.currentTarget));
    ingredients = ingredients.split('\n');
    steps = steps.split('\n');

    recipeServices.createRecipe({ name, img, ingredients, steps })
        .then(recipe => {
            ctx.page.redirect(`/details/${recipe._id}`)
        });
}

export const createView = (ctx) => ctx.render(createTemplate(submitHandler.bind(null, ctx)));