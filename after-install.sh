cd /home/ubuntu/stock
sudo rm -r stock
docker stop stock
docker rm stock
docker image rm stock
docker build -t stock -f ./Dockerfile .
docker run -dit -p 3001:3001 --name stock stock