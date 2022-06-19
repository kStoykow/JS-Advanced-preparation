import { html } from '../node_modules/lit-html/lit-html.js';

const userTemplate = html`
    <a href="/create">Create Recipe</a>
    <a id="logoutBtn" href="/logout">Logout</a>
`;

const guestTemplate = html`
    <a href="/login">Login</a>
    <a href="/register">Register</a>
`;

const navTemplate = (user) => html`
<h1>My Cookbook</h1>
<nav>
    <a href="/" class="active">Catalog</a>

    ${user
    ? userTemplate
    : guestTemplate}
</nav>
`;

export const navView = (user) => {
    return navTemplate(user);
}