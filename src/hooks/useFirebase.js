import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  const auth = getAuth();

  // Sing In Using Google
  const loginWithGoogle = (navigate) => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        navigate("/");
        const user = result.user;
        setAuthError("");
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setAuthError(errorMessage);
      });
  };

  // Register new user using email and password
  const registration = (name, email, password, navigate) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setAuthError("");

        // Set user to user state
        const newUser = { email, displayName: name };
        setUser(newUser);

        // Set user to firebase
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            setAuthError(error);
          });
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Login user using email and password
  const loginUser = (email, password, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setAuthError("");

        // Redirect user where he/she wanted to go
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Observing user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthError("");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  // LogOut
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setAuthError(error);
      });
  };

  return {
    user,
    authError,
    loading,
    loginWithGoogle,
    registration,
    loginUser,
    logOut,
    setLoading,
    setAuthError,
  };
};

export default useFirebase;
