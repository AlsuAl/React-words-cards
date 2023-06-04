import { createContext } from "react";
import { WordsStore } from "../components/stores/WordsStore.jsx";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const wordsStore = new WordsStore();

  return (
    <AppContext.Provider value={wordsStore}>{children}</AppContext.Provider>
  );
};
