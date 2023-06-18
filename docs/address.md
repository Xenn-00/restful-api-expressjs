# Address API Specs

## Create Address API

- POST `api/contacts/:contactId/address`

Headers :

- Authorization : token

Request body:

```json
{
  "street": "test",
  "city": "Z",
  "province": "test",
  "country": "test",
  "postal_code": "13123"
}
```

Response body success :

```json
{
  "data": {
    "id": "1",
    "street": "test",
    "city": "Z",
    "province": "test",
    "country": "test",
    "postal_code": "13123"
  }
}
```

Response body failed :

```json
{
  "errors": "country is required"
}
```

## Update Address API

- PUT `api/contacts/:contactId/address/:addressId`

Headers :

- Authorization : token

Request body:

```json
{
  "street": "test",
  "city": "Z",
  "province": "test",
  "country": "test",
  "postal_code": "13123"
}
```

Response body success :

```json
{
  "data": {
    "id": "1",
    "street": "test",
    "city": "Z",
    "province": "test",
    "country": "test",
    "postal_code": "13123"
  }
}
```

Response body failed :

```json
{
  "errors": "country is required"
}
```

## Get Address API

- GET `api/contacts/:contactId/address/:addressId`

Headers :

- Authorization : token

Response body success :

```json
{
  "data": {
    "id": "1",
    "street": "test",
    "city": "Z",
    "province": "test",
    "country": "test",
    "postal_code": "13123"
  }
}
```

Response body failed :

```json
{
  "errors": "contact not found"
}
```

## List Address API

- GET `api/contacts/:conatctId/address`

Headers :

- Authorization : token

Response body success :

```json
{
  "data": [
    {
      "id": "1",
      "street": "test",
      "city": "Z",
      "province": "test",
      "country": "test",
      "postal_code": "13123"
    },
    ...
  ]
}
```

Response body failed :

```json
{
  "errors": "address not found"
}
```

## Remove Address API

- DELETE `api/contact/:contactId/address/:addressId`

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
