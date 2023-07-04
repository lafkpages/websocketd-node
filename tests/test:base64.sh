#!/usr/bin/env bash

# Simple test script that echoes back what you say,
# but base64 encodes it first.

while IFS=$'\n' read -r line; do
  lineDecoded=`base64 -d <<< "$line"`

  echo -n "You said: $lineDecoded" | base64
done

