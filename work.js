// Chapter I (sideways gallery + case view) and How it works (scroll timeline).
// Everything is built from data.js.
(() => {
const css = `
html,body{overflow-x:clip!important}
/* ---------- Chapter I: sideways gallery ---------- */
.hs{position:relative}
.hs-sticky{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:36px;padding-top:68px;box-sizing:border-box}
.hs-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;padding:0 max(24px,calc((100vw - 1160px)/2 + 24px))}
.hs-head h2{margin:0}
.hs-count{font-size:13px;font-weight:700;letter-spacing:.12em;color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.hs-bar{height:2px;background:var(--line);margin:0 max(24px,calc((100vw - 1160px)/2 + 24px))}
.hs-bar i{display:block;height:100%;width:calc(var(--hp,0)*100%);background:var(--blue)}
.hs-track{display:flex;gap:28px;padding:0 max(24px,calc((100vw - 1160px)/2 + 24px));will-change:transform;width:max-content}
.pj{position:relative;flex:none;width:min(440px,78vw);height:min(58vh,520px);border-radius:26px;overflow:hidden;cursor:pointer;border:0;padding:0;text-align:left;font:inherit;color:#fff;background:var(--c,#DCE9F7);transition:transform .4s cubic-bezier(.2,.7,.2,1)}
.pj:nth-child(even){margin-top:48px}
.hs-track::after{content:"";flex:none;width:max(1px,calc((100vw - 1160px)/2))}
.pj:hover{transform:translateY(-8px)}
.pj:focus-visible{outline:3px solid var(--blue);outline-offset:4px}
.pj .im{position:absolute;inset:0}
.pj .im img{width:100%;height:100%;object-fit:cover;display:block;transition:scale .8s cubic-bezier(.2,.7,.2,1)}
.pj .im img.contain{object-fit:contain;padding:28px}
.pj:hover .im img{scale:1.06}
.pj .tl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:clamp(48px,6vw,76px);letter-spacing:-.04em;line-height:.95;text-align:center;padding:28px}
.pj .num{position:absolute;left:22px;top:18px;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:15px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.9);color:var(--navy)}
.pj .info{position:absolute;left:12px;right:12px;bottom:12px;padding:16px 18px;border-radius:18px;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);color:var(--navy);display:flex;justify-content:space-between;align-items:center;gap:12px;transform:translateY(0);transition:background .3s}
.pj .info b{display:block;font-family:'Bricolage Grotesque',sans-serif;font-size:22px;letter-spacing:-.02em}
.pj .info small{color:var(--muted);font-size:13px}
.pj .arr{flex:none;width:44px;height:44px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;transition:transform .35s,background .3s}
.pj:hover .arr{transform:rotate(-45deg);background:var(--blue)}
.pj.next{text-decoration:none;background:var(--navy);display:flex;flex-direction:column;justify-content:space-between;padding:32px}
.pj.next .big{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:clamp(40px,4.4vw,58px);letter-spacing:-.04em;line-height:1}
.pj.next .big span{color:#7CC8FF}
.pj.next .go{display:inline-flex;align-self:flex-start;align-items:center;height:52px;padding:0 26px;border-radius:999px;background:var(--blue);color:#fff;font-weight:700}
@media(max-width:820px){
  #work{padding:64px 0}
  .hs-sticky{position:static;height:auto;gap:24px}
  .hs-track{overflow-x:auto;scroll-snap-type:x mandatory;width:auto;-webkit-overflow-scrolling:touch;padding-bottom:12px;scrollbar-width:none}
  .hs-track::-webkit-scrollbar{display:none}
  .pj{scroll-snap-align:center;height:62vh;max-height:480px}
  .pj:nth-child(even){margin-top:0}
}

/* ---------- Case view ---------- */
.cv{position:fixed;inset:0;z-index:50;background:#fff;overflow-y:auto;transform:translateY(100%);transition:transform .6s cubic-bezier(.7,0,.2,1);visibility:hidden}
.cv.open{transform:none;visibility:visible}
.cv-top{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:16px max(24px,calc((100vw - 1160px)/2 + 24px));background:rgba(255,255,255,.9);backdrop-filter:blur(10px)}
.cv-top span{font-size:13px;font-weight:700;letter-spacing:.12em;color:var(--muted)}
.cv-x{height:44px;padding:0 20px;border-radius:999px;border:1px solid var(--line);background:#fff;font:inherit;font-weight:700;cursor:pointer;color:var(--navy)}
.cv-hero{padding:40px max(24px,calc((100vw - 1160px)/2 + 24px)) 32px;background:linear-gradient(180deg,#4FA9FF 0%,#BFE6FF 55%,#fff 100%)}
.cv-hero .tag{color:var(--navy)}
.cv-hero h3{font-size:clamp(56px,11vw,150px);letter-spacing:-.05em;margin:8px 0 24px;color:#fff}
.cv-hero p{font-size:clamp(18px,2vw,22px);max-width:640px;margin:0 0 28px;color:var(--navy)}
.cv-acts{display:flex;gap:14px;flex-wrap:wrap}
.cv-acts .ghost{background:#fff;color:var(--navy)}
.cv-media{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;padding:24px max(24px,calc((100vw - 1160px)/2 + 24px)) 80px}
.cv-media>*{width:100%;border-radius:22px;display:block;background:var(--mist);max-height:80vh;object-fit:cover}
.cv-media>.wide{grid-column:1/-1}
.cv-media>.contain{object-fit:contain;padding:24px}
.cv-media video{object-fit:contain;background:#eef3f9}
.cv-empty{grid-column:1/-1;padding:48px;border-radius:22px;background:var(--mist);text-align:center;color:var(--muted);font-size:18px}
@media(max-width:820px){.cv-media{grid-template-columns:1fr}}

/* ---------- How it works: timeline ---------- */
#process{padding:0;background:#fff}
.pr{position:relative;height:260vh}
.pr-sticky{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;overflow:hidden}
.pr-ghost{position:absolute;right:-2vw;bottom:-6vh;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:48vh;line-height:1;letter-spacing:-.06em;color:var(--mist);pointer-events:none;font-variant-numeric:tabular-nums;transition:opacity .3s}
.pr .wrap{position:relative;width:100%}
.pr h2{margin-bottom:64px}
.pr-line{position:relative;height:2px;background:var(--line);margin:0 0 36px}
.pr-line i{position:absolute;left:0;top:0;height:100%;width:calc(var(--p,0)*100%);background:var(--blue)}
.pr-line b{position:absolute;top:50%;left:calc(var(--p,0)*100%);width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:var(--blue);box-shadow:0 0 0 8px rgba(46,123,255,.18)}
.pr-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.st{opacity:.22;transform:translateY(16px);transition:opacity .5s,transform .5s cubic-bezier(.2,.7,.2,1)}
.st.on{opacity:1;transform:none}
.st .n{font-size:13px;font-weight:700;letter-spacing:.12em;color:var(--blue);margin-bottom:10px;font-variant-numeric:tabular-nums}
.st h3{font-size:clamp(34px,4vw,56px);margin-bottom:10px}
.st p{margin:0;color:var(--muted);font-size:17px;max-width:240px}
.st.now h3{color:var(--blue)}
@media(max-width:820px){
  .pr{height:auto}
  .pr-sticky{position:static;height:auto;padding:72px 0}
  .pr-ghost{display:none}
  .pr h2{margin-bottom:36px}
  .pr-line{display:none}
  .pr-steps{grid-template-columns:1fr;gap:28px;border-left:2px solid var(--line);padding-left:22px;position:relative}
  .pr-steps::before{content:"";position:absolute;left:-2px;top:0;width:2px;height:calc(var(--p,0)*100%);background:var(--blue)}
}
@media(prefers-reduced-motion:reduce){
  .cv{transition:none}.st{opacity:1;transform:none}
}
/* ---------- Chapter I: categories ---------- */
.cat-sub{color:var(--muted);font-size:18px;margin:16px 0 0}
.cats{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:40px}
.cat{position:relative;height:460px;border:0;border-radius:28px;overflow:hidden;background:var(--c);color:var(--navy);padding:32px;text-align:left;font:inherit;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;transition:transform .4s cubic-bezier(.2,.7,.2,1)}
.cat.dk{color:#fff}
.cat:hover{transform:translateY(-6px)}
.cat:focus-visible{outline:3px solid var(--blue);outline-offset:4px}
.cat .num{align-self:flex-start;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:15px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.9);color:var(--navy)}
.cat .txt{position:relative;z-index:3;max-width:44%}
.cat h3{font-size:clamp(34px,3.6vw,52px);margin-bottom:10px}
.cat p{margin:0;font-size:16px;opacity:.8}
.cat .foot{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:center}
.cat .cnt{font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.cat .arr{width:52px;height:52px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;transition:transform .35s,background .3s}
.cat.dk .arr{background:#fff;color:var(--navy)}
.cat:hover .arr{transform:rotate(-45deg);background:var(--blue);color:#fff}
.fan{position:absolute;right:28px;top:40px;width:46%;height:66%;pointer-events:none}
.fan span{position:absolute;bottom:0;width:52%;aspect-ratio:3/4;border-radius:14px;overflow:hidden;background:var(--t);box-shadow:0 18px 36px rgba(6,24,58,.28);transform-origin:50% 100%;transition:transform .55s cubic-bezier(.2,.7,.2,1);display:flex;align-items:center;justify-content:center}
.fan span img{width:100%;height:100%;object-fit:cover;display:block}
.fan span img.contain{object-fit:contain;padding:10px}
.fan span b{font-family:'Bricolage Grotesque',sans-serif;color:#fff;font-size:20px;line-height:1;text-align:center;padding:10px;letter-spacing:-.02em}
.fan span:nth-child(1){left:0;transform:rotate(-9deg)}
.fan span:nth-child(2){left:24%;z-index:2;transform:rotate(1deg) translateY(-10px)}
.fan span:nth-child(3){left:48%;transform:rotate(10deg)}
.cat:hover .fan span:nth-child(1){transform:rotate(-17deg) translate(-20px,-8px)}
.cat:hover .fan span:nth-child(2){transform:rotate(0) translateY(-28px)}
.cat:hover .fan span:nth-child(3){transform:rotate(18deg) translate(20px,-8px)}
.lv{z-index:50}.cv:not(.lv){z-index:60}
.lv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;padding:24px max(24px,calc((100vw - 1160px)/2 + 24px)) 80px}
.lv-grid .pj{width:auto;height:440px;margin-top:0!important;box-shadow:inset 0 0 0 1px var(--line)}
@media(max-width:820px){
  .cats{grid-template-columns:1fr}
  .cat{height:auto;padding:24px;gap:18px}
  .cat .txt{max-width:100%}
  .fan{position:relative;top:auto;right:auto;width:78%;height:190px;margin:4px auto 0}
  .lv-grid .pj{height:400px}
}
@media(prefers-reduced-motion:reduce){.fan span,.cat{transition:none}}
/* website screenshots: full page in a browser frame, never cropped */
.browser{border-radius:10px;overflow:hidden;background:#fff;box-shadow:0 22px 44px rgba(6,24,58,.28)}
.browser::before{content:"";display:block;height:20px;background-color:#E8EDF4;background-image:radial-gradient(circle at 12px 10px,#FF6159 3.5px,transparent 4px),radial-gradient(circle at 24px 10px,#FFBD2E 3.5px,transparent 4px),radial-gradient(circle at 36px 10px,#28C840 3.5px,transparent 4px)}
.browser img{width:100%!important;height:auto!important;display:block;object-fit:initial!important;padding:0!important}
.pj .im .browser{position:absolute;left:20px;right:20px;top:64px;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.pj:hover .im .browser{transform:translateY(-6px) scale(1.02)}
.pj:hover .im .browser img{scale:1}
.cv-media>.browser{max-height:none;padding:0}
.cv-media>.browser.scroll{max-height:80vh;overflow-y:auto;overscroll-behavior:contain}
.cv-media>.browser.scroll::before{position:sticky;top:0;z-index:1}
.cv-media>.browser.big::before{height:28px;background-image:radial-gradient(circle at 16px 14px,#FF6159 5px,transparent 5.5px),radial-gradient(circle at 34px 14px,#FFBD2E 5px,transparent 5.5px),radial-gradient(circle at 52px 14px,#28C840 5px,transparent 5.5px)}
.fl.shotcard{aspect-ratio:16/11!important;width:24%!important;background:#fff;padding-top:14px}
.fl.shotcard::before{content:"";position:absolute;left:0;right:0;top:0;height:14px;background-color:#E8EDF4;background-image:radial-gradient(circle at 10px 7px,#FF6159 3px,transparent 3.5px),radial-gradient(circle at 20px 7px,#FFBD2E 3px,transparent 3.5px),radial-gradient(circle at 30px 7px,#28C840 3px,transparent 3.5px)}
.fl.shotcard img{object-fit:cover;object-position:top}
@media(max-width:820px){.fl.shotcard{width:46%!important}.fl .cap{display:none}}
.cv-hero h3 .wip{display:inline-block;vertical-align:middle;font-size:14px;letter-spacing:0;font-weight:600;padding:6px 12px;border-radius:999px;background:#FFE9A8;color:#0B1B33;margin-left:10px}
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
const $ = id => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const desk = () => innerWidth > 820;
// hero: 3 random images on every load
const pool = [...(DATA.heroImages || [])].sort(() => Math.random() - .5);
const logoFit = { "images/picklo.jpg": "#B2F000", "images/tbc.jpg": "#fff", "images/melb.jpg": "#fff", "images/jsk.jpg": "#fff", "images/bigwayz.jpg": "#F2F4F7" };
document.querySelectorAll("img[data-hero]").forEach((im, i) => {
  if (!pool[i]) return;
  im.src = pool[i];
  const src = DATA.projects.find(p => p.image === pool[i]); if (src && src.shot) im.parentElement.classList.add("shotcard");
  if (src) { const k = { web: "Web", brand: "Brand", print: "Design", media: "Photo" }[src.cat] || src.type; const cp = document.createElement("span"); cp.className = "cap"; cp.textContent = src.title + " / " + k; im.parentElement.appendChild(cp); }
  if (logoFit[pool[i]]) { im.style.objectFit = "contain"; im.style.padding = "10%"; im.style.background = logoFit[pool[i]]; }
});
const P = DATA.projects, pad = n => String(n).padStart(2, "0");

/* ----- Chapter I: categories ----- */
const C = DATA.categories || [];
const inCat = id => P.map((p, i) => ({ p, i })).filter(x => x.p.cat === id);
const mini = p => p.image ? `<img class="${p.shot ? "contain" : p.fit || ""}" src="${p.image}" alt="" loading="lazy">` : `<b>${p.title}</b>`;
const work = $("work"), wrap = work.querySelector(".wrap");
wrap.innerHTML = `<div class="eyebrow">Chapter I</div><h2>Selected work.</h2>
<p class="cat-sub">${P.length} projects in ${C.length} categories. Pick one.</p>
<div class="cats">${C.map((c, ci) => { const it = inCat(c.id); return `
  <button class="cat${c.dark ? " dk" : ""}" style="--c:${c.tint}" data-cat="${c.id}" type="button">
    <span class="num">${pad(ci + 1)}</span>
    <div class="txt"><h3>${c.name}</h3><p>${c.line}</p></div>
    <div class="fan" aria-hidden="true">${it.slice(0, 3).map(x => `<span style="--t:${x.p.tint || "#fff"}">${mini(x.p)}</span>`).join("")}</div>
    <div class="foot"><span class="cnt">${it.length} project${it.length == 1 ? "" : "s"}</span><span class="arr">&rarr;</span></div>
  </button>`; }).join("")}</div>`;

/* ----- Category list view + case view ----- */
const mk = cls => { const d = document.createElement("div"); d.className = cls; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); document.body.appendChild(d); return d; };
const lv = mk("cv lv"), cv = mk("cv");
let lastFocus = null, list = [];
const lock = () => document.body.style.overflow = (lv.classList.contains("open") || cv.classList.contains("open")) ? "hidden" : "";
const setHash = h => { try { history.replaceState(null, "", h ? "#" + h : location.pathname + location.search); } catch (e) {} };

function openCat(id) {
  const c = C.find(x => x.id === id); if (!c) return;
  list = inCat(id).map(x => x.i);
  lv.innerHTML = `<div class="cv-top"><button class="cv-x" type="button" data-back>&larr; All work</button><span>${list.length} projects</span></div>
    <div class="cv-hero"><span class="tag">Chapter I</span><h3>${c.name}</h3><p>${c.line}</p></div>
    <div class="lv-grid">${list.map((i, k) => { const p = P[i]; return `<button class="pj" style="--c:${p.tint || "#DCE9F7"}" data-i="${i}" type="button" aria-label="Open ${p.title}">
      <div class="im">${p.shot ? `<div class="browser"><img src="${p.image}" alt="" loading="lazy"></div>` : p.image ? `<img class="${p.fit || ""}" src="${p.image}" alt="" loading="lazy">` : `<div class="tl">${p.title}</div>`}</div>
      <span class="num">${pad(k + 1)}${p.wip ? " · In progress" : ""}</span>
      <div class="info"><div><b>${p.title}</b><small>${p.line}</small></div><span class="arr">&rarr;</span></div></button>`; }).join("")}
      <a class="pj next" href="#start" data-close><div class="big">Need something<br>like <span>this?</span></div><span class="go">Start a project &rarr;</span></a></div>`;
  lastFocus = lastFocus || document.activeElement;
  lv.scrollTop = 0; lv.classList.add("open"); lock();
  lv.querySelector("[data-back]").focus(); setHash(id);
}
function closeCat() {
  lv.classList.remove("open"); lock(); setHash("");
  if (lastFocus) lastFocus.focus(); lastFocus = null;
}
function openCase(i) {
  const p = P[i]; if (!p) return;
  if (!list.includes(i)) list = inCat(p.cat).map(x => x.i);
  const k = list.indexOf(i), nx = list[k + 1];
  const media = [];
  if (p.video) media.push(`<video class="wide" src="${p.video}" autoplay muted loop playsinline></video>`);
  const g = p.gallery || [];
  g.forEach((src, j) => media.push(p.shot && src.indexOf("images/") === 0 && !/picklo\.jpg$/.test(src)
    ? (/-full\.jpg$/.test(src)
      ? `<div class="browser big wide scroll"><img src="${src}" alt="${p.title}, full page" loading="lazy"></div>`
      : `<div class="browser big${(g.length == 1 || (j == 0 && g.length % 2) || g.some(x => /-full\.jpg$/.test(x))) ? " wide" : ""}"><img src="${src}" alt="${p.title}"></div>`)
    : `<img class="${(g.length == 1 || (j == 0 && g.length % 2)) ? "wide " : ""}${p.fit || ""}" src="${src}" alt="${p.title}">`));
  if (!media.length) media.push(`<div class="cv-empty">This one is best seen live.${p.link ? " Open the site to look around." : ""}</div>`);
  cv.innerHTML = `<div class="cv-top"><button class="cv-x" type="button" data-x>&larr; Back</button><span>${pad(k + 1)} / ${pad(list.length)}</span></div>
    <div class="cv-hero"><span class="tag">${(C.find(c => c.id === p.cat) || {}).name || p.type}</span><h3>${p.title}${p.wip ? " <small class=\"wip\">In progress</small>" : ""}</h3><p>${p.about || p.line}</p>
      <div class="cv-acts">${p.link ? `<a class="btn" href="${p.link}" target="_blank" rel="noopener">Visit live site &nearr;</a>` : ""}
      <a class="btn ghost" href="#start" data-close>Start a similar project</a>
      ${nx != null ? `<button class="btn ghost" type="button" data-next="${nx}">Next: ${P[nx].title} &rarr;</button>` : ""}</div></div>
    <div class="cv-media">${media.join("")}</div>`;
  lastFocus = lastFocus || document.activeElement;
  cv.scrollTop = 0; cv.classList.add("open"); lock();
  cv.querySelector("[data-x]").focus(); setHash(p.id);
}
function closeCase() {
  cv.classList.remove("open"); cv.querySelectorAll("video").forEach(v => v.pause()); lock();
  if (lv.classList.contains("open")) { setHash(P[list[0]] ? P[list[0]].cat : ""); const b = lv.querySelector("[data-back]"); if (b) b.focus(); }
  else { setHash(""); if (lastFocus) lastFocus.focus(); lastFocus = null; }
}
function closeAll() { cv.classList.remove("open"); lv.classList.remove("open"); cv.querySelectorAll("video").forEach(v => v.pause()); lock(); setHash(""); lastFocus = null; }
wrap.addEventListener("click", e => { const b = e.target.closest(".cat"); if (b) openCat(b.dataset.cat); });
lv.addEventListener("click", e => {
  if (e.target.closest("[data-back]")) closeCat();
  else if (e.target.closest("[data-close]")) closeAll();
  else { const b = e.target.closest(".pj[data-i]"); if (b) openCase(+b.dataset.i); }
});
cv.addEventListener("click", e => {
  if (e.target.closest("[data-x]")) closeCase();
  else if (e.target.closest("[data-close]")) closeAll();
  else { const n = e.target.closest("[data-next]"); if (n) openCase(+n.dataset.next); }
});
addEventListener("keydown", e => { if (e.key !== "Escape") return; if (cv.classList.contains("open")) closeCase(); else if (lv.classList.contains("open")) closeCat(); });
const h = location.hash.slice(1);
if (C.some(c => c.id === h)) setTimeout(() => openCat(h), 300);
else { const fi = P.findIndex(p => p.id === h); if (fi >= 0) setTimeout(() => openCase(fi), 300); }

/* ----- How it works ----- */
const pricing = $("pricing");
const oldStrip = pricing && pricing.querySelector(".strip"); if (oldStrip) oldStrip.remove();
const S = DATA.steps || [];
const proc = document.createElement("section"); proc.id = "process";
proc.innerHTML = `<div class="pr"><div class="pr-sticky"><div class="pr-ghost" aria-hidden="true">01</div><div class="wrap">
  <div class="eyebrow">How it works</div><h2>Four steps. No surprises.</h2>
  <div class="pr-line"><i></i><b></b></div>
  <div class="pr-steps">${S.map((s, i) => `<div class="st"><div class="n">${pad(i + 1)}</div><h3>${s.name}</h3><p>${s.line}</p></div>`).join("")}</div>
</div></div></div>`;
pricing.after(proc);
const pr = proc.querySelector(".pr"), ghost = proc.querySelector(".pr-ghost"), stEls = [...proc.querySelectorAll(".st")];

/* ----- scroll ----- */
let raf = 0;
function frame() {
  raf = 0;
  const vh = innerHeight;
  // steps
  let p;
  if (desk()) { const r = pr.getBoundingClientRect(); p = Math.max(0, Math.min(1, -r.top / (pr.offsetHeight - vh) * 1.15)); }
  else { const r = proc.getBoundingClientRect(); p = Math.max(0, Math.min(1, (vh * .75 - r.top) / (r.height * .85))); }
  if (reduce) p = 1;
  proc.style.setProperty("--p", p);
  const n = Math.min(S.length, Math.floor(p * S.length + .001) + (p > 0 ? 1 : 0));
  stEls.forEach((el, i) => { el.classList.toggle("on", i < n); el.classList.toggle("now", i == n - 1); });
  ghost.textContent = pad(Math.max(1, n));
}
addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
addEventListener("resize", frame);
frame();
})();
