import page from '../node_modules/page/page.mjs';

import { contentMiddleware, navigationMiddleware } from '../middlewares/render.js';
import { createView } from '../views/create.js';
import { registerView } from '../views/register.js';
import { loginView } from '../views/login.js';
import { homeView } from '../views/home.js';
import { logoutView } from '../views/logout.js';
import { detailsView } from '../views/details.js';

page(contentMiddleware);
page(navigationMiddleware);

page('/', homeView);
page('/login', loginView);
page('/create', createView);
page('/register', registerView);
page('/details/:id', detailsView);
page('/logout', logoutView);
page.start();