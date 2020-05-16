console.log("loading compass.js");
var addrs="http://bowd31-api.course.tamk.cloud/v1/weather/latest/";
let TYPE="wind_direction";
let getData;
function createElementWithId(tagName,id)
{
    var elem=document.createElement(tagName);
    var attr=document.createAttribute("id");
    attr.nodeValue=id;
    elem.setAttributeNode(attr);
    return elem;
}
function getWindDirectionData()
{
    let addrs_use=addrs+TYPE;
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
            cellKeys.splice(0,2);
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
                        case TYPE:
                            getData=rowData[cellKey];
                            newCell.textContent=rowData[cellKey];
                            break;
                }

            }
        }
        myMove(getData);
    })();
}
// function myMove
function myMove(d)
{
    console.log("?????=>",d);
    var elm=document.getElementById("pointer");
    d=-d+90; // have to transform the degree because the origin 0 degree is at north while the square pointer box 0 degree (red)
    // points at east
    elm.style.webkitTransform = 'rotate('+d+'deg)'; 
    elm.style.mozTransform    = 'rotate('+d+'deg)'; 
    elm.style.msTransform     = 'rotate('+d+'deg)'; 
    elm.style.oTransform      = 'rotate('+d+'deg)'; 
    elm.style.transform       = 'rotate('+d+'deg)'; 
    
}
// set 15 mins update
const time=3;
setInterval(getWindDirectionData(),1000*time);