FROM node:24-alpine
WORKDIR /app
RUN apk add --no-cache \
    g++ \
    python3 \
    py3-pip \
    openjdk17 \
    bash \
    make \
    libc6-compat \
 && ln -sf python3 /usr/bin/python  # Symlink python -> python3

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
