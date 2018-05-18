# macilent

configuring envoy
1. Command to start envoy
docker container run -d -p 10000:10000 envoyproxy/envoy:latest

2.
config through Yaml script
docker container run -p 10000:10000 envoyproxy/envoy:latest -c ./tmp/envoy_config.yaml

Dettached
docker container run -p 10000:10000 envoyproxy/envoy:latest

How to pass configuration to envoy docker


Getting inside the docker
docker exect -it 3c197b6b2c65 bash

Getting inside via root 
docker exec -u 0 -it 822bf76c26aa bash