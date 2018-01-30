#!/bin/bash

# silly script

./users-post.sh a 1 > /dev/null
./users-post.sh b 2 > /dev/null
./users-post.sh c 3 > /dev/null
./users-post.sh d 4 > /dev/null


./matches-post.sh a 1 b 2 a
./matches-post.sh a 1 b 2 a
./matches-post.sh a 1 b 2 a

./matches-post.sh a 1 c 3 c

./matches-post.sh a 1 d 4 d


echo
./users-get.sh
