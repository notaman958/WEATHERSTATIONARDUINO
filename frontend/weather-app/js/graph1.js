console.log("Loading graph.js..");
// create element with id for chart
function createElementWithId(tagName,id)
{
  var elem = document.createElement(tagName);
	var attr = document.createAttribute("id");
	attr.nodeValue = id;
	elem.setAttributeNode(attr);
	return elem;
   
}
// url is ip got from .js and NAME is the name of the data type (temperature,..)
function getChart(url, NAME)
{
  (async () => {
  console.log("Starting anonymous function..");
  const data= await fetch(url);
  const dataJson= await data.json();
  console.log("'=>dataJson",dataJson);
  const chartJS=dataJson.map(d=>({x: new Date(d.date_time), y: d.humidity_out}))
  .sort((a,b)=>a.x-b.x);
  console.log(chartJS);
  // check if chart was drawn already if yes remove and append newchild
  var getCanvas = document.getElementById("graphs");
  var getGraph=document.getElementById("graph");
  if (getGraph != null) {
      getCanvas.removeChild(getGraph);
      getGraph = null;
  }
  getGraph=createElementWithId("canvas", "graph");
  getCanvas.appendChild(getGraph);
  const graph = document.getElementById("graph").getContext("2d");
  graph.scale(3,4);
  // draw chart
  new Chart(graph, {
    type: "line",
    height: 500,
    data: {
      datasets: [
        {
          label: NAME,
          data: chartJS,
          backgroundColor: 
            "rgba(255, 99, 132, 0.2)",
          borderColor: 
            "rgba(255,99,132,1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      // filter data X axis only every 4 data is shown
    /*legend:{
        data:{
          datasets:{
            filter: function(data){
              for(var i=0;i<data.length;i++)
              {
                if(i%10!=0)
                {
                  data[i].x=" ";
                }
              }

            }
          }
          
        }
      },*/
      scales: {
        yAxes:[
          {
            ticks:{
              beginAtZero: false,    

            }
          }
        ],
        xAxes: [
          {
            type: "time",
            distribution: "series",
            offset: true,
            ticks:{
              autoSkip: true,
              maxTicksLimit: 4,
            },
            time: {
              unitStepSize: 10,
              parser: 'MMM dd-yyyy hh:mm',
              unit: 'minute',
              displayFormats: {
                  'minute': 'MMM dd-yyyy hh:mm',
                  'hour': 'MMM dd-yyyy hh:mm'
              }
             }
          }
        ]
      }
    }
  });
})();
}



