FROM oven/bun:latest

WORKDIR /app

COPY /bun.lockb /app
COPY /bunfig.toml /app
COPY /package.json /app
COPY /src /app

COPY .cache/graph.json /app/.cache/
COPY public /app/public

RUN bun install --production

ENV NODE_ENV=production
EXPOSE 8080

CMD ["./server/index.ts"]
