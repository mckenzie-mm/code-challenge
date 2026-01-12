import { createContext, ReactNode, useContext, useState } from 'react';

interface IValue {
  items: IItem[] 
  resetItems: (items: IItem[]) => void
}

export interface IItem {
  id: string;
  name: string;
  backgroundColor: string;
}

const ListContext = createContext<IValue | undefined>(undefined);

export const useList = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};

export const ListProvider = ({ children }: {children: ReactNode}) => {
  const [items, setItems] = useState<IItem[]>([]);

  const resetItems = (items: IItem[]) => {
    setItems(() => items);
  };
  const value = {
    items,
    resetItems,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};