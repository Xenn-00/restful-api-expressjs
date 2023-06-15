# Contact API Specs

## Create Contact API

- POST `api/contacts`

Headers :

- Authorization : token

Request body:

```json
{
  "first_name": "john",
  "last_name": "doe",
  "email": "john@test.com",
  "phone": "+6139739313"
}
```

Response body success :

```json
{
  "data": {
    "id": 1,
    "first_name": "john",
    "last_name": "doe",
    "email": "john@test.com",
    "phone": "+6139739313"
  }
}
```

Response body failed :

```json
{
  "errors": "email not valid"
}
```

## Update Contact API

- PUT `api/contacts/:id`

Headers :

- Authorization : token

Request body:

```json
{
  "first_name": "john", // optional
  "last_name": "doe",
  "email": "john@test.com",
  "phone": "+6139739313"
}
```

Response body success :

```json
{
  "data": {
    "id": 1,
    "first_name": "john",
    "last_name": "doe",
    "email": "john@test.com",
    "phone": "+6139739313"
  }
}
```

Response body failed :

```json
{
  "errors": "email not valid"
}
```

## Get Contact API

- GET `api/contacts/:id`

Headers :

- Authorization : token

Response body success :

```json
{
  "data": {
    "id": 1,
    "first_name": "john",
    "last_name": "doe",
    "email": "john@test.com",
    "phone": "+6139739313"
  }
}
```

Response body failed :

```json
{
  "errors": "contact not found"
}
```

## Search Contact API

- GET `api/contacts`

Headers :

- Authorization : token

Query Params :

- name : Search by first_name or last_name, using like, optional

- email : Search by email, using like, optional
- phone : Search by phone, using like, optional
- page : number of page, default : 1
- size : size per page, default : 10

Response body success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "john",
      "last_name": "doe",
      "email": "john@test.com",
      "phone": "+6139739313"
    },
    {
      "id": 2,
      "first_name": "jane",
      "last_name": "doe",
      "email": "jane@test.com",
      "phone": "+61332739313"
    }
    ...
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 10
  }
}
```

Response body failed :

```json
{
  "errors": "contact not found"
}
```

## Remove Contact API

- DELETE `api/contacts/:id`

Headers :

- Authorization : token

Response body success :

```json
{
  "data": "OK"
}
```

Response body failed :

```json
{
  "errors": "contact not found"
}
```
