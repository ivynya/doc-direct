
FROM denoland/deno:alpine-1.29.1
WORKDIR /app
COPY deps.ts .
COPY . .
RUN deno cache main.ts

EXPOSE 8000
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]