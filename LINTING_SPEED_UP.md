# Speed up linting

## Goal

Improve linting speed for developer and CI

### Developer

* use `--cache`
without: `pnpm run eslint-nocache  202.98s user 32.31s system 129% cpu 3:01.33 total`
with: `pnpm run eslint  11.26s user 1.58s system 97% cpu 13.157 total`

### CI

**concurrency**
* update to eslint@9.34.0 +
* use `--concarrency {auto|2|4|6}`
`pnpm run eslint-concarrent-nocache:6  362.26s user 62.15s system 538% cpu 1:18.88 total`
`pnpm run eslint-concarrent-nocache:4  307.74s user 51.29s system 506% cpu 1:10.90 total`
`pnpm run eslint-concarrent-nocache:2  231.17s user 37.17s system 255% cpu 1:45.13 total`

*note*: doesn't make too much sense to put it with `--cache` as it just load up CPU and make it even worse.
`pnpm run eslint:concarrent:4  35.77s user 3.86s system 235% cpu 16.842 total`
