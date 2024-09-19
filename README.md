# Exercise 3: Designing and Building a Microservices API
Pair: Nikki Jel M. Pan & Desiree Anne Godinez
IT 3103N


## Repository
GitHub Repository: [pan_godinez-exercise3](https://github.com/breadalmighty/pan_godinez-exercise3.git)

## Table of Contents
- [Setup and Installation](#setup-and-installation)
- [Running the Services](#running-the-services)
- [Testing with Postman](#testing-with-postman)
  - [Customer Service Endpoints](#customer-service-endpoints)
  - [Product Service Endpoints](#product-service-endpoints)
  - [Order Service Endpoints](#order-service-endpoints)

### Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 12 or above)
- [Postman](https://www.postman.com/) for testing APIs

### Setup 
1. Clone the repository to your local machine using this command:
   git clone https://github.com/breadalmighty/pan_godinez-exercise3.git
   cd pan_godinez-exercise3

2. Navigate into each service's folder and run:

//if customer service (port 3002)

    cd microservices\costumer_service
    node server.js

//if product service (port 3001)

    cd microservices\costumer_service
    node server.js

//if order service (port 3003)

    cd microservices\costumer_service
    node server.js


### Testing with Postman

#### Customer Service 

 1. Create a Customer (POST)

    URL: http://localhost:3002/customers
    Method: POST
    Body (raw JSON): 
        {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 30
        }

2. Get Customer by ID (GET)

    URL: http://localhost:3002/customers/{customerId}
    Method: GET

3. Update a Customer (PUT)

    URL: http://localhost:3002/customers/{customerId}
    Method: PUT
    Body (raw JSON): 
        {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "age": 32
        }

4. Delete a Customer (DELETE)

    URL: http://localhost:3002/customers/{customerId}
    Method: DELETE

#### Product Service 

1. Create a Product (POST)

    URL: http://localhost:3001/products
    Method: POST

2. Get Product by ID (GET)

    URL: http://localhost:3001/products/{productId}
    Method: GET

3. Update a Product (PUT)

    URL: http://localhost:3001/products/{productId}
    Method: PUT
    Body (raw JSON): 
        {
        "name": "Product B",
        "price": 120,
        "description": "This is updated product B."
        }

4. Delete a Product (DELETE)

    URL: http://localhost:3001/products/{productId}
    Method: DELETE

#### Order Service

1. Create an Order (POST)

    URL: http://localhost:3003/orders
    Method: POST
    Body (raw JSON):
        {
        "customerId": 1,
        "productId": 1,
        "quantity": 2
        }

2. Get Order by ID (GET)

    URL: http://localhost:3003/orders/{orderId}
    Method: GET

3. Update an Order (PUT)

    URL: http://localhost:3003/orders/{orderId}
    Method: PUT
    Body (raw JSON):
        {
        "quantity": 3
        }

3. Delete an Order (DELETE)

    URL: http://localhost:3003/orders/{orderId}
    Method: DELETE