let imgHding=document.querySelector("h1.imgHding")
let imgExplntn=document.querySelector("h4.imgExplntn");
let date=document.querySelector("h3.date");
let previous=document.querySelector(".previous")
let next=document.querySelector("button.next")
let image=document.querySelector("img");
let myDate=new Date();
let crntDate;
let month;
let year;
function dates(){
crntDate=myDate.getDate();
month=(myDate.getMonth())+1;
year=myDate.getFullYear();
};
let func=async()=>{
  let response=await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${year}-${month}-${crntDate}`);
  if(response.status!==200){
    throw new Error("Cannot fetch data");
  }
  else{
  let data=await response.json();
  return data;
  }
};
function display(){func().then((data)=>{
  imgHding.innerText=data.title;
  if(data.media_type==="image"){
    image.src=data.url;
    image.alt=data.title;
  }
  if(data.media_type==="video"){
    image.src="";
    image.alt="Response is a video!";
  }
  imgExplntn.innerText=data.explanation;
  date.innerText=data.date;
}).catch((err)=>{
  imgHding.innerText=`Error: ${err.message}`;
  imgExplntn.innerText="";
  date.innerText="";
  image.src="";
  image.alt="";
})}
previous.addEventListener("click",()=>{
  myDate.setDate((myDate.getDate())-1);
  dates();
  display();
})
next.addEventListener("click",()=>{
  myDate.setDate((myDate.getDate())+1);
  dates();
  display();
})
dates();
display();
