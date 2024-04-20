import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("🚀 ~ AuthProviders ~ user:", user)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    console.log("🚀 ~ login ~ email, password:", email, password)
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log("Loginssss",response)
      const { token,user } = response.data;
      localStorage.setItem("access-token", token);
      setUser(user);
      // message.success("Login successful");
      
    } catch (error) {
      console.error("Login failed:", error.message);
      // message.error("Invalid Email and Password")
    } finally {
      setLoading(false);
    }
  };

  const signinWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider).finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        localStorage.removeItem("access-token");
        setUser(null);
      })
      .catch((error) => console.error("Sign out error:", error))
      .finally(() => setLoading(false));
  };

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("access-token");
      if (token) {
        const response = await axios.get("http://localhost:5000/verifyToken", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          // console.log("Responseeee", response.data);
          setUser(response.data);
        }
      }
    } catch (error) {
      if (error.response.data.message == "Unauthorize access") {
        localStorage.removeItem("access-token");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const authInfo = {
    user,
    loading,
    error,
    signinWithGoogle,
    login,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
