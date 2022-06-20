import { render } from '../node_modules/lit-html/lit-html.js';

import { navView } from '../views/nav.js';

import * as userServices from "../services/user.js";

const nav = document.querySelector('.navigation');
const root = document.querySelector('.root');

const renderer = (template) => {
    render(template, root);
}

export const contentMiddleware = (ctx, next) => {
    ctx.user = userServices.getUser();
    ctx.render = renderer;

    next();
}

export const navigationMiddleware = (ctx, next) => {
    render(navView(ctx.user), nav);
    next();
}