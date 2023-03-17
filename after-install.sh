cd /home/ubuntu/stock
docker stop stock
docker rm stock
docker image rm stock
docker build -t stock -f ./Dockerfile .
docker run -dit -p 3001:80 --name stock stock