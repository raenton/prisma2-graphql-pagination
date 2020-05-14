# Pagination Example Project with GraphQL, Prisma, Docker and MySQL

Custom built for the purpose of:
  a) Reviewing Prisma@2.0 beta functionality (coming from Prisma@1.3)
  b) Creating a Pagination system that meets the spec of Relay

## Prerequisites

You will need to have Docker, yarn, and NodeJS installed on your system.

## How to use

From root directory, run the following:

```
yarn install          # install dependencies
docker-compose up     # deploy MySQL database with seed schema
prisma generate       # generate the prisma-client
yarn dev              # run the development server with nodemon
```

If you wish to rebuild the Prisma Schema, run:
```
prisma introspect
prisma generate
```
This will result in prisma generating a `/prisma/schema.prisma` from the MySQL tables.
A fresh prisma client (used in the application JS) will then be built.