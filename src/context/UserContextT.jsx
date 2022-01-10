import React, { createContext, useState, useEffect } from 'react';
import  Api, {tokenAuth } from '../config/axiosClient';

export const UserContext = createContext();

const UserProvider = (props) => {
    // logged user state
    const [logged_user, setLogged_user] = useState( JSON.parse(localStorage.getItem('logged_user')) || {})
    // Token
    const [token, setToken] = useState( JSON.parse(localStorage.getItem('token')) || "")
    // view_type state
    const [view_type, setView_type] = useState(JSON.parse(localStorage.getItem('view_type')) || 'C')

    // get logged user on init without returning an empty Object
    useEffect(() => {
      if ( !localStorage.token && !localStorage.view_type ) return
      if ( localStorage.token ) setToken(JSON.parse(localStorage.token))
      if ( localStorage.view_type) setView_type(JSON.parse(localStorage.view_type))
    }, [])


    // Set an new logged user in localStorage
    useEffect(() => {
      if (!logged_user || Object.keys(logged_user).length === 0) {
        localStorage.removeItem('logged_user')
        return
      }
      localStorage.setItem('logged_user', JSON.stringify(logged_user))

    }, [logged_user]);

    // Set an new token in localStorage
    useEffect(() => {
      if (!token && localStorage.token) {
        localStorage.removeItem('token')
        return
      }
      localStorage.setItem('token', JSON.stringify(token))
      tokenAuth(token);
      let user
      (async ()=>{
        user = await Api.get("/auth");
        return user
      })().then(user => {
        setLogged_user(user.data)
      })
    }, [token]);

    // Set an view type in localStorage
    useEffect(() => {
      if (!view_type) {
        localStorage.removeItem('view_type')
        return
      }
      localStorage.setItem('view_type', JSON.stringify(view_type))
    }, [view_type]);

    return (
        <UserContext.Provider
            value={{
                logged_user,
                token,
                view_type,
                setLogged_user,
                setToken,
                setView_type
            }}
        >
            {props.children}
        </UserContext.Provider>
     );
}

export default UserProvider;
