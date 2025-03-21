"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tyler GenAI Workflows (alpha)</h1>
        
        
      </div>

      <p className="my-4">This server exposes Mastra workflows for driving standard workflows</p>
      <p className="my-4"><span className="font-bold">Note: </span>This framework is being evaluated for wider use across Tyler. It should be considered Alpha and subject to change in the future</p>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            <span className="font-bold">
              <Link href="/workflows" className="text-blue-600 hover:underline">
                Playground
              </Link>
            </span> - Visit the playground to play around with the workflows
          </li>
          <li>
            <span className="font-bold">
              <Link href="/swagger-ui" className="text-blue-600 hover:underline">
                Swagger Docs
              </Link>
            </span> - Visit the Swagger documentation to kick off your own (you'll want the /workflow section)
          </li>
        </ul>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Working with full files</h3>
        <p className="mb-2">
          NOTE: Workflows that require fileIds should use the /upload endpoint.
        </p>
        <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto text-sm">
          {`curl -X POST http://localhost:3000/api/upload \\
  -H "x-api-key: YOUR_API_KEY" \\
  -F "file=@/path/to/your/file.pdf"`}
        </pre>
        <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto mt-2 text-sm">
          {'{"id": "f47ac10b-58cc-4372-a567-0e02b2c3d479"}'}
        </pre>
      </div>
      
     
    </div>
  );
}