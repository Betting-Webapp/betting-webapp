import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:5000';

// export const socket = io('http://betting.eastus.cloudapp.azure.com:5000', {
// export const socket = io('http://ec2-3-144-235-181.us-east-2.compute.amazonaws.com', {
// export const socket = io('http://127.0.0.1:5000', {
export const socket = io('https://tornelud.busillis.com', {
    autoConnect: false
  });
