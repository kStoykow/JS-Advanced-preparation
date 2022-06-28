import { html } from '../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipes.js';

const recentRecipePreview = (recipe, ctx) => html`
    <article class="recent" @click=${toggleDetailsHandler.bind(null, recipe, ctx)}>
        <div class="recent-preview">
            <img src=${recipe.img}>
        </div>
        <div class="recent-title">
            ${recipe.name}
        </div>
    </article>
`;

const homeTemplate = (recipes, ctx) => html`
<div id="views">
    <section id="home">
        <div class="hero">
            <h2>Welcome to My Cookbook</h2>
        </div>
        <header class="section-title">Recently added recipes</header>
        <div class="recent-recipes">
            ${recipes.map(recipe => recentRecipePreview(recipe, ctx))}
        </div>
        <footer class="section-title">
            <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
        </footer>
    </section>
</div>
`;

const toggleDetailsHandler = (recipe, ctx) => ctx.page.redirect(`/details/${recipe._id}`);

export const homeView = (ctx) => recipeService.recentRecipes()
    .then(recipes => {
        ctx.render(homeTemplate(recipes, ctx));
    });