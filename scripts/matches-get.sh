#!/bin/bash
curl -sS -X GET localhost:3000/api/matches | jq
