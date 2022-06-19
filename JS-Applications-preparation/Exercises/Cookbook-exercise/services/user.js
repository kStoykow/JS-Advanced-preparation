export const isAuthenticated = () => {
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
    return user.token;
}