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
let section1 = document.getElementById("hero-root");
let section2 = document.querySelector(".cardText");
let section3 = document.getElementById("AboutMeNavigation");
let section4 = document.getElementById("contactNavigation");
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
  moveNav(1, links[1].innerHTML);
};

// Intersection Observer for automatic navigation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      if (ShouldRunCondtion && entry.target.id === "hero-root") {
        moveNav(0, links[0].innerHTML);
      }

      if (ShouldRunCondtion && entry.target.classList.contains("cardText")) {
        moveNav(2, links[2].innerHTML);
      }
      if (ShouldRunCondtion && entry.target.id === "AboutMeNavigation") {
        moveNav(1, links[1].innerHTML);
        SkillPrecentage();
        JsSkillPrecentage();
        CssSkillPrecentage();
      }
      if (ShouldRunCondtion && entry.target.id === "contactNavigation") {
        moveNav(3, links[3].innerHTML);
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
observer.observe(section4);

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

// Contact form submit — gets a reCAPTCHA v3 token, posts to the Cloudflare Worker,
// then shows the inline thank-you (or error) state. No page redirect.
//
// Set these two values before deploying:
const RECAPTCHA_SITE_KEY = "6Lejwp0tAAAAADsvhe3qxuCBg5FT61je8Bj5Chrl";
const WORKER_URL = "https://contact-form.aionseeker.workers.dev";

(function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const contactThanks = document.getElementById("contactThanks");
  const contactError = document.getElementById("contactError");
  if (!contactForm || !contactThanks || !contactError) {
    console.warn("[contact-form] missing DOM nodes; submit handler not attached");
    return;
  }

  const submitBtn = contactForm.querySelector(".contactSubmit");
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";

  function showError(msg) {
    contactError.textContent = msg;
    contactError.hidden = false;
  }

  function clearError() {
    contactError.hidden = true;
    contactError.textContent = "";
  }

  function resetSubmitButton() {
    if (!submitBtn) return;
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;
  }

  // Wait until reCAPTCHA's loader script has initialized grecaptcha.
  function waitForRecaptcha() {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      (function poll() {
        if (window.grecaptcha && typeof window.grecaptcha.execute === "function") {
          window.grecaptcha.ready(() => resolve(window.grecaptcha));
          return;
        }
        if (Date.now() - start > 8000) {
          reject(new Error("reCAPTCHA not loaded"));
          return;
        }
        setTimeout(poll, 100);
      })();
    });
  }

  contactForm.addEventListener("submit", async (e) => {
    // ALWAYS preventDefault — if any later code throws, the form must
    // never do a native submit/reload.
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    clearError();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
    }

    let token;
    try {
      const grecaptcha = await waitForRecaptcha();
      token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "submit" });
      console.log(`[contact-form] generated token: ${token}`);
    } catch (err) {
      resetSubmitButton();
      showError("Couldn't load CAPTCHA. Refresh and try again.");
      return;
    }

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, token }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const detail = data.score != null ? ` (score ${data.score.toFixed(2)})` : "";
        const errCodes = data.google_errors?.length
          ? `: ${data.google_errors.join(", ")}`
          : "";
        throw new Error(`${data.error || `HTTP ${res.status}`}${detail}${errCodes}`);
      }

      resetSubmitButton();
      contactForm.hidden = true;
      contactThanks.hidden = false;
    } catch (err) {
      resetSubmitButton();
      console.error("[contact-form] submit failed:", err);
      showError(`Verification failed: ${err.message}. Please try again.`);
    }
  });

  console.log("[contact-form] submit handler attached");
})();
