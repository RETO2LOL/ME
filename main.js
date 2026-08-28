// Dots background generation
const dotsContainer = document.getElementById("dots");
const dotCount = 20;

for (let i = 0; i < dotCount; i++) {
  const dot = document.createElement("div");
  dot.className = "dot";

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
let section2 = document.querySelector(".cardText");
let section3 = document.getElementById("AboutMeNavigation");
let ShouldRunCondtion = true;
let triggerd = false;

// Functions
function moveNav(index, iconHTML) {
  for (let link of links) {
    link.style.opacity = "1";
  }

  circle.style.left = 80 * index + "px";
  circle.innerHTML = iconHTML;

  links[index].style.opacity = "0";
}
for (let link of links) {
  link.onclick = function () {
    moveNav(this.value, this.innerHTML);
    ShouldRunCondtion = false;
    triggerd = true;
    setTimeout(() => {
      triggerd = false;
    }, 800);
  };
}
window.addEventListener("scroll", () => {
  if (triggerd) return;
  if (!ShouldRunCondtion) {
    ShouldRunCondtion = true;
  }
});
section1.onclick = function () {
  moveNav(3, links[3].innerHTML);
};

// Intersection Observer for automatic navigation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      if (ShouldRunCondtion && entry.target.id === "btn1") {
        moveNav(2, links[2].innerHTML);
      }

      if (ShouldRunCondtion && entry.target.classList.contains("cardText")) {
        moveNav(3, links[3].innerHTML);
      }
      if (ShouldRunCondtion && entry.target.id === "AboutMeNavigation") {
        moveNav(1, links[1].innerHTML);
        SkillPrecentage();
        JsSkillPrecentage();
        CssSkillPrecentage();
      }
    });
  },
  {
    threshold: 0.5,
  },
);

observer.observe(section1);
observer.observe(section2);
observer.observe(section3);

// Dark & Light mode toggle
let btn = document.getElementById("toggle");

if (localStorage.getItem("theme") === "Light") {
  document.body.classList.add("Light");
  btn.innerHTML = `<i class="fa-solid fa-lightbulb"></i>`;
}

btn.onclick = () => {
  document.body.classList.toggle("Light");

  if (document.body.classList.contains("Light")) {
    localStorage.setItem("theme", "Light");
    btn.innerHTML = `<i class="fa-solid fa-lightbulb"></i>`;
  } else {
    localStorage.setItem("theme", "dark");
    btn.innerHTML = `<i class="fa-regular fa-lightbulb"></i>`;
  }
};

// Skill percentage bar animations
function animateSkillBar(bar, textEl, targetPercent) {
  let current = 0;
  const interval = setInterval(() => {
    if (current >= targetPercent) {
      clearInterval(interval);
      return;
    }

    current++;
    bar.style.width = `${current}%`;
    textEl.innerHTML = `<p>${current}%</p>`;
  }, 30);
}

const bar = document.querySelector(".presentage");
const barText = document.querySelector(".SkillPrecentage");
const JSbar = document.querySelector(".JSpresentage");
const JSbarText = document.querySelector(".JsSkillPrecentage");
const CSSbar = document.querySelector(".CSSpresentage");
const CSSbarText = document.querySelector(".CssSkillPrecentage");

function SkillPrecentage() {
  animateSkillBar(bar, barText, 85);
}
function JsSkillPrecentage() {
  animateSkillBar(JSbar, JSbarText, 70);
}
function CssSkillPrecentage() {
  animateSkillBar(CSSbar, CSSbarText, 80);
}
