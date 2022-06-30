import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import * as recipeService from '../services/recipes.js';


const cardTemplate = (recipe, ctx, toggleDetailsHandler) => html`
<article class="preview" @click=${toggleDetailsHandler.bind(null, recipe, ctx)}>
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small"><img src="${recipe.img}"></div>
</article>
`;

const catalogTemplate = (recipes, ctx, page, totalPages) => html`
<div class="section-title">
    ${ page > 1 
    ? html`<a class="pager" href="/catalog?page=${page - 1}"> &lt; Prev</a>`
    : nothing }

    <a class="pager">Page ${page} from ${totalPages}</a>

    ${ page < totalPages
    ? html`<a class="pager" href="/catalog?page=${page + 1}"> Next &gt;</a>`    
    : nothing }
</div>
${recipes.map(recipe => cardTemplate(recipe, ctx, toggleDetailsHandler))}
`;

const toggleDetailsHandler = (recipe, ctx) => ctx.page.redirect(`/details/${recipe._id}`);

export const catalogView = (ctx) => {
    let query = Object.fromEntries([...new URLSearchParams(ctx.querystring).entries()]);
    const page = Number(query.page || 1);
    
    recipeService.loadRecipes(page)
    .then(recipes => {
            const totalPages = recipeService.totalPages;
            ctx.render(catalogTemplate(recipes, ctx, page, totalPages));
        });
}