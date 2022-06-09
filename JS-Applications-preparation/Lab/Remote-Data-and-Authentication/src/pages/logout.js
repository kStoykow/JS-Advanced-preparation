import { updateAuth } from "../auth.js";
import { renderHome } from "./home.js";
import {  currUser } from "../auth.js";

const rootElem = document.querySelector('.root');
const errorPage = rootElem.querySelector('.error');

export function logout() {
    console.log(currUser);
    fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': currUser.token
        }
    })
        .then(res => console.log(res))
    updateAuth();

    errorPage.style.display = 'block';
    errorPage.textContent = 'Successfully Logged out';

    setTimeout(() => {
        errorPage.style.display = 'none';
        renderHome();
    }, 1500);
}