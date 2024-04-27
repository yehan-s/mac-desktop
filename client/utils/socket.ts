import { io } from "socket.io-client";

const socket = io("http://localhost:80/events");

export default socket;
