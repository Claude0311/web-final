// AuthService.js
// handle login logout
// uses sessionStorage, localStorage

import { fitBounds } from "google-map-react";
import { useState } from "react";
import { loginAsNormalUser, logoutUser } from "../axios/axios";

export const setAccount = ({user, auth}) => {    
        window.sessionStorage.setItem("username", user);
        window.sessionStorage.setItem("isAuth", auth);  
}

export const getLocalAccount = () => {
    const user = window.sessionStorage.getItem("username")
    const auth = window.sessionStorage.getItem("isAuth");
    if (user && auth) {
        return {user, isAuth:(auth === 'true')};
    } else {
        return null;
    }
}

export  const removeAccount = () => {
    if (window.sessionStorage.getItem("username")) {
        window.sessionStorage.removeItem("username");
    }
    if (window.sessionStorage.getItem("isAuth")) {
        window.sessionStorage.removeItem("isAuth");
    }
}

export const useAuth = () =>  {
    const [username, setUser] = useState(null);
    const [isAuth, setAuth] =  useState(false);

    const login = async({user, password}) => {
        // axios, setAccount
        // return success,
        try {
            const {data:{user:U,auth:A}} = await loginAsNormalUser({user, password});
            setUser(U);
            setAuth(A);
            setAccount({user:U, auth:A});
            return 'success';
        } catch(e) {
            return e?.response?.data?.msg;
        }
        
    }
    const autoLogin = () => {
        const storage = getLocalAccount();
        // console.log(storage)
        if (!storage) {
            return;
        } else {
            setUser(storage.user);
            setAuth(storage.isAuth);
            return;
        }

    }
    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
            setAuth(false);
            removeAccount();
            return 'success';
        } catch(e) {
            console.log(e);
            return 'error';
        }
    }
    return { username, isAuth,  login, logout, autoLogin };
}