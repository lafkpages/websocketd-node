#!/usr/bin/env node

import { WebSocketServer } from "ws";
import { parseArgs } from "util";

const args = parseArgs({
  options: {
    port: {
      type: "string",
      short: "p",
    },
  },
});

const wss = new WebSocketServer({
  port: parseInt(args.values.port) || 3030,
});

wss.on("connection", (ws) => {});
