import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import * as commentsService from '../services/comments.js';

const commentFormTemplate = (ctx, isActive, toggleForm) => html`
<article class="new-comment">
    ${isActive
    ? html`
    <h2>New comment</h2>
    <form id="commentForm">
        <textarea name="content" placeholder="Type comment"></textarea>
        <input type="submit" value="Add comment">
    </form>`
    : html`<form><button class="button" @submit=${toggleForm.bind(null, ctx)}>Add comment</button></form>`}
</article>`;


export const formView = (ctx,isActive,toggleForm) =>commentFormTemplate(ctx, isActive,toggleForm);
