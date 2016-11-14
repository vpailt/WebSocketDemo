// a simple generator for random adjective-noun-composed names
var nameGenerator = (function() {
  var nouns = ['Circle', 'Cone', 'Cylinder', 'Ellipse', 'Hexagon', 'Irregular Shape', 'Octagon', 'Oval', 'Parallelogram', 'Pentagon', 'Pyramid', 'Rectangle', 'Semicircle', 'Sphere', 'Square', 'Star', 'Trapezoid', 'Triangle', 'Wedge', 'Whorl'];
  var adjectives = ['Amusing', 'Athletic', 'Beautiful', 'Brave', 'Careless', 'Clever', 'Crafty', 'Creative', 'Cute', 'Dependable', 'Energetic', 'Famous', 'Friendly', 'Graceful', 'Helpful', 'Humble', 'Inconsiderate', 'Likable', 'Middle Class', 'Outgoing', 'Poor', 'Practical', 'Rich', 'Sad', 'Skinny', 'Successful', 'Thin', 'Ugly', 'Wealth'];

  return function() {
    return adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' + nouns[Math.floor(Math.random() * nouns.length)];
  };
})();

// is a property defined ?
function def(prop) {
  return typeof prop !== 'undefined';
}

// store the name in a cookie.
var cookies = document.cookie.split(';');
var wsname = cookies.find(function(c) {
  if (c.match(/^wsname/) !== null) return true;
  return false;
});
if (def(wsname)) {
  wsname = wsname.split('=')[1];
} else {
  wsname = nameGenerator();
  document.cookie = "wsname=" + encodeURIComponent(wsname);
}
document.querySelector('header>p').textContent = decodeURIComponent(wsname);



// create a WebSocket to the server
var ws = new WebSocket("ws://" + window.location.host);//new WebSocket("ws://127.0.0.1:8080/WSServer_war_exploded/websocket/nope");


// we get notified once connected to the server
ws.onopen = function(event) {
  console.log("We are connected.");
};

// listen to messages comming from the server. When it happens, create a new <li> and append it to the DOM.
var messages = document.querySelector('#messages');
var line;
ws.onmessage = function(event) {
  line = document.createElement('li');
  line.textContent = event.data;
  messages.appendChild(line);
};

// retrieve the input element. Add listeners in order to send the content of the input when the "return" key is pressed.
var sendForm = document.querySelector('form');
var sendInput = document.querySelector('form input');
sendForm.addEventListener('submit', sendMessage, true);
sendForm.addEventListener('blur', sendMessage, true);

function sendMessage(event) {
  event.preventDefault();
  event.stopPropagation();
  if (sendInput.value !== '') {
    // send data through the WebSocket
    ws.send(sendInput.value);
    sendInput.value = '';
  }
}
