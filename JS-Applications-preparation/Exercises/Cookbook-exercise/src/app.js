import page from '../node_modules/page/page.mjs';

import { contentMiddleware } from '../middlewares/render.js';
import { navigationMiddleware } from '../middlewares/navigation.js';
import { createView } from '../views/create.js';
import { registerView } from '../views/register.js';
import { loginView } from '../views/login.js';
import { homeView } from '../views/home.js';
import { logoutView } from '../views/logout.js';
import { detailsView } from '../views/details.js';
import { editView } from '../views/edit.js';
import { catalogView } from '../views/catalog.js';

localStorage.clear();

page(contentMiddleware);
page(navigationMiddleware);

page('/', homeView);
page('/login', loginView);
page('/details/:id', detailsView);
page('/catalog/:page', catalogView);
page('/catalog', catalogView);
page('/edit/:id', editView);
page('/create', createView);
page('/register', registerView);
page('/logout', logoutView);
page.start();