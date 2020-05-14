# Pagination Example Project with GraphQL, Prisma, Docker and MySQL

Custom built for the purpose of:

- Reviewing Prisma@2.0 beta functionality (coming from Prisma@1.3)
- Creating a Pagination system that meets the spec of Relay

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
You can now navigate to `http://localhost:3000` to use the GraphQL Playground (supplied by `graphql-yoga`).


If you wish to rebuild the Prisma Schema, run:
```
prisma introspect
prisma generate
```
This will result in prisma generating a `/prisma/schema.prisma` from the MySQL tables.
A fresh prisma client (used in the application JS) will then be built.

## Example Usage

For a quickstart, try running the following query:
```
query {
  posts(paginationInput:{
    first: 2,
  }) {
    count,
    edges {
      cursor,
      node {
        id,
        title,
        content
        createdAt
      }
    },
    pageInfo {
      startCursor,
      endCursor,
      hasPrevPage,
      hasNextPage
    }
  }
}
```

The result should be something like this:
```
{
  "data": {
    "posts": {
      "count": 2,
      "edges": [
        {
          "cursor": "VGh1IE1hciAyOSAyMDEyIDA3OjI2OjMzIEdNVCswMTAwIChCcml0aXNoIFN1bW1lciBUaW1lKQ==",
          "node": {
            "id": "8",
            "title": "Docker is cool",
            "content": "Correct",
            "createdAt": "2012-03-29T06:26:33.000Z"
          }
        },
        {
          "cursor": "U2F0IEF1ZyAyMCAyMDExIDE5OjMwOjExIEdNVCswMTAwIChCcml0aXNoIFN1bW1lciBUaW1lKQ==",
          "node": {
            "id": "6",
            "title": "I miss pandan buns",
            "content": "I really do",
            "createdAt": "2011-08-20T18:30:11.000Z"
          }
        }
      ],
      "pageInfo": {
        "startCursor": "VGh1IE1hciAyOSAyMDEyIDA3OjI2OjMzIEdNVCswMTAwIChCcml0aXNoIFN1bW1lciBUaW1lKQ==",
        "endCursor": "U2F0IEF1ZyAyMCAyMDExIDE5OjMwOjExIEdNVCswMTAwIChCcml0aXNoIFN1bW1lciBUaW1lKQ==",
        "hasPrevPage": false,
        "hasNextPage": true
      }
    }
  }
}
```
