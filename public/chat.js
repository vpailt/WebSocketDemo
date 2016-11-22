

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
document.querySelector('header>p').textContent = "Reception capteur de "+decodeURIComponent(wsname);



// create a WebSocket to the server
//var ws = new WebSocket("ws://" + window.location.host);//new WebSocket("ws://127.0.0.1:8080/WSServer_war_exploded/websocket/nope");
/*
var ws = new WebSocket("ws://127.0.0.1:8080");

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
    ws.send(sendInput.value+'lol');
    sendInput.value = '';
  }
}
*/
var client = new Paho.MQTT.Client("127.0.0.1", Number(8080), "clientId" + Date.now().toString());
// set callback handlers
var sensorTest;
client.onConnectionLost = function (responseObject) {
  console.log("Connection Lost: "+responseObject.errorMessage);
}
//
client.onMessageArrived = function (message) {
  line = document.createElement('li');
/*
  line.textContent = JSON.parse(message.payloadString).type+" - "+
      message.destinationName.substr(message.destinationName.indexOf("/")+1,
          message.destinationName.length)+"  ";//+ sensorTest.toString();
*/
  var id = message.destinationName.substr(message.destinationName.indexOf("/")+1,
      message.destinationName.length);
  var stringJson= {
    "id": id,
    "name": id,
    "type": JSON.parse(message.payloadString).type,
    "data": {
      "value": JSON.parse(message.payloadString).value
    }
  };
  sensorTest = TypeSensor(stringJson);

  line.textContent= "name : "+sensorTest.name +"\r\n";
  line.textContent+="id : "+sensorTest.id+"\r\n";
  line.textContent+="value : "+sensorTest.data.value+"  (type:"+stringJson.type+")";

  messages.appendChild(line);
  line.innerHTML = line.innerHTML.replace(/\n\r?/g, '<br />');
 // console.log("Message Arrived: "+message.payloadString.toString());
}

// Called when the connection is made
function onConnect(){
  console.log("Connected!");
  client.subscribe('value/#', {qos: 0});

}
function failure(){
  console.log("Connected!");

}

// Connect the client, providing an onConnect callback
client.connect({
  onSuccess: onConnect,
  onFailure: failure
});
