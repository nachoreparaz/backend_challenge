# backend_challenge

Auth is implemented so for usage follow the steps:

1_ Register

url: POST /users/register
body: {
  email: example@example.com,
  password: example
}

2_ Login

url: POST /users/login
body: {
  email: example@example.com,
  password: example
}

=====
Use JWT token from login response as Bearer Token for the following endpoints
=====


Contact Endpoint

GET CONTACTS:

GET By id:

url: challenge/contact/:id

GET By Email: 

url: challenge/contact/email
body: {
  email: example@example.com
}

GET By Phone:

url: challenge/contact/phone
body: {
  phone: '123-123'
}

GET By City:

url: challenge/contact/city
body: {
  city: 'Buenos Aires'
}

====== 
CREATE CONTACTS:

POST Contact:

url: challenge/contact
body:{
    "name": "example", 
    "company": "company 1", 
    "email": "example@example.com",
    "birthdate": "11-11-2001", 
    "phone": "123-123",
    "address":{
        "city": "Buenos Aires",
        "country": "Argentina",
        "number": "5000",
        "street": "Avenida Rivadavia"
    }
}

====== 
UPDATE CONTACTS:

PATCH Contact:

url: challenge/contact/:id
body:{
    "name": "example 2", 
    "company": "company 2", 
    "email": "example@example.com",
    "birthdate": "11-11-2001", 
    "phone": "123-123",
    "address":{
        "city": "Buenos Aires",
        "country": "Argentina",
        "number": "4000",
        "street": "Avenida Rivadavia"
    }
}

====== 
DELETE CONTACTS:

DELETE Contact:

url: challenge/contact/:id


======
SEND EMAIL TO CONTACTS:

POST Send Email

url: challenge/contact/email/sender
body: {
    "email": "test2@gmail.com, test6@gmail.com",
    "message": "Hello <contact_name>, <contact_age>, <address_street>",
    "subject": "TEST"
}