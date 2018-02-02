#!/bin/bash

# silly script

# https://www.youtube.com/watch?v=Dzn0tIy3dzM
longname="Johann Gambolputty de von Ausfern-schplenden-schlitter-crasscrenbon-fried-digger-dingle-dangle-dongle-dungle-burstein-von-knacker-thrasher-apple-banger-horowitz-ticolensic-grander-knotty-spelltinkle-grandlich-grumblemeyer-spelterwasser-kurstlich-himbleeisen-bahnwagen-gutenabend-bitte-ein-nurnburger-bratwustle-gernspurten-mitz-weimache-luber-hundsfut-gumberaber-shonedanker-kalbsfleisch-mittler-aucher von Hautkopft of Ulm"

./users-post.sh "John Smith" 1 > /dev/null
./users-post.sh "Donald Trump" 2 > /dev/null
./users-post.sh "$longname" 3 > /dev/null
./users-post.sh "Lorem Ipsum" 4 > /dev/null


./matches-post.sh "John Smith" 1 "Donald Trump" 2 "John Smith"
./matches-post.sh "John Smith" 1 "Donald Trump" 2 "John Smith"
./matches-post.sh "John Smith" 1 "Donald Trump" 2 "John Smith"

./matches-post.sh "John Smith" 1 "$longname" 3 "$longname"

./matches-post.sh "John Smith" 1 "Lorem Ipsum" 4 "Lorem Ipsum"


echo
./users-get.sh
