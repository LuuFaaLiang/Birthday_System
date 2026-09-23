/* ============================================================
   HAPPY BIRTHDAY WEBSITE — SCRIPT
   Everything you'll want to personalize lives in CONFIG below.
   ============================================================ */

const CONFIG = {
  recipientName: "Sopriya",          // <-- change the birthday person's name
  senderName: "Lianghok",                // <-- who the letter/card is from
  birthdayMonth: 11,                // 1-12. Used for the countdown (next occurrence of this date)
  birthdayDay: 25,                 // day of month
  subtitle: "Wishing you happiness, health, success, and lots of love today and always.",
  letter: `Happy birthday! I don't say this often enough, but I'm so grateful to have you in my life.

You bring warmth into every room, you listen when it matters, and you make hard days feel a little lighter just by being you.

I hope this year brings you everything you're hoping for, and a few wonderful surprises you didn't even know to ask for.

Here's to you — today and always.`,
  wishes: [
    "May all your dreams come true. 🌟",
    "Smile today, because it's your special day. 😄",
    "Stay healthy, happy, and endlessly curious. 🌈",
    "May this year bring more laughs than tears. 🎈",
    "You deserve every good thing coming your way. 💛",
    "Here's to another year of being unstoppable. 🚀"
  ],
  galleryCaptions: ["🌸", "🎈", "💋", "📸", "🥳", "💫"],
  // Replace these with real photo URLs (or local paths in assets/images/s) if you have them.
  galleryImages: ["assets/images/Pic11.JPG", "assets/images/Pic12.jpg", "assets/images/Pic6.JPG", "assets/images/Pic4.JPG", "assets/images/Pic15.JPG", "assets/images/Pic16.JPG"],
  musicSrc: "assets/music/birthday.mp3" // drop your own mp3 in assets/music/ with this name, or change the path
};

// ---------- small helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const rand = (min, max) => Math.random() * (max - min) + min;

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initTheme();
  initBackgroundEffects();
  initCandles();
  initBlowCandles();
  initGift();
  initLetter();
  initGallery();
  initWishesCarousel();
  initCountdown();
  initMusicPlayer();
  initButtonsRippleAndFireworks();
  initDownloadAndShare();
  initCursorSparkle();

  // Fireworks 3s after load, as requested in the brief
  setTimeout(() => launchFireworks(18), 3000);
});

/* ============ CONFIG APPLICATION ============ */
function applyConfig() {
  $("#recipient-name-hero").textContent = CONFIG.recipientName;
  $("#hero-subtitle").textContent = CONFIG.subtitle;
  $("#sender-name").textContent = CONFIG.senderName;
  $("#capture-heading").textContent = `Happy Birthday, ${CONFIG.recipientName}!`;
  $("#capture-sub").textContent = CONFIG.subtitle;
  $("#birthday-audio").src = CONFIG.musicSrc;
}

/* ============ THEME TOGGLE (dark/light celebration mode) ============ */
function initTheme() {
  const toggle = $("#theme-toggle");
  const root = document.documentElement;
  const saved = null; // no localStorage dependency required; session-only toggle
  toggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
    toggle.textContent = isDark ? "🌙" : "☀️";
  });
}

/* ============ BACKGROUND PARTICLE LAYERS ============ */
function initBackgroundEffects() {
  spawnLoop($("#balloon-layer"), ["🎈", "🎈", "🎈"], 6, () => makeParticle("balloon", ["🎈"], 9, 16));
  spawnLoop($("#heart-layer"), [], 8, () => makeParticle("heart-particle", ["💗", "💛", "💜"], 5, 9));
  spawnLoop($("#butterfly-layer"), [], 12, () => makeParticle("butterfly", ["🦋"], 6, 10));
  spawnLoop($("#flower-layer"), [], 14, () => makeParticle("flower-particle", ["🌸", "🌷", "🌼"], 6, 11));
  spawnLoop($("#bubble-layer"), [], 3, () => makeParticle("bubble-particle", ["🫧"], 4, 8));

  // twinkling stars (static positions, animated opacity)
  const starLayer = $("#star-layer");
  for (let i = 0; i < 40; i++) {
    const star = document.createElement("span");
    star.className = "star-twinkle";
    star.textContent = "✦";
    star.style.left = rand(0, 100) + "vw";
    star.style.top = rand(0, 70) + "vh";
    star.style.fontSize = rand(8, 16) + "px";
    star.style.animationDuration = rand(2, 5) + "s";
    star.style.animationDelay = rand(0, 4) + "s";
    starLayer.appendChild(star);
  }

  // continuous light confetti
  setInterval(() => dropConfetti(1), 500);
}

