import { serve } from "https://deno.land/std/http/server.ts";
import { chat } from "./chat.ts";

serve((req) => {
  const url = new URL(req.url);
  if (req.method === "GET" && url.pathname === "/") {
    console.log("hehe");
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
    console.log("hehei");
    let { response, socket } = Deno.upgradeWebSocket(req);
    socket
    chat(socket);
    return response;
  }
  return new Response("Hello world");
}, { port: 3000 });

console.log("Server running on localhost:3000");
