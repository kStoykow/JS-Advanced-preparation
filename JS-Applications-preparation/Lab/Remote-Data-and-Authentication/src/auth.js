const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');

export function updateAuth() {
    let serializedUser = localStorage.getItem('user');
    if (serializedUser) {
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
    }
}

export function getToken() {
    let serializedUser = localStorage.getItem('user');
    if (serializedUser) {
        let user = JSON.parse(serializedUser);
        return user.token;
    }
}