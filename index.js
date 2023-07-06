#!/usr/bin/env node

import { WebSocketServer } from "ws";
import { parseArgs } from "util";
import { spawn } from "child_process";
import { dirname } from "path";

const args = parseArgs({
  options: {
    help: {
      type: "boolean",
      short: "h",
    },
    port: {
      type: "string",
      short: "p",
    },
    base64: {
      type: "boolean",
      short: "b",
    },
    devconsole: {
      type: "boolean",
      short: "d",
    },
  },
  allowPositionals: true,
});

function usage() {
  console.log(
    `
Usage: websocket-node [options] <command> [args...]

<command>         The command to run per connection.
[args...]         Arguments to pass to the command.

Options:
  -h, --help      Show this help message and exit.
  -p, --port      Port to listen on. Defaults to 3030.
  -b, --base64    Encode/decode stdin/stdout as base64.
`.trim()
  );

  process.exit(0);
}

if (args.values.help) {
  usage();
}

const commandName = args.positionals[0];
const commandArgs = args.positionals.slice(1);

if (!commandName) {
  console.error("Error: missing <command> argument.\n");
  usage();
}

const wss = new WebSocketServer({
  port: parseInt(args.values.port) || 3030,
});

console.debug("Listening on port", wss.options.port);
if (args.values.devconsole) {
  console.debug(
    "Dev console at",
    `${dirname(import.meta.url)}/static/dev.html#${wss.options.port}`
  );
}
console.debug("");

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
