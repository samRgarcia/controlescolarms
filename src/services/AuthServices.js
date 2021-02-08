import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";

export const AUTH_TOKEN = 'app.auth.token';
export const USER_ID = 'app.auth.userID';


const initialValues = {
    exp: 0,
    email: '',
    auth_time: 0,
    aud: '',
    email_verified: false,
    iat: 0,
    user_id: ''
}

const setToken = (token) => Cookies.set(AUTH_TOKEN, token);
const getToken = () => Cookies.get(AUTH_TOKEN);
const decodedToken =  () => {
    return  getToken() &&  jwtDecode(getToken()) || initialValues;
}
const removeToken = () => Cookies.remove(AUTH_TOKEN);
const expiresAt =  () =>  new Date(decodedToken().exp * 1000);
const isExpired =  () =>  new Date() > expiresAt();
const isValid =  () => {
    console.log("expe",isExpired())
    return  !isExpired()
};

//user functions
const getUserID = () => Cookies.get(USER_ID) || '';
const setUserID = (userId) => Cookies.set(USER_ID, userId.toString());
const removeUserID = () => Cookies.remove(USER_ID);
const cleanAllAuth =  () => {
    multiRemove([AUTH_TOKEN, USER_ID]);
}

async function multiRemove(keys) {
    keys.forEach(keys => Cookies.remove(keys))
}

export {
    setToken,
    getToken,
    removeToken,
    getUserID,
    setUserID,
    decodedToken,
    removeUserID,
    cleanAllAuth,
    expiresAt,
    isValid,
    isExpired
}
