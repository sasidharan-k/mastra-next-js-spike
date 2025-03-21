import { RemoteMCPClient } from './client.js';

const client = new RemoteMCPClient({
  remoteUrl: process.env.REMOTE_URL || 'http://localhost:8080'
});

void client.start();