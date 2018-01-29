#!/bin/bash
curl -X POST -H "Content-Type: application/json" localhost:3000/api/users -d '{"name": "p1"}'
