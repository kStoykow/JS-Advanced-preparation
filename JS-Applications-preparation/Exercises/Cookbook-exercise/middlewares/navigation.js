import { render } from '../node_modules/lit-html/lit-html.js';

import { navView } from '../views/nav.js';

const nav = document.querySelector('.navigation');

export const navigationMiddleware = (ctx, next) => {
    render(navView(ctx.user), nav);
    next();
}