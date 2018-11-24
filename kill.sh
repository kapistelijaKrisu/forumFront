#!/bin/sh

if [ -z "$1" ]
then
    fuser -k 3002/tcp
    echo "default 3002 process killed"
else
    fuser -k $1/tcp
fi
