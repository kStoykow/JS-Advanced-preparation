import { getToken } from "./auth.js";

function req(method, url, data) {
    let options = {
        headers: {
            'content-type': 'application/json',
        },
    };


    if (method != 'GET' && method != 'DELETE') {
        options = {
            method: method,
            body: JSON.stringify(data)
        }
    }

    let token = getToken();
    console.log(token);
    if (token) {
        options.headers['X-Authorization'] = token;
    }

    return fetch(url, options)
        .then(res => res.json())
}

export const get = req.bind(null, 'GET');
export const post = req.bind(null, 'POST');
//NOT WORKING