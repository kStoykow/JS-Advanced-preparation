const rootElem = document.querySelector('.root');
const errorPage = rootElem.querySelector('.error');

export function renderError() {
    errorPage.style.display = 'block';
}