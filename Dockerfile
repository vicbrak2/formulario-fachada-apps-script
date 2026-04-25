FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html /usr/share/caddy/index.html
COPY logo.png /usr/share/caddy/logo.png
COPY banner.jpg /usr/share/caddy/banner.jpg
