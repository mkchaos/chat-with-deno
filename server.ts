import { serve } from "https://deno.land/std/http/server.ts";
import { chat } from "./chat.ts";

serve((req) => {
  const url = new URL(req.url);
  if (req.method === "GET" && url.pathname === "/") {
    return new Response(
      Deno.readTextFileSync("./index.html"),
      {
        status: 200,
        headers: new Headers({
          "content-type": "text/html",
        }),
      },
    );
  }
  // WebSockets Chat
  if (req.method === "GET" && url.pathname === "/ws") {
    let { response, socket } = Deno.upgradeWebSocket(req);
    chat(socket);
    return response;
  }
  return new Response("Hello world");
}, { port: 3000 });

console.log("Server running on localhost:3000");
