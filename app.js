const routes = window.CTU_ROUTES ?? [];

const $ = (s) => document.querySelector(s);
const els = {
  from: $("#fromStop"),
  to: $("#toStop"),
  list: $("#stopsList"),
  chips: $("#quickChips"),
  alert: $("#alertBox"),
  find: $("#btnFind"),
  swap: $("#btnSwap"),
  share: $("#btnShare"),
  copyTrip: $("#btnCopyTrip"),
  search: $("#stopSearch"),
  container: $("#routesContainer"),
  meta: $("#resultsMeta"),
  status: $("#dataStatus"),
};

const norm = (s) => (s ?? "").trim();
const key = (s) => norm(s).toLowerCase();

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function setAlert(message, type=""){
  if (!message){
    els.alert.hidden = true;
    els.alert.className = "alert";
    els.alert.textContent = "";
    return;
  }
  els.alert.hidden = false;
  els.alert.className = `alert ${type}`.trim();
  // allow some bold by inserting as HTML? safer: keep text only
  els.alert.textContent = message;
}

function uniqueStops(){
  const map = new Map();
  for (const r of routes){
    for (const s of r.stops){
      const k = key(s);
      if (k && !map.has(k)) map.set(k, norm(s));
    }
  }
  return [...map.values()].sort((a,b)=>a.localeCompare(b));
}

function buildDatalist(){
  const stops = uniqueStops();
  els.list.innerHTML = stops.map(s => `<option value="${escapeHtml(s)}"></option>`).join("");
}

