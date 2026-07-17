# Minimal image so MCP directories (e.g. Glama) can start the server and run
# introspection (initialize + tools/list work without an API key).
FROM node:20-slim

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY src ./src

ENTRYPOINT ["node", "src/index.js"]
