/* =========================================================
   MOBILE LAYOUT — satellite orbit + tactile sheet + bottom nav
   ========================================================= */
(function () {
  const FD = window.FD;
  const { $, $$, el, t, item, d, State } = FD;

  function render() {
    const root = document.getElementById("layout-mobile");
    root.className = "layout active flex-col h-[100dvh] w-screen overflow-hidden bg-[#131313] text-[#e5e2e1] font-sans";

    root.innerHTML = `
      <header class="shrink-0 bg-[#131313]/85 backdrop-blur-xl border-b border-surf3/40 z-40">
        <div class="h-13 px-4 flex items-center justify-between py-2">
          <div class="flex items-center gap-2">
            <img src="assets/img/logo-mark.png" alt="" class="h-6 w-6 shrink-0 select-none" draggable="false" />
            <span class="font-display text-[16px] tracking-tight text-white uppercase font-bold">FUNDASERINCO</span>
            <span class="px-2 py-0.5 bg-surf3/90 border border-outlinev/30 rounded-full font-mono text-[10px] text-onvar uppercase" id="m-badge">—</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="px-2.5 py-1 bg-surf2/90 rounded-full flex items-center gap-1.5 border border-outlinev/20">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span class="font-mono text-[10px] text-white font-medium uppercase" id="m-pill">—</span>
            </div>
            <button class="w-8 h-8 rounded-full bg-surf3/70 flex items-center justify-center text-onvar" data-action="open-modal">
              <span class="material-symbols-outlined text-[17px]">folder_open</span>
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 flex flex-col justify-between relative w-full px-4 pt-2 pb-24 overflow-hidden">
        <div class="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.09)_0%,transparent_68%)]"></div>

        <div class="pt-1 flex items-center justify-between z-10">
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 bg-white animate-ping rounded-full"></span>
            <span class="font-mono text-[10px] text-onvar uppercase tracking-widest" id="m-code">—</span>
          </div>
          <div class="px-2 py-0.5 bg-surf3/80 rounded-full font-mono text-[10px] text-white border border-outlinev/30">
            <span class="text-white font-semibold" id="m-active-idx">—</span> / 07 CORE
          </div>
        </div>

        <div class="relative w-full flex items-center justify-center my-auto py-2 z-10" id="m-stage">
          <button class="absolute left-1 z-20 w-8 h-8 bg-surf1/90 border border-outlinev/30 rounded-full flex items-center justify-center text-white spr" data-action="prev">
            <span class="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
          <div class="relative w-48 h-48 flex items-center justify-center">
            <svg class="absolute inset-0 w-full h-full pointer-events-none m-spin-slow" viewBox="0 0 192 192">
              <circle cx="96" cy="96" fill="none" r="91" stroke="#444748" stroke-dasharray="2.5,7" stroke-width="0.9"></circle>
              <circle cx="96" cy="96" fill="none" r="80" stroke="#353534" stroke-dasharray="1.5,10" stroke-width="0.5"></circle>
              <line stroke="#c4c7c8" stroke-width="1.2" x1="96" x2="96" y1="2" y2="9"></line>
              <line stroke="#c4c7c8" stroke-width="1.2" x1="190" x2="183" y1="96" y2="96"></line>
              <line stroke="#c4c7c8" stroke-width="1.2" x1="96" x2="96" y1="190" y2="183"></line>
              <line stroke="#c4c7c8" stroke-width="1.2" x1="2" x2="9" y1="96" y2="96"></line>
            </svg>
            <svg class="absolute inset-2 w-44 h-44 pointer-events-none m-spin-rev" viewBox="0 0 176 176">
              <circle cx="88" cy="88" fill="none" r="74" stroke="#8e9192" stroke-dasharray="3,8" stroke-opacity="0.5" stroke-width="0.75"></circle>
              <circle cx="88" cy="88" fill="none" r="60" stroke="#353534" stroke-opacity="0.7" stroke-width="0.75"></circle>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="w-full h-px bg-outlinev/20"></div>
              <div class="h-full w-px bg-outlinev/20 absolute"></div>
            </div>
            <div class="absolute inset-0 pointer-events-auto" id="m-satellites"></div>
            <button class="relative w-32 h-32 bg-[#0e0e0e]/95 rounded-full border border-outlinev/40 overflow-hidden flex flex-col items-center justify-center p-2 spr z-10" id="m-core">
              <div class="absolute inset-0 bg-surf3/30 opacity-70"></div>
              <img class="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-35" id="m-core-img" src="" />
              <div class="relative z-10 flex flex-col items-center text-center px-1">
                <span class="font-mono text-onvar tracking-widest text-[9px] uppercase" id="m-subcode">—</span>
                <span class="font-display text-[16px] text-white tracking-tight uppercase leading-tight font-bold" id="m-title">—</span>
                <div class="mt-1 flex items-center gap-1 px-2 py-0.5 bg-surf4/95 border border-outlinev/30 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span class="font-mono text-white text-[9px] font-semibold tracking-wider">AUDITABLE</span>
                </div>
              </div>
              <div class="absolute bottom-1 font-mono text-onvar text-[7.5px] tracking-wider opacity-60">${t("mobile.tapExplore")}</div>
            </button>
          </div>
          <button class="absolute right-1 z-20 w-8 h-8 bg-surf1/90 border border-outlinev/30 rounded-full flex items-center justify-center text-white spr" data-action="next">
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div class="w-full z-10 shrink-0 my-1">
          <div class="flex items-center gap-1.5 overflow-x-auto no-sb py-0.5" id="m-pills"></div>
        </div>

        <div class="bg-surf1/95 border border-outlinev/35 backdrop-blur-xl rounded-xl p-2.5 shadow-2xl flex flex-col gap-1.5 relative overflow-hidden z-10 shrink-0">
          <div class="flex items-center justify-between pb-0.5">
            <div class="flex flex-col min-w-0 pr-2">
              <div class="flex items-center gap-1.5">
                <span class="font-mono text-white text-[12px] font-semibold" id="m-sheet-id">—</span>
                <span class="font-display text-[15px] text-white tracking-tight truncate font-bold" id="m-sheet-title">—</span>
              </div>
              <span class="font-mono text-onvar text-[9px] truncate" id="m-sheet-sub">—</span>
            </div>
            <button class="shrink-0 px-2 py-1 bg-surf4 border border-outlinev/40 rounded-lg text-white flex items-center gap-1 spr" data-action="open-modal">
              <span class="material-symbols-outlined text-[14px] text-white">description</span>
              <span class="font-mono text-[9.5px] font-medium">${t("mobile.dossier")}</span>
            </button>
          </div>
          <div class="grid grid-cols-3 bg-[#0e0e0e]/90 p-0.5 rounded-lg text-center border border-outlinev/30">
            <button class="py-1 rounded-md font-mono text-[9.5px] bg-surf3 text-white shadow-sm font-medium" data-mtab="areas">${t("mobile.tabs.areas")} (6)</button>
            <button class="py-1 rounded-md font-mono text-[9.5px] text-onvar" data-mtab="times">${t("mobile.tabs.times")}</button>
            <button class="py-1 rounded-md font-mono text-[9.5px] text-onvar" data-mtab="scope">${t("mobile.tabs.scope")}</button>
          </div>
          <div class="min-h-[88px] max-h-[96px] flex flex-col justify-center overflow-hidden" id="m-tab-content"></div>
        </div>

        <div class="w-full z-10 flex flex-col gap-1.5 shrink-0 pt-1">
          <div class="flex items-center justify-between text-[9.5px] font-mono text-onvar px-1">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>${t("mobile.auditISO")}</span>
            <span class="text-white font-mono font-medium">COLOMBIA / LATAM</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button class="py-2 bg-surf2 border border-outlinev/40 rounded-lg flex items-center justify-center gap-1.5 text-white spr" data-action="open-modal">
              <span class="material-symbols-outlined text-[16px] text-white">folder_special</span>
              <span class="font-mono text-[10px] tracking-wide uppercase font-semibold">${t("mobile.certificates")}</span>
            </button>
            <a class="py-2 bg-white text-[#2f3131] rounded-lg flex items-center justify-center gap-1.5 spr font-semibold" href="https://wa.me/573046814396?text=Hola%20Fundaserinco" target="_blank" rel="noopener noreferrer">
              <span class="material-symbols-outlined text-[16px]">send</span>
              <span class="font-mono text-[10px] tracking-wide uppercase">${t("mobile.quoteNow")}</span>
            </a>
          </div>
        </div>
      </main>
    `;

    wire();
    sync();
  }

  function wire() {
    $$("#layout-mobile [data-action]").forEach((b) => {
      const act = b.getAttribute("data-action");
      if (act === "open-modal") b.addEventListener("click", () => FD.openModal());
      else if (act === "next")  b.addEventListener("click", () => FD.setDiscipline(State.activeIndex + 1));
      else if (act === "prev")  b.addEventListener("click", () => FD.setDiscipline(State.activeIndex - 1));
    });
    $$("#layout-mobile [data-mtab]").forEach((b) => {
      b.addEventListener("click", () => FD.setTab(b.getAttribute("data-mtab")));
    });
    const core = $("#m-core");
    if (core) core.addEventListener("click", () => FD.openModal());

    // Swipe
    let sx = 0;
    const stage = $("#m-stage");
    stage.addEventListener("touchstart", (e) => { sx = e.changedTouches[0].screenX; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].screenX - sx;
      if (Math.abs(diff) > 35) {
        FD.setDiscipline(diff > 0 ? State.activeIndex - 1 : State.activeIndex + 1);
      }
    }, { passive: true });
  }

  function sync() {
    const it = item();
    const loc = d();

    $("#m-badge").textContent = `DISC ${it.id}/07`;
    $("#m-pill").textContent = it.short;
    $("#m-code").textContent = `FND // ${it.code}`;
    $("#m-active-idx").textContent = it.id;
    $("#m-subcode").textContent = `SYS // ${it.id}`;
    $("#m-title").textContent = it.short;
    $("#m-core-img").src = it.image;

    $("#m-sheet-id").textContent = it.id;
    $("#m-sheet-title").textContent = loc.name;
    $("#m-sheet-sub").textContent = `FUNDASERINCO // ${loc.category}`;

    $("#m-pills").innerHTML = FD.DATA.map((s, i) => {
      const isA = i === State.activeIndex;
      return `
        <button class="px-2.5 py-1 rounded-full whitespace-nowrap font-mono text-[9.5px] spr shrink-0 border ${
          isA ? "bg-white text-[#2f3131] font-bold border-white" : "bg-surf3/70 text-onvar border-outlinev/30"
        }" data-mpill="${i}">${s.id} ${s.short}</button>
      `;
    }).join("");
    $$("#m-pills button").forEach((b) => b.addEventListener("click", () => FD.setDiscipline(parseInt(b.getAttribute("data-mpill"), 10))));

    const activePill = $(`#m-pills [data-mpill="${State.activeIndex}"]`);
    if (activePill) activePill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

    renderTab();
    layoutSatellites();
  }

  function renderTab() {
    const cont = $("#m-tab-content");
    if (!cont) return;
    const loc = d();
    let html = "";

    if (State.activeTab === "areas") {
      html = `<div class="grid grid-cols-2 gap-1 m-fade-in">
        ${loc.specialties.slice(0, 6).map((s) => `
          <div class="bg-[#0e0e0e]/80 px-2 py-1 rounded flex items-center gap-1.5 border border-outlinev/20">
            <span class="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0"></span>
            <span class="text-[10px] text-[#e5e2e1] truncate leading-tight">${s}</span>
          </div>
        `).join("")}
      </div>`;
    } else if (State.activeTab === "times") {
      html = `<div class="flex flex-col gap-1 m-fade-in">
        ${loc.phases.map((p) => `
          <div class="flex items-center justify-between px-2 py-1 bg-[#0e0e0e]/80 rounded border border-outlinev/20">
            <span class="text-[10px] text-white font-medium">${p.name}</span>
            <span class="px-1.5 py-0.5 bg-surf4 rounded font-mono text-white text-[9px]">${p.time}</span>
          </div>
        `).join("")}
      </div>`;
    } else {
      html = `<div class="px-2 py-1.5 bg-[#0e0e0e]/80 border border-outlinev/20 rounded flex flex-col gap-1 m-fade-in">
        <div class="flex items-center gap-1 text-white">
          <span class="material-symbols-outlined text-[14px]">verified</span>
          <span class="font-mono text-[9px] uppercase font-semibold">${t("mobile.sheet.scopeHeader")}</span>
        </div>
        <p class="text-[10.5px] text-onvar leading-tight line-clamp-3">${loc.verificationDesc}</p>
      </div>`;
    }
    cont.innerHTML = html;

    $$("#layout-mobile [data-mtab]").forEach((b) => {
      const active = b.getAttribute("data-mtab") === State.activeTab;
      b.className = active
        ? "py-1 rounded-md font-mono text-[9.5px] bg-surf3 text-white shadow-sm font-semibold"
        : "py-1 rounded-md font-mono text-[9.5px] text-onvar";
    });
  }

  function layoutSatellites() {
    const cont = $("#m-satellites");
    if (!cont) return;
    cont.innerHTML = "";
    const total = FD.DATA.length;
    const radius = 80;
    const cx = 96, cy = 96;

    FD.DATA.forEach((serv, i) => {
      const angle = ((i * 360 / total) - 90) * (Math.PI / 180);
      const x = Math.round(cx + radius * Math.cos(angle) - 12);
      const y = Math.round(cy + radius * Math.sin(angle) - 12);
      const isA = i === State.activeIndex;
      const btn = el("button", {
        class: `absolute w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9.5px] spr transition-all ${
          isA ? "m-breathe bg-white text-[#2f3131] font-bold z-20" : "bg-surf3/90 text-onvar border border-outlinev/30 hover:text-white"
        } mb${i % 7}`,
        style: `left:${x}px;top:${y}px;`,
      });
      btn.textContent = (i + 1).toString().padStart(2, "0");
      btn.addEventListener("click", () => FD.setDiscipline(i));
      cont.appendChild(btn);
    });
  }

  FD.MobileLayout = { render, sync, renderTab };
})();