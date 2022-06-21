import { render } from '../node_modules/lit-html/lit-html.js';

import * as userServices from "../services/userAuth.js";

const root = document.querySelector('.root');

const renderer = (template) => {
    render(template, root);
}

export const contentMiddleware = (ctx, next) => {
    ctx.user = userServices.getUser();
    ctx.render = renderer;

    next();
}