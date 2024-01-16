import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const loginEndpoint = 'http://localhost:3001/auth/login'; 
const meEndpoint = 'http://localhost:3001/auth/me';       
const logoutEndpoint = 'http://localhost:3001/auth/logout'
const registerEndpoint = 'http://localhost:3001/auth/register'

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState();
    // console.log(user);

    useEffect(() => {
        fetch(meEndpoint, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()
            }).then((userdata) => {
                setUser(userdata)
            }).catch((e) => {
                console.log(e)
            })
    }, [])

    const login = async (userData) => {

        const response = await fetch(loginEndpoint, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        // setUser(responseData.email);
        setUser(responseData);
        console.log(responseData.email);
    };

    const logout = async () => {

        const response = await fetch(logoutEndpoint, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // setUser(null);
        setUser();
    };

    const register = async (userData) => {
        try {
            const response = await fetch(registerEndpoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            // setUser(responseData.email);
            // console.log(responseData.email);
            console.log(responseData);
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};