## Moves API

## Configuration

Create a .env file in the root directory with the following environment variables:

```sh
PORT
mongoUri
```

Create a MongoDB cluster on mongo atlas and retrieve the uri.

## Getting Started

From your terminal:

```sh
npm run dev
```

## Endpoints

'GET /moves'
Retrieve all saved movements.

'POST /moves'
Save a new movement.

'DELETE /deletemove/:id'
Delete move.
