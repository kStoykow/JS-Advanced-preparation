import { html } from '../node_modules/lit-html/lit-html.js';

import { formView } from './commentsForm.js';

const commentsTemplate = (recipe, comments, formView) => html`
<div class="section-title">
    Comments for ${recipe.name}
</div>
${formView()}
<div class="comments">
    ${commentsList(comments)}
</div>`;

const commentsList = (comments) => html`
<ul>
    ${comments.map(comment)}
</ul>`;

const comment = (data) => html`
<li class="comment">
    <header>${data.author.email}</header>
    <p>${data.content}</p>
</li>`;

export const commentsView = (recipe, comments, ctx) => commentsTemplate(recipe, comments, formView.bind(null, ctx));