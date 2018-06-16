#!/bin/bash

if [ $# -ne 5 ]; then
	echo "Usage: $0 <player1.username> <player2.username> <winner>"
	exit 1
fi

curl -sS -H "Content-Type: application/json" -X POST localhost:3000/api/matches -d @- << EOF

{
  "player1": {
    "username": "$1",
  },
  "player2": {
    "username": "$2",
  },
  "winner": "$3"
}
EOF
