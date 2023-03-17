docker stop stock
docker rm stock
docker image rm stock
docker build -t stock .
docker run -dit -p 3001:80 --name stock stock