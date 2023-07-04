#!/usr/bin/env node

import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 3030,
});

wss.on("connection", (ws) => {});
