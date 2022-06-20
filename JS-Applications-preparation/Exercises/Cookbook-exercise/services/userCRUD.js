import * as request from './requester.js';
import * as  userService from './user.js';

const baseUrl = 'http://localhost:3030';
const loginUrl = `${baseUrl}/users/login`;
const registerUrl = `${baseUrl}/users/register`;
const logoutUrl = `${baseUrl}/users/logout`;

export const login = (email, password) =>
    request.post(loginUrl, { email, password })
        .then(res => {
            if (res.code != 403) {
                userService.saveUser(res);

                return res;
            } else {
                alert(res.message);
            }
        });


export const register = (email, password, repeat) =>
    request.post(registerUrl, { email, password, repeat })
        .then(res => {
            if (res.code == 409) {
                throw new Error(res.message);
            }
            userService.saveUser(res);
        })
        .catch(err => alert(err.message));


export const logout = () =>
    request.get(logoutUrl)
        .then(() => {
            localStorage.clear();
        });
