// import { io } from 'socket.io-client';

// const URL =  'http://localhost:4000';
// export const socket = io(URL);


import { io, Socket } from "socket.io-client";

const URL =  'http://localhost:4000';

interface IItem {
  id: string;
  name: string;
  backgroundColor: string;
}

// Define the event interfaces
export interface ServerToClientEvents {
  USERS_LIST: (users: IItem[]) => void;
  ENTER_CHAT: (msg: { id: string, name: string }) => void;
  CHAT_MESSAGE: (msg: {txt: string}) => void;
  QUIT_CHAT: (name: string) => void;
}

export interface ClientToServerEvents {
  ENTER_CHAT: (msg: {id: string, myName: string}) => void;
  CHAT_MESSAGE: (input: string, id: string) => void;
  QUIT_CHAT: (id: string, name: string) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);