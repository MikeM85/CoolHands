# small-request

[![npm version](https://badge.fury.io/js/small-request.svg)](https://badge.fury.io/js/small-request) [![Build Status](https://travis-ci.org/tonybadguy/small-request.svg?branch=master)](https://travis-ci.org/tonybadguy/small-request) [![codecov](https://codecov.io/gh/tonybadguy/small-request/branch/master/graph/badge.svg)](https://codecov.io/gh/tonybadguy/small-request)

This Node.js module is a thin wrapper around the Node.js http/https request functions that provides:
* A Promise interface
* Handling of response chunking
* Auto-selection of the http/https request function

The promise is resolved when:
* A response is received from the server regardless of status code

The promise is rejected when:
* Any other exception is encountered

## Example usage:

```
const request = require('small-request');

request.send({
  url: 'https://httpbin.org/get'
}).then(response => {
  console.log(response.body);
});
```

## RequestModel
The ```request.send(requestModel)``` function takes in a requestModel object. This object is an extended version of the Node.js [http.request options object](https://nodejs.org/api/http.html#http_http_request_options_callback). Its extended fields are:
* url (string)
* body (string)
* socketTimeout (number in milliseconds)

If the original http.request option field values conflict with the extended field values, then the original field values take precedence.

## ResponseModel
The promise returned by request.send() resolves to an object with the following fields:
* body (string)
* headers (object)
* statusCode (number)
