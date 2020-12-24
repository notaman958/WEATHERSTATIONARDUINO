console.log('Loading freechoice.js......');
// var addrs="http://bowd31-api.course.tamk.cloud/v1/weather/";
const addrs = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';

let addrs_use;
//function to create element for table with id
function createElementWithId(tagName, id) {
  var elem = document.createElement(tagName);
  var attr = document.createAttribute('id');
  attr.nodeValue = id;
  elem.setAttributeNode(attr);
  return elem;
}
// get data type by selection
function getFreechoiceData() {
  var type = document.getElementById('dataOption').value;
  console.log(type);
  return type;
}
//get interval and create final endpoint for selected choice
function getFreechoiceTime() {
  // get time interval
  let DATATYPE = getFreechoiceData();
  var interval = document.getElementById('timeOption').value;
  console.log(interval);
  if (interval == 'live') {
    addrs_use = addrs + DATATYPE;
  } else {
    addrs_use = addrs + DATATYPE + '/' + interval;
  }
  console.log(addrs_use);
  (async () => {
    // fetch and get json type
    const data = await fetch(addrs_use);
    const dataJson = await data.json();
    // delete old table data
    var table = document.getElementById('tableAdjust');
    var tbody = document.getElementById('list_tbody');
    if (tbody != null) {
      table.removeChild(tbody);
      tbody = null;
    }
    // append new Child for table
    tbody = createElementWithId('tbody', 'list_tbody');
    table.appendChild(tbody);
    const tableBody = document.getElementsByTagName('tbody')[0];

    for (rowData of dataJson) {
      const newRow = tableBody.insertRow(-1);
      const cellKeys = Object.keys(rowData);
      // add new element in the array keys between date_time and data type
      cellKeys.splice(1, 0, 'Time');
      console.log(cellKeys);
      for (cellKey of cellKeys) {
        console.log('cellkey:', cellKey);
        const newCell = newRow.insertCell(-1);
        switch (cellKey) {
          // if key is date_time get date
          case 'date_time':
            const d = new Date(rowData[cellKey]);
            const getDate = d.toLocaleDateString();
            newCell.textContent = `${getDate}`;
            break;
          // if key is date_time get date
          case 'Time':
            const d2 = new Date(rowData['date_time']);
            const getTime = d2.toLocaleTimeString();
            newCell.textContent = `${getTime}`;
            break;
          default:
            newCell.textContent = rowData[cellKey];
            break;
        }
      }
    }
    console.log(addrs_use);
    // draw chart with function graph2.js
    getChart_freechoice(addrs_use, DATATYPE);
  })();
}
getFreechoiceTime();
