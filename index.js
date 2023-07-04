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

const commandName = args.positionals[0];
const commandArgs = args.positionals.slice(1);

wss.on("connection", (ws) => {
  const child = spawn(commandName, commandArgs, {
    stdio: ["pipe", "pipe", "inherit"],
  });

  ws.on("message", (message) => {
    child.stdin.write(message);
  });

  child.stdout.on("data", (data) => {
    ws.send(data);
  });
});
