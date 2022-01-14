import { camelize } from "./camelize.ts";

const users = new Set<WebSocket>();

function broadcast(message: string, senderId?: string): void {
  if (!message) return;
  for (const user of users) {
    if (user.readyState) {
      user.send(senderId ? `[${senderId}]: ${message}` : message);
    }
  }
}

export function chat(ws: WebSocket): void {
  let userId = crypto.randomUUID().slice(-6);
  users.add(ws);
  broadcast(`> User with the id ${userId} is connected`);
  ws.onopen = (e) => {
    ws.send(`welcome, ${userId}`);
  }
  ws.onmessage = (e) => {
    const message = camelize(typeof e.data === "string" ? e.data : "");
    // console.log("E: ", e, typeof e);
    broadcast(message, userId);
  };
  ws.onclose = (e) => {
    users.delete(ws);
    broadcast(`> User with the id ${userId} is disconnected`);
  };
}
