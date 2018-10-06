#!/bin/sh

if [ -z "$1" ]
then
    echo "No commit message provided, build canceled"
else

    git add .
    git commit -m "'$1'"
    git push origin master

    npm run build
    cp -r build ../FullstackForum/client/

    cd ../FullstackForum
    git add .
    git commit -m "'$1'"
    git push origin master
    git push heroku master

    cd ../forumFront
fi