function spawnLoop(layer, _unused, intervalSeconds, factory) {
  factory(layer);
  setInterval(() => factory(layer), intervalSeconds * 1000);
}

function makeParticle(className, symbols, minDur, maxDur) {
  return (layer) => {
    const el = document.createElement("span");
    el.className = className;
    el.textContent = symbols[Math.floor(rand(0, symbols.length))];
    el.style.left = rand(0, 96) + "vw";
    const duration = rand(minDur, maxDur);
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = rand(0, 1.5) + "s";
    if (className === "balloon") el.style.fontSize = rand(30, 52) + "px";
    layer.appendChild(el);
    setTimeout(() => el.remove(), (duration + 2) * 1000);
  };
}

function dropConfetti(count) {
  const colors = ["#ff7aa8", "#7b4397", "#ffd66b", "#a7d8f0", "#fff"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.style.position = "fixed";
    piece.style.top = "-10px";
    piece.style.left = rand(0, 100) + "vw";
    piece.style.width = rand(6, 10) + "px";
    piece.style.height = rand(8, 14) + "px";
    piece.style.background = colors[Math.floor(rand(0, colors.length))];
    piece.style.opacity = "0.9";
    piece.style.zIndex = "1";
    piece.style.pointerEvents = "none";
    piece.style.borderRadius = "2px";
    piece.style.transform = `rotate(${rand(0, 360)}deg)`;
    document.body.appendChild(piece);
    const duration = rand(4, 7);
    piece.animate(
      [
        { transform: `translateY(0) rotate(0deg)`, opacity: 0.9 },
        { transform: `translateY(105vh) rotate(${rand(200, 500)}deg)`, opacity: 0.2 }
      ],
      { duration: duration * 1000, easing: "linear" }
    );
    setTimeout(() => piece.remove(), duration * 1000);
  }
}

