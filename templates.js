/* Project templates used by BlueCode. Kept in a separate file so they are easy to edit. */
'use strict';

const TEMPLATES = {
  starter: {
    name: 'Starter',
    description: 'A tiny interactive page.',
    icon: '<>',
    files: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="card">
    <span class="eyebrow">Made with BlueCode</span>
    <h1>Your next idea starts <em>here.</em></h1>
    <p class="intro">
      Edit <code>index.html</code>, <code>styles.css</code> or <code>script.js</code>.
      Your preview updates as you type.
    </p>
    <button id="hello-btn" type="button">Say hello <span>👋</span></button>
    <p class="message" id="message" aria-live="polite"></p>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
      'styles.css': `:root {
  --ink: #082f49;
  --muted: #527b91;
  --sky: #0ea5e9;
  --sky-dark: #0369a1;
}

* {
  box-sizing: border-box;
}

body {
  display: grid;
  min-height: 100vh;
  margin: 0;
  padding: 28px;
  place-items: center;
  color: var(--ink);
  background:
    radial-gradient(circle at 15% 10%, rgba(56, 189, 248, 0.28), transparent 28rem),
    radial-gradient(circle at 85% 90%, rgba(125, 211, 252, 0.35), transparent 26rem),
    #eef9ff;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.card {
  width: min(620px, 100%);
  padding: clamp(36px, 7vw, 68px);
  text-align: center;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 30px;
  box-shadow: 0 35px 90px -38px rgba(3, 105, 161, 0.48);
  backdrop-filter: blur(16px);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 11px;
  color: var(--sky-dark);
  background: #e0f2fe;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.eyebrow::before {
  width: 6px;
  height: 6px;
  background: var(--sky);
  border-radius: 50%;
  content: "";
}

h1 {
  margin: 22px 0 14px;
  font-size: clamp(38px, 7vw, 62px);
  line-height: 0.98;
  letter-spacing: -0.055em;
}

h1 em {
  color: var(--sky-dark);
  font-style: normal;
}

.intro {
  max-width: 430px;
  margin: 0 auto 30px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
}

code {
  padding: 2px 6px;
  color: var(--sky-dark);
  background: #eaf7ff;
  border-radius: 5px;
  font-family: ui-monospace, monospace;
  font-size: 0.86em;
}

button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 22px;
  color: #fff;
  background: linear-gradient(135deg, #38bdf8, #0284c7);
  border: 0;
  border-radius: 12px;
  box-shadow: 0 12px 22px -10px rgba(2, 132, 199, 0.75);
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 26px -10px rgba(2, 132, 199, 0.8);
}

button:active {
  transform: translateY(0);
}

.message {
  min-height: 25px;
  margin: 20px 0 0;
  color: var(--sky-dark);
  font-size: 13px;
  font-weight: 600;
}`,
      'script.js': `const button = document.querySelector('#hello-btn');
const message = document.querySelector('#message');

const greetings = [
  'Hello, world! 👋',
  'Welcome to your new project.',
  'You are officially building on the web.',
  'Now make it yours.'
];

let index = 0;

button.addEventListener('click', () => {
  message.textContent = greetings[index % greetings.length];
  index += 1;

  button.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(0.94)' },
      { transform: 'scale(1)' }
    ],
    { duration: 220, easing: 'ease-out' }
  );
});`
    }
  },

  landing: {
    name: 'Landing page',
    description: 'Hero, features and footer.',
    icon: '✦',
    files: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#">
      <span class="logo-mark">~</span>
      <span>Drift</span>
    </a>
    <nav>
      <a href="#features">Features</a>
      <a href="#about">About</a>
      <a class="nav-cta" href="#start">Get started</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-copy">
        <span class="pill"><span class="pulse"></span> New: version 2.0 is here</span>
        <h1>A calmer way to ship your <em>best ideas.</em></h1>
        <p>Drift brings your notes, tasks and plans into one quiet space — so you can spend less time managing work and more time making it.</p>
        <div class="hero-actions">
          <a class="btn" href="#start">Start for free</a>
          <a class="btn btn-quiet" href="#features">See how it works</a>
        </div>
        <p class="fine-print">No credit card. Free for personal projects.</p>
      </div>

      <div class="hero-card" aria-hidden="true">
        <div class="app-window">
          <div class="window-bar"><i></i><i></i><i></i><span>Today</span></div>
          <div class="window-body">
            <p class="window-kicker">Good morning, Alex</p>
            <h3>Three things that matter today</h3>
            <div class="task done"><span></span><p>Shape the new onboarding</p><b>Done</b></div>
            <div class="task"><span></span><p>Write the product update</p><small>10:30</small></div>
            <div class="task"><span></span><p>Review the launch checklist</p><small>14:00</small></div>
            <div class="progress"><i></i></div>
            <p class="window-foot">2 of 3 complete</p>
          </div>
        </div>
        <div class="float-card">
          <b>+ 18%</b>
          <span>focus time this week</span>
        </div>
      </div>
    </section>

    <section class="features" id="features">
      <div class="section-heading">
        <span class="eyebrow">Less noise, more progress</span>
        <h2>Everything you need. Nothing you don't.</h2>
      </div>
      <div class="feature-grid">
        <article class="feature">
          <div class="feature-icon">◌</div>
          <h3>Quiet by default</h3>
          <p>No badges, streaks or noisy notifications. Just a calm place to think and work.</p>
        </article>
        <article class="feature">
          <div class="feature-icon">⌘</div>
          <h3>Fast where it counts</h3>
          <p>Capture a thought in a second, then find it again the moment you need it.</p>
        </article>
        <article class="feature">
          <div class="feature-icon">↗</div>
          <h3>Made to move</h3>
          <p>Your work stays in sync across every device, even when inspiration strikes offline.</p>
        </article>
      </div>
    </section>

    <section class="cta" id="start">
      <div>
        <span class="eyebrow">Your next chapter</span>
        <h2>Make room for your best work.</h2>
      </div>
      <a class="btn" href="#">Get Drift free</a>
    </section>
  </main>

  <footer id="about">
    <a class="logo" href="#"><span class="logo-mark">~</span><span>Drift</span></a>
    <p>A fictional product built with HTML, CSS and JavaScript.</p>
    <span>© <span id="year"></span> Drift Studio</span>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
      'styles.css': `:root {
  --ink: #0b3550;
  --muted: #476b80;
  --sky: #0ea5e9;
  --sky-dark: #0369a1;
  --paper: #f6fcff;
  --line: #d7edf8;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--ink);
  background: var(--paper);
  font-family: "Segoe UI", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1120px;
  margin: 0 auto;
  padding: 20px 28px;
  background: rgba(246, 252, 255, 0.83);
  backdrop-filter: blur(16px);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #fff;
  background: linear-gradient(135deg, #38bdf8, #0369a1);
  border-radius: 9px;
  font-size: 20px;
  font-weight: 500;
}

nav {
  display: flex;
  align-items: center;
  gap: 26px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
}

nav a:hover {
  color: var(--sky-dark);
}

.nav-cta {
  padding: 9px 15px;
  color: #fff;
  background: var(--ink);
  border-radius: 9px;
}

.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 70px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 80px 28px 100px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 11px;
  color: var(--sky-dark);
  background: #e0f2fe;
  border: 1px solid #c9eaf9;
  border-radius: 99px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.pulse {
  width: 6px;
  height: 6px;
  background: var(--sky);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.14);
}

h1 {
  margin: 22px 0 20px;
  font-size: clamp(43px, 5.5vw, 70px);
  line-height: 0.98;
  letter-spacing: -0.06em;
}

h1 em {
  color: var(--sky-dark);
  font-style: normal;
}

.hero-copy > p {
  max-width: 520px;
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 20px;
  color: #fff;
  background: linear-gradient(135deg, #38bdf8, #0284c7);
  border-radius: 11px;
  box-shadow: 0 12px 24px -12px rgba(2, 132, 199, 0.8);
  font-size: 13px;
  font-weight: 700;
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 30px -12px rgba(2, 132, 199, 0.85);
}

.btn-quiet {
  color: var(--ink);
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: none;
}

.fine-print {
  margin-top: 15px !important;
  color: #82a2b3 !important;
  font-size: 10.5px !important;
}

.hero-card {
  position: relative;
  padding: 10px 0;
}

.app-window {
  overflow: hidden;
  background: #fff;
  border: 1px solid #d5eaf5;
  border-radius: 20px;
  box-shadow: 0 40px 90px -38px rgba(3, 105, 161, 0.55);
  transform: rotate(1.5deg);
}

.window-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 37px;
  padding: 0 14px;
  background: #f7fcff;
  border-bottom: 1px solid #e9f5fb;
}

.window-bar i {
  width: 6px;
  height: 6px;
  background: #c4e1ef;
  border-radius: 50%;
}

.window-bar i:first-child { background: #7dd3fc; }
.window-bar span {
  margin-left: auto;
  color: #8ca9b8;
  font-size: 9px;
  font-weight: 600;
}

.window-body {
  padding: 26px;
}

.window-kicker {
  margin: 0;
  color: #7f9dac;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.window-body h3 {
  margin: 5px 0 22px;
  font-size: 21px;
  letter-spacing: -0.04em;
}

.task {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 0;
  border-bottom: 1px solid #eef8fd;
  font-size: 11px;
}

.task span {
  width: 15px;
  height: 15px;
  border: 1.5px solid #b9dbea;
  border-radius: 5px;
}

.task p {
  flex: 1;
  margin: 0;
}

.task small {
  color: #94afbd;
  font-size: 9px;
}

.task.done span {
  background: #38bdf8;
  border-color: #38bdf8;
}

.task.done p {
  color: #9ab4c1;
  text-decoration: line-through;
}

.task b {
  color: var(--sky-dark);
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
}

.progress {
  height: 6px;
  margin-top: 22px;
  overflow: hidden;
  background: #e8f6fd;
  border-radius: 99px;
}

.progress i {
  display: block;
  width: 66%;
  height: 100%;
  background: linear-gradient(90deg, #7dd3fc, #0284c7);
  border-radius: inherit;
}

.window-foot {
  margin: 8px 0 0;
  color: #8da9b8;
  font-size: 9px;
}

.float-card {
  position: absolute;
  right: -18px;
  bottom: -20px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 13px 17px;
  background: #fff;
  border: 1px solid #d8edf7;
  border-radius: 13px;
  box-shadow: 0 20px 40px -20px rgba(3, 105, 161, 0.4);
  transform: rotate(-3deg);
}

.float-card b {
  color: var(--sky-dark);
  font-size: 18px;
  letter-spacing: -0.04em;
}

.float-card span {
  color: #7f9dac;
  font-size: 8.5px;
}

.features {
  padding: 88px 28px;
  background: #fff;
}

.section-heading {
  max-width: 720px;
  margin: 0 auto 48px;
  text-align: center;
}

.eyebrow {
  color: var(--sky-dark);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-heading h2,
.cta h2 {
  margin: 10px 0 0;
  font-size: clamp(30px, 4vw, 45px);
  letter-spacing: -0.05em;
  line-height: 1.08;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 1050px;
  margin: 0 auto;
}

.feature {
  padding: 26px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 18px;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin-bottom: 20px;
  color: var(--sky-dark);
  background: #e0f2fe;
  border-radius: 11px;
  font-size: 18px;
}

.feature h3 {
  margin: 0 0 8px;
  font-size: 16px;
  letter-spacing: -0.03em;
}

.feature p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.7;
}

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  max-width: 1050px;
  margin: 86px auto;
  padding: 48px;
  background:
    radial-gradient(circle at 90% 10%, rgba(56, 189, 248, 0.3), transparent 18rem),
    #eaf8ff;
  border: 1px solid #cbeafa;
  border-radius: 24px;
}

.cta .eyebrow {
  color: var(--sky-dark);
}

footer {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px;
  color: #8aa7b7;
  border-top: 1px solid var(--line);
  font-size: 10px;
}

footer p {
  flex: 1;
  margin: 0;
}

footer .logo {
  color: var(--ink);
  font-size: 14px;
}

footer .logo-mark {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  font-size: 16px;
}

.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 600ms ease, transform 600ms ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 820px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 34px;
    padding-top: 45px;
  }

  .hero-card {
    width: min(430px, 100%);
    margin: 0 auto;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .cta {
    flex-direction: column;
    align-items: flex-start;
    margin: 60px 20px;
    padding: 32px;
  }

  footer {
    flex-wrap: wrap;
  }

  footer p {
    flex-basis: 100%;
    order: 3;
  }

  nav a:not(.nav-cta) {
    display: none;
  }
}`,
      'script.js': `const year = document.querySelector('#year');
year.textContent = new Date().getFullYear();

const reveals = document.querySelectorAll('.feature, .cta, .section-heading');

reveals.forEach((element) => {
  element.classList.add('reveal');

  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 }).observe(element);
});`
    }
  },

  blank: {
    name: 'Blank slate',
    description: 'Just one empty page.',
    icon: '□',
    files: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
</head>
<body>
  <h1>Hello, world.</h1>
</body>
</html>`
    }
  }
};
