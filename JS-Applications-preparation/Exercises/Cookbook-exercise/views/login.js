import { html } from '../node_modules/lit-html/lit-html.js';
import * as userCRUD from '../services/userCRUD.js';


const loginTemplate = (submitHandler) => html`
<article class="login-page">
    <h2>Login</h2>
    <form @submit=${submitHandler}>
        <label>E-mail: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <input id="login-btn" type="submit" value="Login">
    </form>
</article>
`;

function submitHandler(ctx, e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    userCRUD.login(data.email, data.password)
        .then(() => ctx.page.redirect('/'));
}

export const loginView = (ctx) => ctx.render(loginTemplate(submitHandler.bind(null, ctx)));

