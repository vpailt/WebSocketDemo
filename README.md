## WebSocket Demo

This project is a simple WebSocket demo. It focusses on showing the basic mechanisms used to create a bidirectional (full duplex) communication WebSocket.

The application is a simple group chat, where any connected client receives messages sent by everyone. There is no origin policy control and security involved.

The application code is two-folded : the server code and the client code.


## The server

The server is a Node.js script. It uses an HTTP server with the [Express](http://expressjs.com/) framework and the [ws](https://einaros.github.io/ws/) WebSocket implementation.

Once the HTTP server created, the Express framework is used to serve static resources (html, css, js files). The WebSocket server is also created atop the HTTP server and uses the underlying tcp connection already established between clients and the HTTP server.

What the server does is :
- Create an HTTP server.
- Create configure Express.js to serve static files
- Create a WebSocket Server and bind it to the HTTP server
- The WebSocket server will maintain a list of connected  WebSocket clients
- Greet any new connection
- Wait for messages from any client and broadcast the message to all the clients.


## The client

The client uses the default implementation of the WebSocket norm that is available on the browser. For that matter the client may only work on recent browsers.

What the client does:
- Retrieve a client name from the cookies
- If the name does not exist, then create a new random one.
- Create a WebSocket connection to the server and wait for messages
- On receiving a message, an <li> element is created with the content of the message and added to the page
- When text is entered in a form input on the page, and the return key is stroke, the text of the input field is send through the WebSocket, to the server.


## Critics

This application is a very basic group chat with very little control and no security. The aim here is to show that a very few number of lines of code can already provide great communication facilities.

A more robust application would use a third party library that would take care of security, protocol mismatches and browser support. [Socket.io](http:socket.io) is one of the most achieved projects for WebSockets.
