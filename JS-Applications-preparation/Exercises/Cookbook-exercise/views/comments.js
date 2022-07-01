import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import * as commentsService from '../services/comments.js';
// import { formView } from './commentsForm.js';

const commentsTemplate = (recipe, formView, comments) => html`
<div class="section-title">
    Comments for ${recipe.name}
</div>
${formView()}
<div class="comments">
    ${commentsList(comments)}
</div>`;
//TOFIX

const commentsList = (comments) => html`
<ul>
    ${comments.map(comment)}
</ul>`;

const comment = (email, content) => html`
<li class="comment">
    <header>${email}</header>
    <p>${content}</p>
</li>`;

export const commentsSetup = (recipe,formView, comments) => commentsTemplate(recipe, formView, comments)