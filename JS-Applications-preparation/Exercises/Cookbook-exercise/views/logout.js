import * as userCRUD from '../services/userCRUD.js';

export const logoutView = (ctx) => {
    userCRUD.logout()
        .then(() => ctx.page.redirect('/'));
}