function burstConfetti(count = 60) {
  for (let i = 0; i < count; i++) dropConfettiBurst();
}
function dropConfettiBurst() {
  const colors = ["#ff7aa8", "#7b4397", "#ffd66b", "#a7d8f0", "#fff"];
  const piece = document.createElement("div");
  const startX = rand(30, 70);
  piece.style.position = "fixed";
  piece.style.top = "40vh";
  piece.style.left = startX + "vw";
  piece.style.width = rand(6, 10) + "px";
  piece.style.height = rand(8, 14) + "px";
  piece.style.background = colors[Math.floor(rand(0, colors.length))];
  piece.style.zIndex = "60";
  piece.style.pointerEvents = "none";
  piece.style.borderRadius = "2px";
  document.body.appendChild(piece);
  const dx = rand(-40, 40);
  const dy = rand(-30, -60);
  piece.animate(
    [
      { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${dx}vw, ${dy}vh) rotate(${rand(200, 600)}deg)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx * 1.4}vw, 100vh) rotate(${rand(400, 900)}deg)`, opacity: 0 }
    ],
    { duration: rand(2200, 3200), easing: "cubic-bezier(.2,.6,.3,1)" }
  );
  setTimeout(() => piece.remove(), 3300);
}

/* ============ FIREWORKS (canvas) ============ */
const canvas = document.getElementById("fx-canvas");
const ctx = canvas.getContext("2d");
let fireworkParticles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchFireworks(count = 6) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const x = rand(canvas.width * 0.15, canvas.width * 0.85);
      const y = rand(canvas.height * 0.15, canvas.height * 0.55);
      createFireworkBurst(x, y);
    }, i * 220);
  }
  if (!fireworkAnimating) animateFireworks();
}

function createFireworkBurst(x, y) {
  const colors = ["#ff7aa8", "#7b4397", "#ffd66b", "#a7d8f0", "#ffffff", "#ff477e"];
  const color = colors[Math.floor(rand(0, colors.length))];
  const particleCount = 40;
  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount;
    const speed = rand(2, 6);
    fireworkParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color,
      size: rand(2, 3.5)
    });
  }
}

let fireworkAnimating = false;
function animateFireworks() {
  fireworkAnimating = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworkParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04; // gravity
    p.alpha -= 0.012;
  });
  fireworkParticles = fireworkParticles.filter((p) => p.alpha > 0);

  fireworkParticles.forEach((p) => {
    ctx.beginPath();
    ctx.globalAlpha = Math.max(p.alpha, 0);
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  if (fireworkParticles.length > 0) {
    requestAnimationFrame(animateFireworks);
  } else {
    fireworkAnimating = false;
  }
}

/* ============ CURSOR SPARKLE TRAIL ============ */
function initCursorSparkle() {
  const trailLayer = $("#cursor-trail");
  let lastTime = 0;
  window.addEventListener("pointermove", (e) => {
    const now = Date.now();
    if (now - lastTime < 40) return; // throttle
    lastTime = now;
    const dot = document.createElement("span");
    dot.className = "sparkle-dot";
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    trailLayer.appendChild(dot);
    setTimeout(() => dot.remove(), 650);
  });
}

/* ============ CAKE / CANDLES ============ */
function initCandles() {
  const wrap = $("#candles");
  const count = 5;
  for (let i = 0; i < count; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";
    const flame = document.createElement("div");
    flame.className = "flame";
    flame.style.animationDelay = rand(0, 0.3) + "s";
    candle.appendChild(flame);
    wrap.appendChild(candle);
  }
}

function initBlowCandles() {
  const btn = $("#btn-blow");
  const cake = $(".cake");
  const caption = $("#cake-caption");
  let blown = false;

  btn.addEventListener("click", () => {
    if (blown) {
      // relight for replay
      $$(".candle").forEach((c) => c.classList.remove("blown"));
      cake.classList.remove("glow");
      caption.textContent = "Click the button — no lung power required.";
      btn.textContent = "Blow the Candles 🕯️";
      blown = false;
      return;
    }
    $$(".candle").forEach((c) => c.classList.add("blown"));
    cake.classList.add("glow");
    spawnSmoke();
    burstConfetti(50);
    launchFireworks(6);
    caption.textContent = "Wish granted (probably). 🎂";
    btn.textContent = "Relight Candles 🔁";
    blown = true;
  });
}

function spawnSmoke() {
  const wrap = $("#smoke-wrap");
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const puff = document.createElement("div");
      puff.className = "smoke";
      puff.style.left = rand(30, 90) + "px";
      wrap.appendChild(puff);
      setTimeout(() => puff.remove(), 1500);
    }, i * 120);
  }
}

/* ============ GIFT BOX ============ */
function initGift() {
  const btn = $("#btn-gift");
  const box = $("#gift-box");
  const surprise = $("#gift-surprise");
  let opened = false;

  btn.addEventListener("click", () => {
    if (opened) {
      box.classList.remove("open");
      surprise.classList.remove("show");
      btn.textContent = "Open Your Gift 🎁";
      opened = false;
      return;
    }
    box.classList.add("shake");
    setTimeout(() => {
      box.classList.remove("shake");
      box.classList.add("open");
      surprise.classList.add("show");
      spawnFloatingHearts($("#gift-hearts"), 8);
    }, 500);
    btn.textContent = "Close Gift";
    opened = true;
  });
}

function spawnFloatingHearts(container, count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const h = document.createElement("span");
      h.textContent = "💗";
      h.style.position = "absolute";
      h.style.left = rand(20, 80) + "%";
      h.style.bottom = "0";
      h.style.fontSize = rand(14, 22) + "px";
      container.appendChild(h);
      h.animate(
        [
          { transform: "translateY(0)", opacity: 1 },
          { transform: `translateY(-60px) translateX(${rand(-20, 20)}px)`, opacity: 0 }
        ],
        { duration: 1600, easing: "ease-out" }
      );
      setTimeout(() => h.remove(), 1600);
    }, i * 150);
  }
}

/* ============ LETTER / ENVELOPE ============ */
function initLetter() {
  const btn = $("#btn-letter");
  const envelope = $("#envelope");
  const textEl = $("#letter-text");
  let opened = false;
  let typing = false;

  btn.addEventListener("click", () => {
    if (opened) {
      envelope.classList.remove("open");
      textEl.textContent = "";
      btn.textContent = "Read My Letter 💌";
      opened = false;
      return;
    }
    envelope.classList.add("open");
    btn.textContent = "Close Letter";
    opened = true;
    if (!typing) typeLetter(textEl, CONFIG.letter);
  });
}

function typeLetter(el, text) {
  let i = 0;
  el.textContent = "";
  const speed = 18;
  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    }
  }
  step();
}

/* ============ GALLERY ============ */
function initGallery() {
  const gallery = $("#gallery");
  const tilts = [-4, 3, -2, 5, -5, 2];
  CONFIG.galleryCaptions.forEach((caption, idx) => {
    const card = document.createElement("div");
    card.className = "polaroid";
    card.style.setProperty("--tilt", tilts[idx % tilts.length] + "deg");

    const photo = document.createElement("div");
    photo.className = "polaroid-photo";
    const src = CONFIG.galleryImages[idx];
    if (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = caption;
      photo.appendChild(img);
    } else {
      photo.textContent = "📷";
    }

    const cap = document.createElement("p");
    cap.className = "polaroid-caption";
    cap.textContent = caption;

    card.appendChild(photo);
    card.appendChild(cap);
    card.addEventListener("click", () => openLightbox(photo.innerHTML, caption));
    gallery.appendChild(card);
  });

  // lightbox element
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.id = "lightbox";
  lightbox.innerHTML = `<div class="lightbox-inner"><div class="polaroid-photo" id="lightbox-photo"></div><p class="polaroid-caption" id="lightbox-caption"></p></div>`;
  lightbox.addEventListener("click", () => lightbox.classList.remove("show"));
  document.body.appendChild(lightbox);
}

function openLightbox(innerHTML, caption) {
  const lightbox = $("#lightbox");
  $("#lightbox-photo").innerHTML = innerHTML;
  $("#lightbox-caption").textContent = caption;
  lightbox.classList.add("show");
}

/* ============ WISHES CAROUSEL ============ */
let wishIndex = 0;
let wishInterval;
function initWishesCarousel() {
  const textEl = $("#wish-text");
  const dotsWrap = $("#wish-dots");
  const wishes = CONFIG.wishes;

  wishes.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dotsWrap.appendChild(dot);
  });

  function render() {
    textEl.style.opacity = 0;
    setTimeout(() => {
      textEl.textContent = wishes[wishIndex];
      textEl.style.opacity = 1;
      $$("span", dotsWrap).forEach((d, i) => d.classList.toggle("active", i === wishIndex));
    }, 200);
  }
  textEl.style.transition = "opacity 0.3s ease";
  render();

  function next() {
    wishIndex = (wishIndex + 1) % wishes.length;
    render();
  }
  function prev() {
    wishIndex = (wishIndex - 1 + wishes.length) % wishes.length;
    render();
  }

  $("#wish-next").addEventListener("click", () => { next(); restartAutoSlide(); });
  $("#wish-prev").addEventListener("click", () => { prev(); restartAutoSlide(); });
  $("#btn-quote").addEventListener("click", () => {
    wishIndex = Math.floor(rand(0, wishes.length));
    render();
    restartAutoSlide();
  });

  function restartAutoSlide() {
    clearInterval(wishInterval);
    wishInterval = setInterval(next, 4000);
  }
  restartAutoSlide();
}

/* ============ COUNTDOWN ============ */
function initCountdown() {
  function getNextBirthday() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(year, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, 0, 0, 0);
    if (target < now) {
      target = new Date(year + 1, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, 0, 0, 0);
    }
    return target;
  }

  function isToday() {
    const now = new Date();
    return now.getMonth() + 1 === CONFIG.birthdayMonth && now.getDate() === CONFIG.birthdayDay;
  }

  function tick() {
    if (isToday()) {
      $("#countdown-label").textContent = "🎉 TODAY IS YOUR BIRTHDAY! 🎉";
      $("#countdown").style.display = "none";
      return;
    }
    const target = getNextBirthday();
    const now = new Date();
    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    $("#cd-days").textContent = String(days).padStart(2, "0");
    $("#cd-hours").textContent = String(hours).padStart(2, "0");
    $("#cd-mins").textContent = String(mins).padStart(2, "0");
    $("#cd-secs").textContent = String(secs).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}

/* ============ MUSIC PLAYER ============ */
function initMusicPlayer() {
  const audio = $("#birthday-audio");
  const toggleBtn = $("#music-toggle");
  const icon = $("#music-icon");
  const volume = $("#music-volume");
  audio.volume = Number(volume.value);
  let playing = false;

  toggleBtn.addEventListener("click", () => {
    if (playing) {
      audio.pause();
      icon.textContent = "🎵";
      toggleBtn.classList.remove("spin");
      playing = false;
    } else {
      audio.play().catch(() => {
        // If no audio file has been provided yet, fail silently and let the icon reflect intent.
      });
      icon.textContent = "🎶";
      toggleBtn.classList.add("spin");
      playing = true;
    }
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
  });
}

/* ============ BUTTONS: RIPPLE + FIREWORKS TRIGGERS ============ */
function initButtonsRippleAndFireworks() {
  $$(".ripple").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      circle.className = "ripple-circle";
      circle.style.width = circle.style.height = size + "px";
      circle.style.left = e.clientX - rect.left - size / 2 + "px";
      circle.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });

  $("#btn-celebrate").addEventListener("click", () => {
    burstConfetti(70);
    launchFireworks(8);
  });
  $("#btn-fireworks").addEventListener("click", () => launchFireworks(12));
}

/* ============ DOWNLOAD CARD + SHARE MESSAGE ============ */
function initDownloadAndShare() {
  const feedback = $("#share-feedback");

  $("#btn-share").addEventListener("click", async () => {
    const msg = `Happy Birthday, ${CONFIG.recipientName}! ${CONFIG.subtitle}`;
    try {
      await navigator.clipboard.writeText(msg);
      feedback.textContent = "Copied! Paste it anywhere. 💌";
    } catch {
      feedback.textContent = msg; // fallback: show it so it can be selected manually
    }
    setTimeout(() => (feedback.textContent = ""), 4000);
  });

  $("#btn-download").addEventListener("click", () => {
    if (window.html2canvas) {
      captureCard();
    } else {
      // Load html2canvas from CDN on demand
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      script.onload = captureCard;
      script.onerror = () => {
        feedback.textContent = "Couldn't load the image tool — check your internet connection.";
      };
      document.body.appendChild(script);
    }
  });

  function captureCard() {
    const card = $("#card-to-capture");
    window.html2canvas(card, { backgroundColor: null, scale: 2 }).then((canvasEl) => {
      const link = document.createElement("a");
      link.download = `happy-birthday-${CONFIG.recipientName.toLowerCase()}.png`;
      link.href = canvasEl.toDataURL("image/png");
      link.click();
      feedback.textContent = "Card downloaded! 🎉";
      setTimeout(() => (feedback.textContent = ""), 4000);
    });
  }
}
