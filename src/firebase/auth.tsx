"use client";

import { initializeApp } from "firebase/app";
import {
  AuthErrorCodes,
  GoogleAuthProvider,
  User,
  UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";

import { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
  signInWithGoogle: () => Promise<any>;
  signOutUser: () => Promise<any>;
}

const firebaseConfig = {
  apiKey: "AIzaSyB55r468rIdrYgnwpK9hMqM7qoXE5Faq4I",
  authDomain: "food-ordering-app-4d5d2.firebaseapp.com",
  projectId: "food-ordering-app-4d5d2",
  storageBucket: "food-ordering-app-4d5d2.appspot.com",
  messagingSenderId: "823324329327",
  appId: "1:823324329327:web:30fc510935693b0216149a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const AuthContext = createContext<ContextProps>({} as ContextProps);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const auth = UseAuthProvider();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };

export const useAuth = () => useContext(AuthContext);

//

export const UseAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);

  const signInWithGoogle = async (): Promise<any> => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result));
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes(AuthErrorCodes.POPUP_CLOSED_BY_USER)) {
          throw new Error("Pop up closed BY user");
        } else if (e.message.includes(AuthErrorCodes.TIMEOUT)) {
          throw new Error("The operation has timed out.");
        } else if (e.message.includes(AuthErrorCodes.USER_CANCELLED)) {
          throw new Error(
            "The user did not grant your application the permissions it requested."
          );
        } else if (e.message.includes(AuthErrorCodes.POPUP_BLOCKED)) {
          throw new Error(
            "Unable to establish a connection with the popup. It may have been blocked by the browser."
          );
        } else {
          throw new Error("something went wrong");
        }
      }
    }
  };
  const signOutUser = () => {
    const result = signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .catch((error) => {
        return error;
      });
    return result;
  };

  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        user ? setUser(user) : setUser(null);
      });
    };

    return () => {
      unsubscribe();
    };
  });

  return { user, signInWithGoogle, signOutUser };
};
