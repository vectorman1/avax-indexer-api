<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

API wrapping data created by [AVAX Indexer](https://github.com/vectorman1/avax-indexer) exposing some endpoints regarding transactions and active addresses.

## Available endpoints

 - `/txs`: returns a paged list of transactions; supported params:
   - `page`: page number (default: 0)
   - `limit`: number of transactions per page (default: 10)
   - `address`: filter by address tx `from` or `to` (default: none)
   - `sort`: `blockNumber` or `value` (default: `blockNumber`)
 - `/addresses`: sorts the addresses by delta of `value` throughout the blocks that are stored; supported params:
   - `sort`: `asc` or `desc` (default: `desc`)

## Required environment variables

- `MONGO_DB_URI` - MongoDB connection string

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

[MIT license](LICENSE)
