#!/usr/bin/env bash

# Simple test script that echoes back what you say,
# but base64 encodes it first.

i=0

dir="tests/output"

mkdir -p "$dir"

while IFS=$'\n' read -r line; do
  base64 -d <<< "$line" > "$dir/$i.bin"

  echo -n "$i" | base64

  ((i++))
done

