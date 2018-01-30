#!/bin/bash

if [ $# -ne 5 ]; then
	echo "Usage: $0 <player1.username> <player1.pin> <player2.username> <player2.pin> <winner>"
	exit 1
fi

curl -sS -H "Content-Type: application/json" -X POST localhost:3000/api/matches -d @- << EOF

{
  "player1": {
    "username": "$1",
    "pin": $2
  },
  "player2": {
    "username": "$3",
    "pin": $4
  },
  "winner": "$5"
}
EOF
