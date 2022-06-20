import { html } from '../node_modules/lit-html/lit-html.js';

import * as userCRUD from '../services/userCRUD.js';

const registerTemplate = (registerHandler) => html`
<article class="register-page">
    <h2>Register</h2>
    <form @submit=${registerHandler}>
        <label>E-mail: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <label>Repeat: <input type="password" name="rePass"></label>
        <input id="register-btn" type="submit" value="Register">
    </form>
</article>
`;

function registerHandler(ctx, e) {
    e.preventDefault();
    const { email, password, rePass } = Object.fromEntries(new FormData(e.currentTarget));

    if (email == '' || password == '' || rePass == '') {
        return alert('All fields must be filled!');
    }
    if (password != rePass) {
        return alert('Passwords don\'t match!');
    }

    userCRUD.register(email, password, rePass)
        .then(() => ctx.page.redirect('/'));
}

export const registerView = (ctx) => {
    ctx.render(registerTemplate(registerHandler.bind(null, ctx)));
}