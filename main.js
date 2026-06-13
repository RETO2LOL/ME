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
let aboutME = document.getElementById("btn1");
const social = document.getElementById("nav");
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
aboutME.onclick = function () {
  moveNav(3, links[3].innerHTML);
}

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){
      moveNav(2, links[2].innerHTML);
    } else {
      moveNav(3, links[3].innerHTML);
    }

  });

}, {
  threshold: 0
});

observer.observe(social);

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

//card edit//
const cards = document.querySelectorAll('.card');
const container = document.querySelector('.cards');

container.addEventListener('mousemove', (e) => {
  let rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  
  let rotateX = -(y - rect.height / 2) / 10;
  let rotateY = (x - rect.width / 2) / 10;
  
  cards.forEach(card => {
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
  });
});

container.addEventListener('mouseleave', () => {
  cards.forEach(card => {
    card.style.setProperty('--rotateX', `0deg`);
    card.style.setProperty('--rotateY', `0deg`);
  });
});
