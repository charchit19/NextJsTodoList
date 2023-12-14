"use client"
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/middleware/firebase";

const AuthContext = createContext({});

interface UserType {
  email: string | null;
  uid: string | null;
}

export const AuthContextProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [user, setUser] = useState<UserType>({ email: null, uid: null });
  
    const googleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user) {
          setUser({ email: user.email, uid: user.uid });
        }
      } catch (error) {
        console.error("Google Sign In Error:", error);
      }
    };
  
    const logOut = () => {
      signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({ email: currentUser.email, uid: currentUser.uid });
        } else {
          setUser({ email: null, uid: null });
        }
      });
      return () => unsubscribe();
    }, []); 
  
    return (
      <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const UserAuth = () => {
  return useContext(AuthContext);
};
