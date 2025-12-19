// src/Provider/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Firebase auth loading
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true); // Role & status loading
  const [userStatus, setUserStatus] = useState("");

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleSignIn = () => signInWithPopup(auth, googleProvider);

  const updateUser = (updateData) =>
    updateProfile(auth.currentUser, updateData);

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch role & status when user changes
  useEffect(() => {
    if (!user) {
      setRole("");
      setUserStatus("");
      setRoleLoading(false);
      return;
    }

    setRoleLoading(true);
    axios
      .get(`http://localhost:5000/donor/role/${user.email}`)
      .then((res) => {
        setRole(res.data?.role || "");
        setUserStatus(res.data?.status || "");
      })
      .catch((err) => {
        console.error("Failed to fetch role/status:", err);
        setRole("");
        setUserStatus("");
      })
      .finally(() => {
        setRoleLoading(false);
      });
  }, [user]);

  const authData = {
    user,
    loading,
    role,
    roleLoading,
    userStatus,
    createUser,
    signIn,
    handleGoogleSignIn,
    updateUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
