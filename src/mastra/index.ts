
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { bingAgent } from './agents';
import dotenv from 'dotenv';
dotenv.config();
export const mastra = new Mastra({
  agents: { bingAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
