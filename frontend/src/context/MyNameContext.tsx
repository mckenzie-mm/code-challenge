import  { createContext, ReactNode, useContext, useState } from 'react';

interface IValue {
  myName: string 
  resetMyName: (item: string) => void
}

const MyNameContext = createContext<IValue | undefined>(undefined);

export const useMyName = () => {
  const context = useContext(MyNameContext);
  if (context === undefined) {
    throw new Error('useMyName must be used within a MyNameProvider');
  }
  return context;
};

export const MyNameProvider = ({ children }: {children: ReactNode}) => {
  const [myName, setMyName] = useState<string>("");

  const resetMyName = (item: string) => {
    setMyName(() => item);
  };

  const value: IValue = {
    myName,
    resetMyName,
  };

  return <MyNameContext.Provider value={value}>{children}</MyNameContext.Provider>;
};