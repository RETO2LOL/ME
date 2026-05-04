//navbar animation//

//variables//

let links = document.getElementsByTagName("li");
let circle = document.getElementById("circle");

//functions//

for(link of links){
  link.onclick = function nav (){

    for(li of links){
      li.style.opacity = "1"
    }

    circle.style.left = (80 * this.value) + "px";
    circle.innerHTML = this.innerHTML;
    this.style.opacity = "0"
  }
}
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
