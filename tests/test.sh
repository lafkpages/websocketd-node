#!/usr/bin/env bash

# Simple test script that echoes back what you say

while IFS=$'\n' read -r line; do
  echo "You said: $line"
done

