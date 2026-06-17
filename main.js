//dots//
const dots = document.getElementById('dots');
const dotCount = 100;

for (let i = 0; i < dotCount; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot';
  

  const x = Math.random() * 300; //
  const y = Math.random() * 300;
  
  dot.style.left = `${x}%`;
  dot.style.top = `${y}%`;
  
  const size = Math.random() * 8 + 2; 
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;

  dots.appendChild(dot);
}


//dots//


//navbar animation//

//variables//

let links = document.getElementsByTagName("li");
let circle = document.getElementById("circle");
let section1 = document.getElementById("btn1");
let section2 = document.getElementById("cardText")
let section3 = document.getElementById("transfer")
//functions//
function moveNav(index, iconHTML) {


  for (let link of links) {
    link.style.opacity = "1";
  }

  circle.style.left = (80 * index) + "px";
  circle.innerHTML = iconHTML;

  links[index].style.opacity = "0";
}
    
  for (let link of links) {
  link.onclick = function () {
    moveNav(this.value, this.innerHTML);
  }
}
  section1.onclick = function () {
  moveNav(3, links[3].innerHTML);
}

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {
    if(!entry.isIntersecting){
      return;
    } 

    if(entry.target.id === "btn1" ){
      moveNav(2, links[2].innerHTML);
    }

    if(entry.target.id === "cardText"){
      moveNav(3, links[3].innerHTML)
    }

  });

}, {
  threshold: 1
});

observer.observe(section1);
observer.observe(section2);

//navbar animation//

//Dark&Light//

let btn = document.getElementById("toggle")
if(localStorage.getItem("theme")==="Light"){
  document.body.classList.add("Light");
  btn.innerHTML = `<i class = "fa-solid fa-lightbulb"></i>`  
}

btn.onclick =()=>{
  document.body.classList.toggle("Light");
  if(document.body.classList.contains("Light")){
    localStorage.setItem("theme","Light");
    btn.innerHTML = `<i class = "fa-solid fa-lightbulb"></i>`  
  }else{
    localStorage.setItem("theme", "dark");
    btn.innerHTML = `<i class = "fa-regular fa-lightbulb"></i>`  
  }
}
//Dark&Light//


