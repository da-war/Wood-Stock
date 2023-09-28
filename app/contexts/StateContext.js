import React, { useEffect } from "react";
const StateContext = React.createContext();
const StateProvider = ({ children }) => {
  const [admin, setAdmin] = React.useState("driver");

  React.useLayoutEffect(() => {
    getModeFromAsyncStorage();
  }, []);

  const getModeFromAsyncStorage = async () => {
    const mode = await AsyncStorage.getItem("mode");
    if (mode === "admin") {
      setAdmin("admin");
    }
    if (mode === "nuser") {
      setAdmin("nuser");
    } else {
      setAdmin("nuser");
    }
  };

  return (
    <StateContext.Provider value={{ admin, setAdmin }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
