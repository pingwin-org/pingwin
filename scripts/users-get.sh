#!/bin/bash

curl -sS -w "\n" -X GET localhost:3000/api/users -w "\n" | json2csv
