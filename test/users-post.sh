#!/bin/bash

if [ $# -ne 2 ]; then
	echo "Usage: $0 <username> <pin>"
	exit 1
fi

curl -X POST -H "Content-Type: application/json" localhost:3000/api/users -d "{\"username\": \"$1\", \"pin\": \"$2\"}"
