$(document).ready(function () {
  var socket;

  function conn() {
  console.log("connect")
  socket = new WebSocket('ws://localhost:9980');
  
  socket.onmessage= function (data) {
    console.log(data);
    $( "#Score" ).html( " <center>Current Score : "+data.data);
  };
  }

  $("#tuneOut").click(function () {
     socket.close(1000, "Delibrate conncetion - try");
 
      socket.onclose= function (data) {
        console.log("Closing the Connection ");
       
      };

      console.log("disconnecting")    
    
  });

  $("#tuneIn").click(function () {
    conn();
    console.log("connected")
   
  });
}); 
