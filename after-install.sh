docker stop stock
docker start stock
docker exec -it stock bash
cd usr/src/app
npm i
nohup node server/index.js &
exit