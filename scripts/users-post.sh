#!/bin/bash

if [ $# -ne 2 ]; then
	echo "Usage: $0 <username>"
	exit 1
fi

curl -sS -H "Content-Type: application/json" -X POST localhost:3000/api/users -d "{\"username\": \"$1\"}"
