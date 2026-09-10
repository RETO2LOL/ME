// Dots background generation
const dotsContainer = document.getElementById("dots");
const dotCount = 20;
const dots = [];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

for (let i = 0; i < dotCount; i++) {
  const dot = document.createElement("div");
  dot.className = "dot";

  // Position dots across the full viewport
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  dot.style.left = `${x}%`;
  dot.style.top = `${y}%`;

  const size = Math.random() * 4 + 2;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;

  dotsContainer.appendChild(dot);
  dots.push({ element: dot, y: y / 100, speed: 0.04 + size * 0.016, phase: x });
}

function updateDots() {
  const height = window.innerHeight;
  const padding = 30;
  const span = height + padding * 2;
  const scroll = Math.max(0, window.scrollY);

  for (const dot of dots) {
    if (reducedMotion.matches) {
      dot.element.style.transform = "";
      continue;
    }

    const startY = dot.y * height;
    const position = startY - scroll * dot.speed;
    // Wrap beyond the viewport edges so dots stay distributed on long pages.
    const wrappedY = ((position + padding) % span + span) % span - padding;
    const driftX = (Math.sin(scroll * 0.001 + dot.phase) - Math.sin(dot.phase)) * 16;
    dot.element.style.transform = `translate3d(${driftX}px, ${wrappedY - startY}px, 0)`;
  }
}

// Track real sections in document order, using the navbar's anchor targets.
const sections = [...document.querySelectorAll("[data-nav-section]")];
const navLinks = [...document.querySelectorAll("#nav .navbar li > a")];
const circle = document.getElementById("circle");
let activeSection = null;
let navFrame = null;

function updateNavigation() {
  if (!sections.length || !circle) return;

  // One stable reading line avoids competing intersection callbacks and
  // works even when a section is taller than the viewport.
  const readingLine = window.innerHeight * 0.35;
  let currentSection = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) {
      currentSection = section;
    }
  }

  // The last section may be too short to reach the reading line.
  if (window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    currentSection = sections[sections.length - 1];
  }

  const activeLink = navLinks.find(
    (link) => link.hash === `#${currentSection.id}`,
  );
  if (!activeLink) return;

  const activeItem = activeLink.parentElement;
  circle.style.left = `${activeItem.parentElement.offsetLeft + activeItem.offsetLeft +
    (activeItem.offsetWidth - circle.offsetWidth) / 2}px`;
  if (activeSection === currentSection) return;
  activeSection = currentSection;

  for (const link of navLinks) {
    const isActive = link === activeLink;
    link.parentElement.style.opacity = isActive ? "0" : "1";
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  circle.innerHTML = activeLink.innerHTML;
}

function scheduleNavigationUpdate() {
  if (navFrame !== null) return;
  navFrame = requestAnimationFrame(() => {
    navFrame = null;
    updateNavigation();
    updateDots();
  });
}

// Follow actual scroll position, including hero buttons and interrupted
// smooth scrolling, without temporarily disabling navigation tracking.
window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
window.addEventListener("resize", scheduleNavigationUpdate);
window.addEventListener("load", scheduleNavigationUpdate);
window.addEventListener("pageshow", scheduleNavigationUpdate);
reducedMotion.addEventListener("change", scheduleNavigationUpdate);

// Hide visually while preserving layout so the observer can detect sections.
// Reset offscreen so each visit reveals again. Without observer support,
// leave everything visible.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    }
    scheduleNavigationUpdate();
  }, { threshold: 0 });

  for (const section of document.querySelectorAll("[data-reveal]")) {
    revealObserver.observe(section);
  }
  document.documentElement.classList.add("reveal-ready");
}

updateNavigation();
updateDots();

// Dark & Light mode toggle
let btn = document.getElementById("toggle");

function updateThemeButton() {
  const isLight = document.body.classList.contains("Light");
  btn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  btn.setAttribute("aria-pressed", String(isLight));
  btn.innerHTML = `<i class="${isLight ? "fa-solid" : "fa-regular"} fa-lightbulb" aria-hidden="true"></i>`;
}

if (localStorage.getItem("theme") === "Light") {
  document.body.classList.add("Light");
}
updateThemeButton();

btn.onclick = () => {
  document.body.classList.toggle("Light");

  if (document.body.classList.contains("Light")) {
    localStorage.setItem("theme", "Light");
  } else {
    localStorage.setItem("theme", "dark");
  }
  updateThemeButton();
};


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
