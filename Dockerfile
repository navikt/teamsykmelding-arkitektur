FROM gcr.io/distroless/base-nossl-debian12

COPY dist/server /
COPY .cache/graph.json /.cache/
COPY public /public

ENV NODE_ENV=production
EXPOSE 3000

CMD ["./server"]
