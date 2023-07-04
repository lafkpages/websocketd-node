#!/usr/bin/env node

import { WebSocketServer } from "ws";
import { parseArgs } from "util";
import { spawn } from "child_process";

const args = parseArgs({
  options: {
    port: {
      type: "string",
      short: "p",
    },
  },
  allowPositionals: true,
});

const wss = new WebSocketServer({
  port: parseInt(args.values.port) || 3030,
});

wss.on("connection", (ws) => {
  const child = spawn(args.positionals, {
    stdio: ["pipe", "pipe", "inherit"],
  });
});
