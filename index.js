#!/usr/bin/env node

import { WebSocketServer } from "ws";
import { parseArgs } from "util";
import { spawn } from "child_process";
import { dirname } from "path";

const args = parseArgs({
  options: {
    port: {
      type: "string",
      short: "p",
    },
    base64: {
      type: "boolean",
      short: "b",
    },
  },
  allowPositionals: true,
});

const wss = new WebSocketServer({
  port: parseInt(args.values.port) || 3030,
});

console.debug("Listening on port", wss.options.port);
console.debug(
  "Dev console at",
  `${dirname(import.meta.url)}/static/dev.html#${wss.options.port}`
);

const commandName = args.positionals[0];
const commandArgs = args.positionals.slice(1);

wss.on("connection", (ws) => {
  const child = spawn(commandName, commandArgs, {
    stdio: ["pipe", "pipe", "inherit"],
  });

  ws.on("message", (message) => {
    if (args.values.base64) {
      child.stdin.write(message.toString("base64") + "\n");
    } else {
      child.stdin.write(message);
      child.stdin.write("\n");
    }
  });

  child.stdout.on("data", (dataRaw) => {
    const data = args.values.base64
      ? Buffer.from(dataRaw.toString("ascii"), "base64")
      : dataRaw;

    ws.send(data);
  });
});
