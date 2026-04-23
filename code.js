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

let dark = document.getElementById("NightAndLight")
let islight = localStorage.getItem("theme") === "dark";

if (islight) {
  document.documentElement.style.setProperty('--primary-color', ' #424242');
  document.documentElement.style.setProperty('--square-color', 'rgba(255,255,255,0.5)');

  dark.innerHTML = `<i class="fa-regular fa-lightbulb"></i>`;
}


dark.addEventListener("click", () => {
  if (!islight) {
    document.documentElement.style.setProperty('--square-color', 'rgba(255,255,255,0.5)');
    document.documentElement.style.setProperty('--primary-color', ' #424242');
    document.documentElement.style.setProperty('--navbar-color', ' #424242');
    dark.innerHTML = `<i class="fa-regular fa-lightbulb"></i>`;
     localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.style.setProperty('--primary-color', 'rgba(255,255,255,0.5)');
    document.documentElement.style.setProperty('--square-color', '#424242');
    document.documentElement.style.setProperty('--navbar-color', 'rgba(255,255,255,0.5)');
    dark.innerHTML = `<i class="fa-solid fa-lightbulb"></i>`;
    localStorage.setItem("theme", "light");
  }
  islight = !islight;
});




