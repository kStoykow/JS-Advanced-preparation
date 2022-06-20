import { html } from '../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipes.js'

const cardTemplate = (recipe) => html`
<article class="preview">
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small"><img src=${recipe.img}></div>
</article>
`;

const cardDetailsTemplate = (recipe) => html`
<article>
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb"><img src=${recipe.img}></div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                <!-- <li>1 tbsp Ingredient 1</li> 
                <li>2 cups Ingredient 2</li>
                <li>500 g Ingredient 3</li>
                <li>25 g Ingredient 4</li> -->
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        <!-- <p>Prepare ingredients</p>
        <p>Mix ingredients</p>
        <p>Cook until done</p> -->
    </div>
</article>
`;

const homeTemplate = (recipes) => html`
    ${recipes.map(cardTemplate)}
`;

export const homeView = (ctx) => {
    recipeService.loadRecipes()
        .then(recipes => {
            console.log(recipes);
            ctx.render(homeTemplate(recipes));
        });
}