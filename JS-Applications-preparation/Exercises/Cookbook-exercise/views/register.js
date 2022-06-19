import { html } from '../node_modules/lit-html/lit-html.js';

const registerTemplate = () => html`
<article class="register-page">
    <h2>Register</h2>
    <form>
        <label>E-mail: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <label>Repeat: <input type="password" name="rePass"></label>
        <input id="register-btn" type="submit" value="Register">
    </form>
</article>
`;

export const registerView = (ctx) => {
    ctx.render(registerTemplate());
}