# Exercise 3: Designing and Building a Microservices API
Pair: Nikki Jel Pan & Desiree Anne Godinez
(IT 3103N)


## Repository
GitHub Repository: [pan_godinez-exercise3](https://github.com/breadalmighty/pan_godinez-exercise3.git)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Testing with Postman](#testing-with-postman)
  - [Customer Service](#customer-service)
  - [Product Service](#product-service)
  - [Order Service](#order-service)

### Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 12 or above)
- [Postman](https://www.postman.com/) for testing APIs

### Setup 
1. Clone the repository to your local machine using these commands:
   (1) git clone https://github.com/breadalmighty/pan_godinez-exercise3.git and 
   (2) cd pan_godinez-exercise3

2. Navigate into each service's folder and run:

customer service (port 3002)

    cd microservices\costumer_service
    node server.js

product service (port 3001)

    cd microservices\costumer_service
    node server.js

order service (port 3003)

    cd microservices\costumer_service
    node server.js


### Testing with Postman

#### Customer Service 

 1. Create a Customer (POST) -> URL: http://localhost:3002/customers
  
    Body (raw JSON):
    
        {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 30
        }

3. Get Customer by ID (GET) -> URL: http://localhost:3002/customers/{customerId}

4. Update a Customer (PUT) -> URL: http://localhost:3002/customers/{customerId}

    Body (raw JSON):
   
        {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "age": 32
        }

6. Delete a Customer (DELETE) -> URL: http://localhost:3002/customers/{customerId}

#### Product Service 

1. Create a Product (POST) -> URL: http://localhost:3001/products

    Body (raw JSON):

        {
        "name": "Product A",
        "price": 100,
        "description": "This is product A."
        }

2. Get Product by ID (GET) -> URL: http://localhost:3001/products/{productId}

3. Update a Product (PUT) -> URL: http://localhost:3001/products/{productId}

    Body (raw JSON):
   
        {
        "name": "Product B",
        "price": 120,
        "description": "This is updated product B."
        }

5. Delete a Product (DELETE) -> URL: http://localhost:3001/products/{productId}


#### Order Service

1. Create an Order (POST) -> URL: http://localhost:3003/orders

    Body (raw JSON):
   
        {
        "customerId": 1,
        "productId": 1,
        "quantity": 2
        }

3. Get Order by ID (GET) -> URL: http://localhost:3003/orders/{orderId}

4. Update an Order (PUT) -> URL: http://localhost:3003/orders/{orderId}

    Body (raw JSON):
   
        {
        "quantity": 3
        }

3. Delete an Order (DELETE) -> URL: http://localhost:3003/orders/{orderId}

