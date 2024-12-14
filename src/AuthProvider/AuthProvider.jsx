import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  updateProfile,
} from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";

export const authContext = createContext();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUser = (data) => {
    setLoading(true);
    return updateProfile(auth.currentUser, data);
  };
  const singInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const singInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  const singInWithFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };
  const singInWithTwitter = () => {
    setLoading(true);
    return signInWithPopup(auth, twitterProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    singInWithGoogle,
    signOutUser,
    singInWithGithub,
    singInWithFacebook,
    singInWithTwitter,
    updateUser,
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
}
