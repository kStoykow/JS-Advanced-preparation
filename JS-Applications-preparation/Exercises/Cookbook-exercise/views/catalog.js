import { html } from '../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipes.js';


const cardTemplate = (recipe, ctx, toggleDetailsHandler) => html`
<article class="preview" @click=${toggleDetailsHandler.bind(null, recipe, ctx)}>
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small"><img src="${recipe.img}"></div>
</article>
`;

const catalogTemplate = (recipes, ctx, page, totalPages, prevPage, nextPage) => html`
<div class="section-title">
    <a class="pager" href="/catalog" @click=${prevPage.bind(null, ctx, page)}> &lt; Prev</a>
    <a class="pager">Page ${page} from ${totalPages}</a>
    <a class="pager" href="/catalog" @click=${nextPage.bind(null, ctx, page, totalPages)}> Next &gt;</a>
</div>
${recipes.map(recipe => cardTemplate(recipe, ctx, toggleDetailsHandler))}
`;

const toggleDetailsHandler = (recipe, ctx) => ctx.page.redirect(`/details/${recipe._id}`);

const prevPage = (ctx, page, e) => ctx.page.redirect(`/catalog?page=${Math.max((Number(page) - 1), 1)}`);

const nextPage = (ctx, page, totalPages, e) => ctx.page.redirect(`/catalog?page=${Math.min((Number(page) + 1), totalPages)}`);


export const catalogView = (ctx) => {
    let query = Object.fromEntries([...new URLSearchParams(ctx.querystring).entries()]);
    const page = Number(query.page || 1);
    const totalPages = recipeService.totalPages;

    recipeService.loadRecipes(page)
        .then(recipes => {
            ctx.render(catalogTemplate(recipes, ctx, page, totalPages, prevPage, nextPage));
        });
}