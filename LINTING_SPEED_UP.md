# Speed up linting

## Goal

Improve linting speed for developer and CI

### Developer

* use `--cache`
without: `pnpm run eslint-nocache  202.98s user 32.31s system 129% cpu 3:01.33 total`
with: `pnpm run eslint  11.26s user 1.58s system 97% cpu 13.157 total`
