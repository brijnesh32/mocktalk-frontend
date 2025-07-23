// src/context/AppContext.js
import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [compact, setCompact] = useState(false); // NEW

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user?.photoURL) {
      setProfileImage(user.photoURL);
    }

    const onFullScreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

  return (
    <AppContext.Provider
      value={{
        profileImage,
        isFullscreen,
        setIsFullscreen,
        compact,
        setCompact, // NEW
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
