
import { Socket } from "socket.io-client";
import { createContext, ReactNode, useContext } from 'react';
import { ClientToServerEvents, ServerToClientEvents, socket } from '../socket';

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const SocketContext = createContext<AppSocket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: {children: ReactNode}) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};