console.log("running alert.js....");
function Alert(u) {
    var ip = new XMLHttpRequest();
    ip.onreadystatechange = function() {
      if (ip.readyState == 4 && ip.status != 200) {
        alert("Hi! the APIs is somehow  broken. Please try again later");
      }
      else
      console.log("APIs is working");
    };
    ip.open("GET", u, true);
    ip.send();
  }
