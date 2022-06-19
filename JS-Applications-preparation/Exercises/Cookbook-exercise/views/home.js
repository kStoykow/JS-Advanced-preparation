import { html } from '../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
<p>hi</p>
`;

export const homeView = (ctx) => {
    ctx.render(homeTemplate());
}