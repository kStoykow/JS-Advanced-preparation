const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');

export function updateAuth() {
    let user = localStorage.getItem('user'); // MAKE REAL

    if (user) {
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
    }
}