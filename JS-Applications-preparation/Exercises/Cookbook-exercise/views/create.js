import { html } from '../node_modules/lit-html/lit-html.js';

const createTemplate = () => html`
<article class="create-recipe-page">
    <h2>New Recipe</h2>
    <form>
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

export const createView = (ctx) => {
    ctx.render(createTemplate());
}