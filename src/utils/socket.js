import {io} from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL if different

export const BASE_URL = 'http://localhost:3000';
export default socket;