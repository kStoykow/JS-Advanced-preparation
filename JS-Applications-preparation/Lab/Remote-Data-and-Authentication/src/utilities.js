function DOMElementFactory(type, content, attribute) {
    const elem = document.createElement(type);
    if (typeof content == 'string') {
        if (type == 'img') {
            elem.src = content;
        } else {
            elem.textContent = content;
        }
    } else {
        if (Array.isArray(content)) {
            content.forEach(e => elem.appendChild(e));
        } else {
            elem.appendChild(content);
        }
    }
    if (attribute !== undefined) {
        attribute.forEach(([k, v]) => elem[k] = v);
    }

    return elem;
}
const article = DOMElementFactory.bind(null, 'article');
const div = DOMElementFactory.bind(null, 'div');
const img = DOMElementFactory.bind(null, 'img');
const h2 = DOMElementFactory.bind(null, 'h2');
const h3 = DOMElementFactory.bind(null, 'h3');
const p = DOMElementFactory.bind(null, 'p');
const ul = DOMElementFactory.bind(null, 'ul');
const li = DOMElementFactory.bind(null, 'li');

export const create = {
    article, div, img, h2, h3, p, ul, li
};
