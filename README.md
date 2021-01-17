# Shopify Developer Intern Challenge

# API Reference

## Introduction

Hello! I created this API for the Shopify Developer Intern Challenge. Below are some basic instructions on how to use it.

APIV1 is a REST API that allows API access via HTTP protocol at a predefined set of URLs. These URLs allow you, the developer, to access various resources which can have methods performed on them (GET/POST/PUT/DELETE). 

---

## Core Resources

Security tokens haven't been added to the api yet, but in the future they can be added to secure file uploads and encrypt user logins.

### Items

This is an object representing items listed by users onto the market place

> {
"item_name": "potate-1",
"image":  **removed as dataURIs can be very long**
"item_category": "Vegetable",
"list_date": "2021-01-15T00:00:00.000Z",
"quantity": 1,
"private": false,
"price": "1.99",
"discount": 1,
"img_id": 4,
"fk_user_id": 1
}

Attributes

- item_name *string*
    - can be numeric, alphabetic or a mix of the two. this is used to determine the flight number.
    - 'potato-123
- image *string*
    - image converted into data uri
    - **see image content toggle for example**
- item_category *string*
    - string containing category
    - example 'Vegetable'
- list_date *date*
    - date object, this refers to the date the object was listed
    - example: '2020-12-21'
- quantity: *integer*
    - integer containing item stock
    - example '20'
- private *boolean*
    - boolean of whether to publish the item to market or not
    - example 'true'
- price: *numeric*
    - number containing item price
    - example '10.99'
- discount: *integer*
    - integer containing item discount
    - example '25'
- img_id: *integer*
    - integer containing image's unique id
    - example '1'
- fk_user_id: *integer*
    - integer containing user's id
    - example '1'

- Methods
    - GET
        - "/items"

            Use Case: Retrieve all public items listed in marketplace

        - "/items/:user_id"

            Use Case: Retrieve all items belonging to a user.

    - POST
        - "/items"

            Create an item in the database

    - PUT
        - "/items"

            Edit an existing item in the database

    - DELETE
        - "/items"

            Delete a specific item from the database

        - "/items/:user_id"

            Delete all entries belonging to a user from the database.

### Users

This is an object representing users for your application. Registration is currently unavailable, please contact me if you would like to try the application.

Attributes

- user_id *int*
    - Number associated with the user, incremental.
- username *string*
    - can be numeric, alphabetic or a mix of the two. This refers to the user name being used for logins.
    - example: 'testuser1234'
- password *string*
    - string containing user password.
    - example: 'iLikeBobaTea1234!'

- Methods
    - POST
        - "/login

            Logs the user into the application

        - "/register

            Registers a new user. Currently not a part of the web application

 

---
# Web Application

# Client Side

## Introduction

Hello you can access the deployed web application that I made for this challenge at [my website](https://lenakwan.ca/shopifyChallenge/)

APIV1 is a REST API that allows API access via HTTP protocol at a predefined set of URLs. These URLs allow you, the developer, to access various resources which can have methods performed on them (GET/POST/PUT/DELETE). 

---

## Functionalities

The website is an image repository, I made it into a shop to work on the sell/buy challenge.

### Home / Marketboard

The home page serves as a marketplace for all of the users. Rather than serve just one owner, I made it so that any images listed as not private can be published and sold on the home page. Like a flea market!

### Manage Inventory

Users can log into the manage inventory page in order to list new items/delete their items/edit items/make their private listings public
---

## Contact Me

https://www.linkedin.com/in/lena-kwan/
