import { getToken } from "./auth.js";

export function req(method, url, data) {
    let options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    if (method != 'GET') {
        options = {
            method: method,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    }

    let token = getToken();
    if (token) {
        options.headers['X-Authorization'] = token;
    }

    return fetch(url, options)
        .then(res => res.json());
}

export const get = req.bind(null, 'GET');
export const post = req.bind(null, 'POST');