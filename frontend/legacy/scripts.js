console.log('Hello JavaScript!');

function clickmeFunction() {
  console.log('Calling clickmeFunction()');
  
  const myParagraph = document.getElementById("my-paragraph");
  myParagraph.style.fontSize = "25px";
  myParagraph.style.color = "red";
  myParagraph.textContent = 'Button was clicked!'
}

const clickmeButton = document.getElementById("clickme");

clickmeButton.addEventListener('click', clickmeFunction);
/*..EXERCISE 3*/
/* ------------- Custom JavaScript st arts ---------------- */
/*_______________DATE__________________*/
const event =new Date();
console.log('Date:',event);
const currentDateSpan=document.getElementById("Datevalue");
console.log("currentDateSpan:",currentDateSpan);
currentDateSpan.textContent=event;
/*EXERCISE 4*/
/*_______________the BMI calculator__________________*/

/* 
const button=document.getElementById("calculator")
check bang consolelog
button.addEventListener('click',funtion(){
console.log("button is clicked")
....
tinh toan nhu o bai da lam o myFunction()
co the tao hai bien const myHeightvalue=yourHeight.value
myWeightvalue=yourWeight.value
de ep kiey ve float hoac int thi them Number(variable name)
de luy thua so dung dau **
};)




*/
function myFunction()
{
  let yourHeight=parseFloat(document.getElementById("myHeight").value);
  console.log("height=",yourHeight);
  let yourWeight=parseFloat(document.getElementById("myWeight").value);
  console.log("weight=",yourWeight);
  let BMIscore=yourWeight/Math.pow(yourHeight/100,2);
  if(yourHeight>0&&yourWeight>0)
  {
    BMIscore=BMIscore.toFixed(1);
    console.log("result=",BMIscore);
    document.getElementById("bmi-number").innerHTML=BMIscore;

  }
    
let ClickBMIbutton=BMIscore;
console.log("BMIsdfdsfdsdsf=",ClickBMIbutton);
  if(ClickBMIbutton<18.5)
  {
    document.getElementById("Comment").innerHTML="too thin";
  }       
  if(ClickBMIbutton>=18.5&&ClickBMIbutton<=25.0)
  {

    document.getElementById("Comment").innerHTML="healthy";
  }
  if(ClickBMIbutton>25.0)
  {

    document.getElementById("Comment").innerHTML="overweight";
  }
}
/* MAKE A REGULAR CALCULATOR */

 


  