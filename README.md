# NodeJS Concepts Challenge

![Build](https://github.com/cjcbusatto/rocketseat-studies-node-concepts/workflows/Node%20Concepts%20Challenge/badge.svg?branch=master)

## 🚀 Introduction

In this challenge, you should develop a simple CRUD of a resource called `repository`. 
For simplicity, you can use an array as your data storage instead of a database.

A `repository` has the following data structure:

```js
{
    "id": "String (following UUIDv4 standard)",
    "title": "String",
    "url": "String",
    "techs": "Array<String>",
    "likes": "Number"
}
```

## Application Routes

- `POST /repositories`: Receives `title`, `url` and `techs` in the request body. Remember to guarantee that the ID is an UUIDv4 valid String and that the likes counter is initialized with `0`. It should contain in the response the resource created in JSON format.

- `GET /repositories`: Returns the list of all resources currently stored.

- `PUT /repositories/:id`: Updates the `title`, `url` and `techs` properties for the resource ID received in the route parameters.

- `DELETE /repositories/:id`: Deletes the resource identified by the `:id` in the route parameters.

- `POST /repositories/:id/like`: It should increase the number of likes of the resource identified by the route parameter `:id`. Every request to this route should increment the counter in 1 unit.
