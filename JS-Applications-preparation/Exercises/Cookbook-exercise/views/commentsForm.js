import { html, nothing } from '../node_modules/lit-html/lit-html.js';

import * as commentsService from '../services/comments.js';

const commentFormTemplate = (ctx, isActive, recipeId) => html`
<article class="new-comment">
    ${isActive
    ? html`
    <h2>New comment</h2>
    <form id="commentForm" @submit=${toggleForm.bind(null, ctx, recipeId)}>
        <textarea name="content" placeholder="Type comment"></textarea>
        <input type="submit" value="Add comment">
    </form>`
    : nothing}
</article>`;

const toggleForm = (ctx, recipeId, e) => {
    e.preventDefault();
    let { content } = Object.fromEntries(new FormData(e.currentTarget));

    commentsService.createComment(recipeId, content)
        .then(() => {
            e.target.reset();
            ctx.page.redirect(`/details/${recipeId}`);
        });
}

export const formView = (ctx) => {
    const isActive = Boolean(ctx.user);
    const recipeId = ctx.params.id;

    return commentFormTemplate(ctx, isActive, recipeId);
}