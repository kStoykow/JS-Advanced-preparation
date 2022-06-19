import { html } from '../node_modules/lit-html/lit-html.js';

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

function submitHandler(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
}

export const loginView = (ctx) => {
   
        ctx.render(loginTemplate(submitHandler));
}

