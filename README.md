# Node.js To-Do Server
JavaScript, Node.js

## Overview
This project implements a simple To-Do List REST API server using Node.js and its built-in HTTP module (no external frameworks).  
The server allows clients to create, read, update, and delete to-do items from an in-memory list, demonstrating RESTful API design with native Node.js.

---

## Features

| HTTP Method | Endpoint Example | Description |
|--------------|------------------|--------------|
| **POST /** | `POST /` | Adds a new to-do item sent in the request body |
| **GET /** | `GET /` | Returns all to-do items with their indexes |
| **DELETE /:index** | `DELETE /3` | Deletes the to-do item at the specified index |
| **PUT /:index** | `PUT /2` | Updates the item at the specified index with new text |

All data is stored temporarily in a JavaScript array (`list = []`) during runtime.

---

## How It Works

### Server Setup
The server:
- Uses Node’s built-in `http`, `url`, and `path` modules.
- Reads the port number from the command-line argument.
- Prints error messages if the port is missing or less than 3000.

### Request Handling
All logic is contained in a single request handler:

```js
let reqHandler = (req, res) => {
  switch (req.method) {
    case 'POST':
    case 'GET':
    case 'DELETE':
    case 'PUT':
  }
};


### Error Handling

| Error Message                                  | Cause                               |
| ---------------------------------------------- | ----------------------------------- |
| `Missing Server Port Number`                   | Port argument not provided          |
| `Port number must be greater or equal to 3000` | Invalid port number                 |
| `Missing index for item to be deleted`         | No index provided in DELETE request |
| `Invalid index value`                          | Non-numeric or out-of-range index   |
| `Item not found`                               | PUT request index does not exist    |


### Concepts Demonstrated

HTTP request/response handling with Node.js core modules

Asynchronous event-driven programming using .on('data') and .on('end')

RESTful API design without external frameworks

Command-line argument parsing with process.argv

Server-side input validation and response handling


**How to Run**

Make sure Node.js is installed:

node -v


Start the server with a port number (must be ≥ 3000):

node todoServer.js 3000


The server will display:

The server is listening on port 3000



Use curl or a browser to test requests (examples shown below).

**Test Cases (PUT /:index)**

Replace the port below (8080) with the port you used to start the server.

**Test Case 1: Missing index**

curl request

curl -X PUT -d 'Complete Assignment 3' http://localhost:8080


Server response

Missing index for item to be updated

**Test Case 2: Invalid index value**

curl request

curl -X PUT -d 'Complete Assignment 3' http://localhost:8080/a


Server response

Invalid index value

**Test Case 3: Index value not in the list**

Current list

1) Buy groceries
2) Finish Lab 5
3) Go to the dentist


curl request

curl -X PUT -d 'Complete Assignment 3' http://localhost:8080/5


Server response

Item not found

**Test Case 4: Updating an item in the list**

Current list

1) Buy groceries
2) Finish Lab 5
3) Go to the dentist


curl request

curl -X PUT -d 'Complete Assignment 3' http://localhost:8080/2


Server response

OK


List after update

1) Buy groceries
2) Complete Assignment 3
3) Go to the dentist



