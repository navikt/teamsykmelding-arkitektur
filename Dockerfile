FROM gcr.io/distroless/base

COPY dist/server /
COPY .cache/graph.json /.cache/
COPY public /public

ENV NODE_ENV=production
EXPOSE 3000

CMD ["./server"]
