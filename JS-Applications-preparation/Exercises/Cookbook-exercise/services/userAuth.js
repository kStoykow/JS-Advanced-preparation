export const getUser = () => {
    const serializedUser = localStorage.getItem('user');

    if (serializedUser) {
        return JSON.parse(serializedUser);
    }
    return null;
}

export const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return user.accessToken;
    }
    return null;
}

export const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));