import dotenv from 'dotenv';
dotenv.config();

import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { bingAgent } from './agents';
import { weatherAgent } from './agents/weatherAgent';


export const mastra = new Mastra({
  agents: { bingAgent, weatherAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
