const baseElem = document.querySelector('.root');
const errorPage = baseElem.querySelector('.error');

export function renderLogout() {
    errorPage.style.display = 'block';
    errorPage.textContent = 'Successfully Logged out';
}