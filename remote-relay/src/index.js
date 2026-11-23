import { DurableObject } from "cloudflare:workers";

// Relays messages between the deck (the Mac showing slides) and the remote (the phone).
// Deck sends { type: "state", ... }, remote sends { type: "cmd", action }.
export class Room extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong"));
  }

  async fetch(request) {
    const role = new URL(request.url).searchParams.get("role");
    const { 0: client, 1: server } = new WebSocketPair();

    // Only one Mac tab is in control. The newest one wins.
    if (role === "deck") {
      for (const old of this.open("deck")) {
        try {
          old.close(4000, "replaced");
        } catch {}
      }
    }
    this.ctx.acceptWebSocket(server, [role]);

    if (role === "remote") {
      const state = await this.ctx.storage.get("state");
      if (state) server.send(state);
    }
    this.presence();
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, message) {
    if (typeof message !== "string" || message.length > 2048) return;
    let msg;
    try {
      msg = JSON.parse(message);
    } catch {
      return;
    }
    const [role] = this.ctx.getTags(ws);

    if (role === "deck" && msg.type === "state") {
      await this.ctx.storage.put("state", message);
      this.send("remote", message);
    } else if (role === "remote" && msg.type === "cmd") {
      this.send("deck", message);
    }
  }

  webSocketClose(ws, code, reason) {
    try {
      ws.close(code, reason);
    } catch {}
    this.presence();
  }

  webSocketError() {
    this.presence();
  }

  open(tag) {
    return this.ctx.getWebSockets(tag).filter((ws) => ws.readyState === WebSocket.OPEN);
  }

  send(tag, message) {
    for (const ws of this.open(tag)) {
      try {
        ws.send(message);
      } catch {}
    }
  }

  presence() {
    const message = JSON.stringify({
      type: "presence",
      decks: this.open("deck").length,
      remotes: this.open("remote").length,
    });
    this.send("deck", message);
    this.send("remote", message);
  }
}

async function sameKey(given, expected) {
  const enc = new TextEncoder();
  const a = enc.encode(given);
  const b = enc.encode(expected);
  if (a.byteLength !== b.byteLength) return false;
  return crypto.subtle.timingSafeEqual(a, b);
}

function originAllowed(origin, env) {
  if (!origin) return false;
  const { hostname } = new URL(origin);
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local")) return true;
  if (/^(10|192\.168|172\.(1[6-9]|2\d|3[01]))\./.test(hostname)) return true;
  return (env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim()).includes(origin);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/ws") return new Response("Slide remote relay is up.\n");

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected a WebSocket", { status: 426 });
    }
    const role = url.searchParams.get("role");
    if (role !== "deck" && role !== "remote") {
      return new Response("Unknown role", { status: 400 });
    }
    if (!originAllowed(request.headers.get("Origin"), env)) {
      return new Response("Origin not allowed", { status: 403 });
    }
    const key = url.searchParams.get("key") || "";
    if (!env.PRESENTER_KEY || !(await sameKey(key, env.PRESENTER_KEY))) {
      return new Response("Wrong key", { status: 403 });
    }

    return env.ROOM.getByName("main").fetch(request);
  },
};
