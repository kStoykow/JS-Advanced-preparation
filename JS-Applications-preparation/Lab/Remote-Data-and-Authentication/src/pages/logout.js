import { updateAuth } from "../auth.js";
import { renderHome } from "./home.js";
import { getToken } from "../auth.js";

const rootElem = document.querySelector('.root');
const errorPage = rootElem.querySelector('.error');

export function logout() {

    let token = getToken();

    fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    })
        .then(res => {
            if (res.ok) {
                errorPage.style.display = 'block';
                errorPage.textContent = 'Successfully Logged out';

                localStorage.removeItem('user');
                updateAuth();

                setTimeout(() => {
                    errorPage.style.display = 'none';
                    renderHome();
                }, 1500);
            }
        });
}