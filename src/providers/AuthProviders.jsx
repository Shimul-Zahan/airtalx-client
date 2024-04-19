import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const createUser = (name, email, password, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, name, email, password, photoURL);
    }

    const signin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signinWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
        })
        .catch(error => {
            console.log(error.message);
            setError(error.message);
        })
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user is'.currentUser);

            //get and set token
            if(currentUser){
                axios.post('http://localhost:5000/jwt', {email: currentUser.email})
                .then(data => {
                    console.log(data.data.token);
                    localStorage.setItem('access-token', data.data.token);
                })
            }
            else{
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        error,
        createUser,
        signin,
        signinWithGoogle,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;