const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');

export let currUser = undefined;

export function updateAuth(token) {
    if (token) {
        currUser = JSON.parse(localStorage.getItem(token.username));
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
    }
}