console.log("Loading temp20.js......");
// set the data type as name of the html so that can easily retrieve the datatype 
var file = location.pathname;
const filename=file.replace(/^.*[\\\/]/, '').split('.')[0];
// result is filename="temperature";
var addrs="http://bowd31-api.course.tamk.cloud/v1/weather/";
let addrs_use;
// function to create new element for table
function createElementWithId(tagName, id) {
	var elem = document.createElement(tagName);
	var attr = document.createAttribute("id");
	attr.nodeValue = id;
	elem.setAttributeNode(attr);
	return elem;
}
// function to get temperature signal data

 function getTemperatureSignalData()
{
    // get the interval
    var interval=document.getElementById("timeOption").value;
    console.log(interval);
    if(interval=='live')
    {
        addrs_use=addrs+filename;
    }
    else
    {
        addrs_use=addrs+filename+"/"+interval;
    }
    console.log(addrs_use);
    (async()=>{
            // fetch and get Json type
            const data=await fetch(addrs_use);
            const dataJson= await data.json();
            // check if the table is null or not if not removeChild and append enw child
            var table = document.getElementById("tableAdjust");
            var tbody = document.getElementById("list_tbody");
            if (tbody != null) {
                table.removeChild(tbody);
                tbody = null;
            }
            // appendChild so new data will not concatenate with old data

            tbody = createElementWithId("tbody", "list_tbody");
            table.appendChild(tbody);
            const tableBody=document.getElementsByTagName("tbody")[0];

            for(rowData of dataJson)
            {
                const newRow=tableBody.insertRow(-1);
                const cellKeys=Object.keys(rowData);
                // insert new key Time between date_time and data type <temperrature>
                cellKeys.splice(1,0,"Time");
                console.log(cellKeys);
                
                for(cellKey of cellKeys){
                    const newCell=newRow.insertCell(-1);
                    switch(cellKey)
                    {       // if key is date_time extract date
                            case "date_time":
                                const d=new Date(rowData[cellKey]);
                                const getDate=d.toLocaleDateString();
                                newCell.textContent=`${getDate}`;
                                break;
                            // if key is Time extract time from date_time
                            case "Time":
                                const d2=new Date(rowData["date_time"]);
                                const getTime=d2.toLocaleTimeString();
                                newCell.textContent=`${getTime}`;
                                break;
                            // if key is data type name get the value
                            default:
                                newCell.textContent=rowData[cellKey];
                                break;
                    }

                }
            }
            console.log(addrs_use);
            console.log(filename);
            // call function to draw chart graph.js
           getChart(addrs_use,filename);
    })();
    

}
getTemperatureSignalData();



 
  