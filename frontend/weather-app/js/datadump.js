console.log("Loading datadump.js..");

const tableBody = document.getElementsByTagName("tbody")[0];

const getDataModern = async () => {
  // Fetch data using modern Fetch API
  const data = await fetch("http://bowd31-api.course.tamk.cloud/v1/weather");

  // Get actual JSON data presentation
  const dataJson = await data.json();

  // Log data to see if it is correct
  console.log("dataJson", dataJson);

  // Create table rows in for..of loop (outer loop)
  for (rowData of dataJson) {
    // Insert new row to table
    const newRow = tableBody.insertRow(-1);

    const cellKeys = Object.keys(rowData); // Output: ["id", "device_id", "date_time", "data"]
    cellKeys.push("Value");                // create one key Value for Value column

    // Create table cells in for..of loop (inner loop)
    for (cellKey of cellKeys) {
      // Insert new cell to row
      const newCell = newRow.insertCell(-1);

      // Perform operation based on cell content
      switch (cellKey) {
        // If data cell, dig key&value from sub-object
        case "data":
          const key = Object.keys(rowData[cellKey])[0];
          newCell.textContent = `${key}`;
          break;
        // when the array is at Value element separate the value from data key
        case "Value":
          console.log("inside Value");
          const key_temp = Object.keys(rowData["data"])[0];
          const value = rowData["data"][key_temp];
          const num=parseFloat(value).toFixed(2);
          newCell.textContent=`${num}`;
          break;
        // For other cells, just copy the value to the cell
        default:
          newCell.textContent = rowData[cellKey];
      }
    }
  }
};

// Call the function
getDataModern();