function buildChips(){
  const stops = uniqueStops().map(s => key(s));
  const common = ["PGI","ISBT-17","ISBT-43","Railway Station","IT Park","Elante Mall","Airport","Manimajra"];
  const available = common.filter(c => stops.includes(key(c)));
  els.chips.innerHTML = available.map(c => `<button class="chip" data-chip="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");

  els.chips.addEventListener("click", (e) => {
    const b = e.target.closest("[data-chip]");
    if (!b) return;
    const v = b.getAttribute("data-chip");
    if (!norm(els.from.value)) els.from.value = v;
    else els.to.value = v;
  });
}

function indexInRoute(route, stop){
  const k = key(stop);
  return route.stops.findIndex(s => key(s) === k);
}

function sliceStops(route, from, to){
  const i = indexInRoute(route, from);
  const j = indexInRoute(route, to);
  if (i === -1 || j === -1) return null;
  if (i === j) return [route.stops[i]];
  if (i < j) return route.stops.slice(i, j+1);
  return route.stops.slice(j, i+1).reverse(); // allow reverse
}

function routesContaining(stop){
  const k = key(stop);
  return routes.filter(r => r.stops.some(s => key(s) === k));
}

function findDirect(from, to){
  const out = [];
  for (const r of routes){
    const seg = sliceStops(r, from, to);
    if (seg) out.push({kind:"Direct", route:r, segments:[seg]});
  }
  return out;
}

function findOneTransfer(from, to){
  const out = [];
  const A = routesContaining(from);
  const B = routesContaining(to);

  for (const r1 of A){
    for (const r2 of B){
      if (r1.id === r2.id) continue;

      const s1 = new Map(r1.stops.map(s => [key(s), s]));
      for (const st of r2.stops){
        const k = key(st);
        if (!s1.has(k)) continue;

        const transfer = s1.get(k);
        if (k === key(from) || k === key(to)) continue;

        const seg1 = sliceStops(r1, from, transfer);
        const seg2 = sliceStops(r2, transfer, to);
        if (!seg1 || !seg2) continue;

        const score = seg1.length + seg2.length;
        out.push({kind:"1 Transfer", routes:[r1,r2], transfer, segments:[seg1,seg2], score});
      }
    }
  }

  // dedupe + sort
  const seen = new Set();
  const uniq = [];
  for (const x of out){
    const k = `${x.routes[0].id}|${x.routes[1].id}|${key(x.transfer)}`;
    if (seen.has(k)) continue;
    seen.add(k);
    uniq.push(x);
  }
  uniq.sort((a,b)=>a.score-b.score);
  return uniq.slice(0,8);
}

function highlightStops(){
  const q = key(els.search.value);
  document.querySelectorAll(".stop").forEach(el => {
    el.classList.toggle("match", q && key(el.dataset.stop).includes(q));
  });
}

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    setAlert("Copied to clipboard.");
    setTimeout(()=>setAlert(""), 1200);
  }catch{
    setAlert("Copy failed (browser permission).", "error");
  }
}

function shareLink(from, to){
  const url = new URL(location.href);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  return url.toString();
}

/* UI render */
function summaryDirect(route, seg){
  return `Direct: ${route.id} — ${route.name}\nStops (${seg.length}):\n${seg.join(" → ")}`;
}
function summaryTransfer(r1, r2, transfer, seg1, seg2){
  return `1 Transfer trip\nLeg 1: ${r1.id} — ${r1.name}\n${seg1.join(" → ")}\nTransfer at: ${transfer}\nLeg 2: ${r2.id} — ${r2.name}\n${seg2.join(" → ")}`;
}

function routeCardDirect(x){
  const r = x.route;
  const seg = x.segments[0];
  const tags = (r.tags?.length ? ` • ${r.tags.join(", ")}` : "");
  const stops = seg.map(s => `<span class="stop" data-stop="${escapeHtml(s)}">${escapeHtml(s)}</span>`).join("");

  const payload = escapeHtml(summaryDirect(r, seg));

  return `
  <article class="routeCard">
    <div class="routeHead">
      <div>
        <div class="badge"><strong>${escapeHtml(r.id)}</strong><span>${escapeHtml(x.kind)}</span></div>
        <div class="metaLine">${escapeHtml(r.name)}${escapeHtml(tags)} • ${seg.length} stops</div>
      </div>
      <div class="actions">
        <button class="iconBtn" data-copy="${payload}" title="Copy this route">Copy</button>
      </div>
    </div>

    <details>
      <summary>
        <div class="summaryRow">
          <b>All stops</b>
          <span>${escapeHtml(seg[0])} → ${escapeHtml(seg[seg.length-1])}</span>
        </div>
      </summary>
      <div class="stops">${stops}</div>
    </details>
  </article>`;
}

function routeCardTransfer(x){
  const [r1,r2] = x.routes;
  const [seg1, seg2] = x.segments;

  const p1 = seg1.map(s => `<span class="stop" data-stop="${escapeHtml(s)}">${escapeHtml(s)}</span>`).join("");
  const p2 = seg2.map(s => `<span class="stop" data-stop="${escapeHtml(s)}">${escapeHtml(s)}</span>`).join("");

  const payload = escapeHtml(summaryTransfer(r1,r2,x.transfer,seg1,seg2));

  return `
  <article class="routeCard">
    <div class="routeHead">
      <div>
        <div class="badge"><strong>${escapeHtml(r1.id)} → ${escapeHtml(r2.id)}</strong><span>${escapeHtml(x.kind)}</span></div>
        <div class="metaLine">Transfer at <b>${escapeHtml(x.transfer)}</b> • ${seg1.length}+${seg2.length} stops</div>
      </div>
      <div class="actions">
        <button class="iconBtn" data-copy="${payload}" title="Copy this route">Copy</button>
      </div>
    </div>

    <details>
      <summary>
        <div class="summaryRow">
          <b>Leg 1 (${escapeHtml(r1.id)})</b>
          <span>${escapeHtml(seg1[0])} → ${escapeHtml(seg1[seg1.length-1])}</span>
        </div>
      </summary>
      <div class="stops">${p1}</div>
    </details>

    <details>
      <summary>
        <div class="summaryRow">
          <b>Leg 2 (${escapeHtml(r2.id)})</b>
          <span>${escapeHtml(seg2[0])} → ${escapeHtml(seg2[seg2.length-1])}</span>
        </div>
      </summary>
      <div class="stops">${p2}</div>
    </details>
  </article>`;
}

function render(from, to){
  const direct = findDirect(from,to);
  const transfer = findOneTransfer(from,to);

  const all = [...direct, ...transfer];
  if (!all.length){
    els.container.innerHTML = "";
    els.meta.textContent = "No routes found (based on current data). Add missing routes in routes.js.";
    setAlert("No routes found. Try different stop spelling or expand route data.", "error");
    els.copyTrip.disabled = true;
    return;
  }

  setAlert("");
  els.copyTrip.disabled = false;
  els.meta.textContent = `${all.length} option(s) found • Direct: ${direct.length} • 1-Transfer: ${transfer.length}`;

  els.container.innerHTML =
    direct.map(routeCardDirect).join("") +
    transfer.map(routeCardTransfer).join("");

  highlightStops();
}

/* Search action */
function run(){
  const from = norm(els.from.value);
  const to = norm(els.to.value);

  if (!from || !to){
    setAlert("Enter both From and To stops.", "error");
    return;
  }

  // URL state
  const url = new URL(location.href);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  history.replaceState({}, "", url);

  render(from,to);
}

/* Init */
function init(){
  // Data status
  if (!routes.length){
    els.status.querySelector("span:last-child").textContent = "No data (edit routes.js)";
    els.status.querySelector(".dot").style.background = "var(--danger)";
    setAlert("Route data is empty. Add routes in routes.js.", "error");
  }

  buildDatalist();
  buildChips();

  // URL params
  const url = new URL(location.href);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  if (from) els.from.value = from;
  if (to) els.to.value = to;
  if (from && to) render(from,to);

  // Events
  els.find.addEventListener("click", run);
  els.swap.addEventListener("click", () => {
    const t = els.from.value;
    els.from.value = els.to.value;
    els.to.value = t;
  });

  els.search.addEventListener("input", highlightStops);

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== els.search){
      e.preventDefault();
      els.search.focus();
    }
    if (e.key === "Enter" && (document.activeElement === els.from || document.activeElement === els.to)){
      run();
    }
  });

  els.share.addEventListener("click", () => {
    const from = norm(els.from.value);
    const to = norm(els.to.value);
    if (!from || !to) return setAlert("Enter From & To first, then share.", "error");
    copyText(shareLink(from,to));
  });

  els.copyTrip.addEventListener("click", () => {
    const from = norm(els.from.value);
    const to = norm(els.to.value);
    if (!from || !to) return;
    const text = `CTU Navigator\nFrom: ${from}\nTo: ${to}\nLink: ${shareLink(from,to)}`;
    copyText(text);
  });

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    copyText(b.getAttribute("data-copy"));
  });
}

init();
