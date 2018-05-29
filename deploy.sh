#!/bin/sh
npm run build
cp -r build ../FullstackForum/
cd ../FullstackForum
git add .
git commit -m "'$1'"
git push origin master
git push origin heroku
cd ../forumFront