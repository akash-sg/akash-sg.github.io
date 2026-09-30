// Motion + layout for the sections below the hero. Shared by every version of the page.
(() => {
const css = `
html,body{overflow-x:clip}
.hero{position:relative;overflow:hidden}
/* headings: words slide up */
section h2.rv{opacity:1;transform:none}
section h2 .w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em}
section h2 .w>span{display:inline-block;transform:translateY(105%);transition:transform .8s cubic-bezier(.2,.7,.2,1)}
section h2.in .w>span{transform:none}


/* services: big moving words + large rows */
.marq{overflow:hidden;white-space:nowrap;padding:8px 0 40px}
.marq .t{display:inline-flex;gap:.35em;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:clamp(72px,14vw,200px);letter-spacing:-.05em;line-height:1;will-change:transform}
.marq .o{color:transparent;-webkit-text-stroke:2px var(--navy)}
.marq .d{color:var(--blue)}
#services .three{grid-template-columns:1fr;gap:0;margin-top:32px}
#services .three div{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:24px;padding:28px 0;border-top:1px solid var(--navy)}
#services .three div:last-child{border-bottom:1px solid var(--navy)}
#services .three h3{font-size:clamp(44px,7vw,92px);margin:0;transition:transform .45s cubic-bezier(.2,.7,.2,1),color .3s}
#services .three p{font-size:18px;max-width:420px}
#services .three div:hover h3{color:var(--blue);transform:translateX(18px)}

/* packages */
.pk .p{transition:transform .25s,box-shadow .25s}
.pk .p:hover{box-shadow:0 28px 50px rgba(11,27,51,.14)}
.pk .p.big{background:radial-gradient(circle at 85% 0%,rgba(46,123,255,.55),transparent 60%),var(--navy)}
.pk .price{font-variant-numeric:tabular-nums}
.strip{display:flex;flex-wrap:wrap;gap:.4em;font-size:clamp(28px,4.4vw,56px);color:var(--navy);margin-top:56px}
.strip span{opacity:.18;transition:opacity .5s,color .5s}
.strip span.on{opacity:1}
.strip span.on.last{color:var(--blue)}
.strip i{font-style:normal;opacity:.3}

/* contact: glowing navy */
#start{overflow:hidden}
#start .wrap{position:relative;z-index:1}
#start .glow{position:absolute;right:-160px;top:-160px;width:620px;height:620px;border-radius:50%;background:#2E7BFF;opacity:.45;filter:blur(110px);animation:gl 14s ease-in-out infinite}
@keyframes gl{50%{transform:translate(-120px,120px)}}
.contact h2{font-size:clamp(52px,8.5vw,120px)}
.contact input,.contact select,.contact textarea{background:rgba(255,255,255,.07);color:#fff;border:1px solid rgba(255,255,255,.2);transition:border-color .2s,background .2s}
.contact input:focus,.contact select:focus{outline:0;border-color:#7CC8FF;background:rgba(255,255,255,.12)}
.contact option{color:#0B1B33}

@media(max-width:820px){
  #services .three div{grid-template-columns:1fr;gap:8px}
}
@media(prefers-reduced-motion:reduce){
  section h2 .w>span{transform:none;transition:none}
  #start .glow{animation:none}
}`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");

// headings: split into words
const heads = [...document.querySelectorAll("section h2")];
heads.forEach(h => {
  h.innerHTML = h.textContent.trim().split(/\s+/).map((w, i) =>
    `<span class="w"><span style="transition-delay:${i * 70}ms">${w}</span></span>`).join(" ");
});

// services: moving word band
const svc = document.getElementById("services");
const marq = document.createElement("div");
marq.className = "marq"; marq.setAttribute("aria-hidden", "true");
const words = DATA.services.map((s, i) => `<span class="${i % 2 ? "o" : ""}">${s.name}</span><span class="d">&bull;</span>`).join("");
marq.innerHTML = `<div class="t">${words.repeat(4)}</div>`;
svc.insertBefore(marq, svc.firstChild);
const band = marq.firstChild;

// contact glow
const start = document.getElementById("start");
const glow = document.createElement("div"); glow.className = "glow"; start.insertBefore(glow, start.firstChild);

// steps strip
const strip = document.querySelector(".strip");
const steps = !strip ? [] : strip.textContent.split("→").map(s => s.trim());
if (strip) strip.innerHTML = steps.map((s, i) => `<span${i == steps.length - 1 ? ' class="lastwrap"' : ""}>${s}</span>`).join("<i>&rarr;</i>");
const stepEls = strip ? [...strip.querySelectorAll("span")] : [];

// prices: count up once visible
const prices = [...document.querySelectorAll(".pk .price")];
function countUp(el, to) {
  if (reduce) return;
  const t0 = performance.now();
  (function f(t) {
    const k = Math.min((t - t0) / 1100, 1);
    el.textContent = inr(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(f);
  })(t0);
}

// reveal observer for headings and prices
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target; io.unobserve(el);
  if (el.tagName === "H2") el.classList.add("in");
  else countUp(el, DATA.packages[prices.indexOf(el)].from);
}), { threshold: .3 });
if (reduce) heads.forEach(h => h.classList.add("in"));
else { heads.forEach(h => io.observe(h)); prices.forEach(p => io.observe(p)); }

// hover tilt on work cards and packages
if (fine && !reduce) {
  document.querySelectorAll(".pk .p").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateY(-6px)`;
    });
    c.addEventListener("pointerleave", () => c.style.transform = "");
  });
}

// scroll-linked motion
const imgs = [...document.querySelectorAll(".work .pic img:not(.contain)")];
let raf = 0;
function frame() {
  raf = 0;
  const vh = innerHeight;
  if (!reduce) {
    imgs.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const off = (r.top + r.height / 2 - vh / 2) * -0.08;
      img.style.setProperty("--py", Math.max(-36, Math.min(36, off)) + "px");
    });
    const sr = svc.getBoundingClientRect();
    if (sr.bottom > 0 && sr.top < vh) band.style.transform = `translateX(${(sr.top - vh) * 0.45}px)`;
  }
  if (!strip) return;
  const r = strip.getBoundingClientRect();
  const p = Math.max(0, Math.min(1, (vh * .9 - r.top) / (vh * .45)));
  const n = reduce ? stepEls.length : Math.ceil(p * stepEls.length);
  stepEls.forEach((s, i) => { s.classList.toggle("on", i < n); s.classList.toggle("last", i < n && i == stepEls.length - 1); });
}
addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
addEventListener("resize", frame);
frame();
})();
