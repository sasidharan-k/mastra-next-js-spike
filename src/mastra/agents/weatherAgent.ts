import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { createTool } from "@mastra/core/tools";
import { MCPConfiguration } from "@mastra/mcp";
import fs from "fs";
import { bindSearchTool } from "../tools";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("====> sso__filename", __filename, "====> __dirname", __dirname);

const server = process.env.MCP_SERVER || "https://mcp-server-spike-7dc4a77bed11.herokuapp.com//stdio.js";
const directory = __dirname;


const importMCP = async () => {
  try {
    console.log("Fetching stdio.ts from MCP server ------", `${server}`);
    const response = await fetch(`${server}`);

    
    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }
    
    const content = await response.text();

    fs.writeFileSync(`${directory}/stdio.js`, content);

    console.log("Successfully fetched and saved stdio.js");
  } catch (e) {
    console.error("Error importing MCP", e);
  }
};

// const create_tool = (tool: any) => {
//   console.log("Tool ---", tool)
//   return createTool({
//     id: tool?.id,
//     description: tool?.description,
//     inputSchema: tool?.inputSchema,
//     outputSchema: tool?.outputSchema,
//     execute: tool.execute,
//   })
// };

let mcp: MCPConfiguration;

const getWeatherAgent = async () => {
  await importMCP();

  //  Create MCP Client
  try {
    mcp = new MCPConfiguration({
      servers: {
        weather: {
          command: "npx",
          args: [
            "node",
            `${directory}/stdio.js`,
          ],
          env: {
            BING_API_KEY: process.env.BING_API_KEY || "",
          },
        },
      },
    });
  }
  catch (e) {
    console.error("Error creating MCP", e);
  }

  const tool = await mcp.getTools();

  // let weatherTools: any = {}
  // const weatherToolsArray = Object.values(tool).map((item: any) => create_tool(item));

  // weatherToolsArray.map((item: any) => {
  //   weatherTools[item.id] = item;
  // })

  // console.log("weatherTools ----", weatherTools)

  const weatherAgent = new Agent({
    name: "Weather Agent",
    instructions: `Find the weather information for a given location.`,
    model: openai("gpt-4o"),
    tools: { ...tool }
  });

  return weatherAgent;
}

export const weatherAgent = await getWeatherAgent();
