# teamsykmelding-arkitektur

## Install dependencies

```bash
bun install
```

## Set environment variable
Since we call the GitHub the api, you have to set up a PAT (personal access token), which has `read:packages`.
You can [create PAT here](https://github.com/settings/tokens).
If you have a PAT that you use to access maven packages in GitHub, you can reuse this.
In your `.bashrc` or `.zshrc`, set the following environment variable:
``` shell bash
export GH_TOKEN='supersecretkey'
```

## Run locally

```bash
bun run src/index.ts
```

## Run locally with docker:
### build
```bash
bun install
bun run prebuild
bun run build:server
docker build -t teamsykmelding-arkitektur .

```
### Run
```bash
docker run -d --rm -it -p 3000:3000 teamsykmelding-arkitektur
```