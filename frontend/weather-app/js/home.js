console.log('Loading home.js');
// const url="http://bowd31-api.course.tamk.cloud/v1/weather/latest/";
const url = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/latest/';
// get element by id of all and assgin value for them
Alert(url);
function getTemp() {
  var ip = url + 'temperature';
  (async () => {
    var data = await fetch(ip);
    var dataJson = await data.json();
    console.log('?????', dataJson);
    console.log('=>', dataJson[0].temperature);
    document.getElementById('temp').innerHTML = parseFloat(
      dataJson[0].temperature
    ).toFixed(2);
  })();
}
function getHumidOut() {
  var ip = url + 'humidity_out';
  (async () => {
    var data = await fetch(ip);
    var dataJson = await data.json();
    console.log('?????', dataJson);
    console.log('=>', dataJson[0].humidity_out);
    document.getElementById('humid_out').innerHTML =
      parseFloat(dataJson[0].humidity_out).toFixed(2) + '%';
  })();
}
function getHumidIn() {
  var ip = url + 'humidity_in';
  (async () => {
    var data = await fetch(ip);
    var dataJson = await data.json();
    console.log('?????', dataJson);
    console.log('=>', dataJson[0].humidity_out);
    document.getElementById('humid_in').innerHTML =
      parseFloat(dataJson[0].humidity_in).toFixed(2) + '%';
  })();
}
function getRain() {
  var ip = url + 'rain';
  (async () => {
    var data = await fetch(ip);
    var dataJson = await data.json();
    console.log('?????', dataJson);
    console.log('=>', dataJson[0].rain);
    document.getElementById('rain').innerHTML =
      parseFloat(dataJson[0].rain).toFixed(2) + '%';
  })();
}
function getSun() {
  var ip = url + 'light';
  (async () => {
    var data = await fetch(ip);
    var dataJson = await data.json();
    console.log('?????', dataJson);
    console.log('=>', dataJson[0].light);
    document.getElementById('sun').innerHTML =
      parseFloat(dataJson[0].light).toFixed(2) + '%';
  })();
}
function getWindSpeed() {
  var ip = url + 'wind_speed';
  (async () => {
    var data = await fetch(ip);
    var dataJson = await data.json();
    console.log('?????', dataJson);
    console.log('=>', dataJson[0].wind_speed);
    document.getElementById('wind_speed').innerHTML = parseFloat(
      dataJson[0].wind_speed
    ).toFixed(2);
  })();
}
function getWindDirection() {
  var ip = url + 'wind_direction';
  (async () => {
    var direction;
    var data = await fetch(ip);
    var dataJson = await data.json();
    console.log('?????', dataJson);
    console.log('=>', dataJson[0].wind_direction);
    var n = parseFloat(dataJson[0].wind_direction).toFixed(0);
    if (n == 0) direction = 'North';
    else if (n > 0 && n < 90) direction = 'North-East';
    else if (n == 90) direction = 'East';
    else if (n > 90 && n < 180) direction = 'South-East';
    else if (n == 180) direction = 'South';
    else if (n > 180 && n < 270) direction = 'South-West';
    else if (n == 270) direction = 'West';
    else direction = 'North-West';
    document.getElementById('wind_direction').innerHTML = direction;
  })();
}
//create time interval for them

const time = 300;
setInterval(getTemp(), time * 1000);
setInterval(getHumidIn(), time * 1000);
setInterval(getHumidOut(), time * 1000);
setInterval(getRain(), time * 1000);
setInterval(getSun(), time * 1000);
setInterval(getWindSpeed(), time * 1000);
setInterval(getWindDirection(), time * 1000);
