From envoyproxy/envoy:latest

COPY ./envoy_config.yaml /etc/envoy/envoy.yaml

CMD ["envoy Config","got","updated"]