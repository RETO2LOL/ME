//navbar animation//

//varibles//

let links = document.getElementsByTagName("li");
let circle = document.getElementById("circle");

//functions//

for(link of links){
  link.onclick = function(){

    for(link of links){
      link.style.opacity = "1"
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




