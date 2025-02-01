// src/context/AuthProvider.js

import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";  // Correct import path for auth
import axios from "axios";

export const AllContext = createContext();

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign in with Google
    const googleSignInWithPopup = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Register a new user
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update user profile (name)
    const userUpdateOnSignUp = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    };

    // Log in with email and password
    const userLogIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Log out
    const userLogOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // UseEffect to handle auth state changes
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            // Get the user's email
            const userEmail = currentUser?.email || user?.email;

            if (currentUser) {
                // Set a token for this user when logged in
                axios.post('https://community-food-sharing-server-chi.vercel.app/jwt', { email: userEmail }, { withCredentials: true })
                    .then(res => {
                        console.log('Token set: ', res.data);
                    });
            } else {
                // Remove token if logged out
                axios.post('https://community-food-sharing-server-chi.vercel.app/logout', { email: userEmail }, { withCredentials: true })
                    .then(res => {
                        console.log('Token removed', res.data);
                    });
            }
        });

        return () => {
            unSubscribe();
        };

    }, [user]);  // Adding `user` to the dependency array ensures the effect runs when `user` changes.

    // Context value to pass down to children components
    const allInfo = {
        user,
        setUser,
        loading,
        googleSignInWithPopup,
        registerUser,
        userLogIn,
        userLogOut,
        userUpdateOnSignUp,
    };

    return (
        <AllContext.Provider value={allInfo}>
            {children}
        </AllContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
};
