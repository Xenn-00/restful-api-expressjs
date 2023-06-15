# User API Specs

## Register User API

- POST `/api/users`

Request body :

```json
{
  "password": "test123",
  "name": "test",
  "username": "test"
}
```

Response body success :

```json
{
  "data": {
    "name": "test",
    "username": "test"
  }
}
```

Response body failed :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

- POST `api/users/login`

Request Body :

```json
{
  "username": "test",
  "password": "test123"
}
```

Response body success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response body failed :

```json
{
  "errors": "username or password wrong"
}
```

## Update User API

- PATCH `api/users/current`

Headers :

- Authorization : token

Request body :

```json
{
  "name": "new test", // optional
  "password": "test234" // optional
}
```

Response body success :

```json
{
  "data": {
    "name": "new test",
    "username": "test"
  }
}
```

Response body failed :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

- GET `api/users/current`

Headers :

- Authorization : token

Response body success :

```json
{
  "data": {
    "name": "new test",
    "username": "test"
  }
}
```

## Logout USer API

- DELETE `api/users/logout`

Headers :

- Authorization : token

Response body success :

```json
{
  "data": "OK"
}
```
