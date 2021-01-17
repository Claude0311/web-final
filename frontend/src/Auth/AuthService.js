// AuthService.js
// handle login logout
// uses sessionStorage, localStorage

import { useState } from "react";
import { loginAsNormalUser, logoutUser } from "../axios/axios";

export const setAccount = ({user, password}) => {    
        window.sessionStorage.setItem("username", user);
        window.sessionStorage.setItem("password", password);  
}

export const getLocalAccount = () => {
    const user = window.sessionStorage.getItem("username")
    const password = window.sessionStorage.getItem("password")
    if (user && password) {
        return {user, password};
    } else {
        return null;
    }
}

// export const isAuthenticated = () => {
//     if (window.sessionStorage.getItem("auth") === null) {
//         return false;
//     } else {
//         return true;
//     }
// }

export  const removeAccount = () => {
    if (window.sessionStorage.getItem("username")) {
        window.sessionStorage.removeItem("username");
    }
    if (window.sessionStorage.getItem("password")) {
        window.sessionStorage.removeItem("password");
    }
}


export const useAuth = () =>  {
    const [username, setUser] = useState(null);
    const [isAuth, setAuth] =  useState(false);

    const login = async({user, password}) => {
        // axios, setAccount
        // return success,
        try {
            const {data} = await loginAsNormalUser({user, password});
            setUser(data.user);
            setAuth(data.auth);
            setAccount({user, password});
            return 'success';
        } catch(e) {
            return e?.response?.data?.msg;
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
    return { username, isAuth,  login, logout };
}