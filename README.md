# Pizza Webhook

## Introduction
This is an implementation for a pizza delivery webhook. The webhook endpoint will evaluate a completed chat transcript for occurrences of the word 'pizza' and if that visitor resides in New York, New York USA -- a post request to our pizza partners with the order will be sent.

## Quick Start Local Development

1. Fork Clone repo
2.  Install packages
```
$nvm install
```
3.  To start the development server run
 ```
 npm run dev
 ```
4. Test the server. By default the server will open on port 5000. For local development test the server is up this this curl request
```
$curl --location --request GET 'http://localhost:5000'
```
Response:
```
Hello Pizza!!!
```

## Routes

### Hosts
Local Host: http://localhost:5000
Live Host: http://3.92.158.174:5000

### Heartbeat request
Used to test the server is running
```
$curl --location --request GET '<HOST ADDRESS>'
```
Response:
```
Hello Pizza!!!
```

### Pizza Webhook
POST request  to the /pizza endpoint will 1) Determine if the chat conversation qualifies the guest for a pizza and 2) submit the guests data to the pizza partner for pizza proliferation.

Example
```
$curl --location --request POST '<HOST ADDRESS>/pizza' \
--header 'Content-Type: application/json' \
--data-raw '<See Example bodies>'
```

Successful Response:
```
{
"status": "pizza"
}
```

Unsuccessful Response:
```
{
"status": "no pizza"
}
```

Error Response:
```
{
"status": "no pizza"
"error": <Error Message from Pizza Partner"
}
```

## Example Post Body
```
{
"kind": "Conversation",
"tags": [
"olark",
"customer"
],
"items": [
{
"body": "Hi there. Need any help?",
"timestamp": "1307116657.1",
"kind": "MessageToVisitor",
"nickname": "John",
"operatorId": "1234"
},
{
"body": "Yes, please help me with pizza.",
"timestamp": "1307116661.25",
"kind": "MessageToOperator",
"nickname": "Bob"
}
],
"operators": {
"1234": {
"username": "jdoe",
"emailAddress": "john@example.com",
"kind": "Operator",
"nickname": "John",
"id": "1234"
}
},
"groups": [
{
"kind": "Group",
"name": "My Sales Group",
"id": "0123456789abcdef"
}
],
"visitor": {
"ip": "123.4.56.78",
"city": "New York",
"kind": "Visitor",
"conversationBeginPage": "http://www.example.com/path",
"countryCode": "US",
"country": "United State",
"region": "NY",
"chat_feedback": {
"overall_chat": 5,
"responsiveness": 5,
"friendliness": 5,
"knowledge": 5,
"comments": "Very helpful, thanks"
},
"operatingSystem": "Windows",
"emailAddress": "bob@example.com",
"organization": "Widgets Inc.",
"phoneNumber": "(555) 555-5555",
"fullName": "Bob Doe",
"customFields": {
"favoriteColor": "blue",
"myInternalCustomerId": "12341234"
},
"id": "9QRF9YWM5XW3ZSU7P9CGWRU89944341",
"browser": "Chrome 12.1"
},
"id": "EV695BI2930A6XMO32886MPT899443414"
}
```


