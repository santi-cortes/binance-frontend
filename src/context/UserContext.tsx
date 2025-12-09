import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  name: string | null;
  setName: (name: string) => void;
}

const UserContext = createContext<UserContextType>({
  name: null,
  setName: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setNameState] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user_name");
    if (saved) setNameState(saved);
  }, []);

  const setName = (newName: string) => {
    setNameState(newName);
    localStorage.setItem("user_name", newName);
  };

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
