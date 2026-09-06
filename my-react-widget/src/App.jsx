import './App.css';

// Scrolls to a hash target inside the host page. Falls back to setting
// location.hash so native anchor behaviour kicks in if smooth scroll fails.
function scrollToHash(hash) {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.hash = hash;
  }
}

function HeroSection() {
  return (
    <div className="HeroSection">
      <br />
      <h1 className="MainHeader2"><span>I'm</span> AionSeeker.dev</h1>
      <p className="text">
        I build modern fast and responsive websites
        <br />
        with clean code and great user experience.
      </p>
      <div className="btn">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToHash('#about');
          }}
        >
          <button
            // id="btn1" is load-bearing: main.js uses it as the
            // IntersectionObserver target to snap the navbar circle to
            // slot 0 (house) when the top of the page is in view.
            id="btn1"
            value="1"
          >
            About me<i className="fa-solid fa-circle-user" />
          </button>
        </a>
        <button
          id="btn2"
          onClick={() => scrollToHash('#projects')}
        >
          View my work <i className="fa-solid fa-arrow-right-long" />
        </button>
      </div>
    </div>
  );
}

function FooterSection() {
  // Placeholder for now — fill in later.
  return (
    <section className="FooterSection">
      <div className="footer-placeholder">
        {/* TODO: footer content */}
      </div>
    </section>
  );
}

function App({ section = 'hero' }) {
  if (section === 'footer') return <FooterSection />;
  return <HeroSection />;
}

export default App;
