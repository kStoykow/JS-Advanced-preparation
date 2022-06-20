export const getUser = () => {
    const serializedUser = localStorage.getItem('user');
    let user;

    if (serializedUser) {
        user = JSON.parse(serializedUser);
        return user;
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

export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}