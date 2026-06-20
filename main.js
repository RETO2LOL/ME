// Dots background generation
const dotsContainer = document.getElementById('dots');
const dotCount = 20;

for (let i = 0; i < dotCount; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot';
  
  // Position dots across the full viewport
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  
  dot.style.left = `${x}%`;
  dot.style.top = `${y}%`;
  
  const size = Math.random() * 8 + 2;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  
  dotsContainer.appendChild(dot);
}

// Navbar animation
// Variables
let links = document.getElementsByTagName("li");
let circle = document.getElementById("circle");
let section1 = document.getElementById("btn1");
let section2 = document.getElementById("cardText");
let section3 = document.getElementById("transfer");

// Functions
function moveNav(index, iconHTML) {
  // Reset all links to visible
  for (let link of links) {
    link.style.opacity = "1";
  }

  // Move circle to selected link
  circle.style.left = (80 * index) + "px";
  circle.innerHTML = iconHTML;

  // Hide the current link
  links[index].style.opacity = "0";
}

// Add click event listeners to all links
for (let link of links) {
  link.onclick = function () {
    moveNav(this.value, this.innerHTML);
  }
}

// Add click event listener to section1 button
section1.onclick = function () {
  moveNav(3, links[3].innerHTML);
}

// Intersection Observer for automatic navigation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }

    if (entry.target.id === "btn1") {
      moveNav(2, links[2].innerHTML);
    }

    if (entry.target.id === "cardText") {
      moveNav(3, links[3].innerHTML);
    }
  });
}, {
  threshold: 0.5
});

observer.observe(section1);
observer.observe(section2);

// Dark & Light mode toggle
let btn = document.getElementById("toggle");

// Check for saved theme preference or default to dark
if (localStorage.getItem("theme") === "Light") {
  document.body.classList.add("Light");
  btn.innerHTML = `<i class="fa-solid fa-lightbulb"></i>`;
}

// Toggle theme on button click
btn.onclick = () => {
  document.body.classList.toggle("Light");
  
  if (document.body.classList.contains("Light")) {
    localStorage.setItem("theme", "Light");
    btn.innerHTML = `<i class="fa-solid fa-lightbulb"></i>`;
  } else {
    localStorage.setItem("theme", "dark");
    btn.innerHTML = `<i class="fa-regular fa-lightbulb"></i>`;
  }
}
