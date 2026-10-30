/* =========================================================
   APP — orchestrator: state mutations + layout switching + keybindings
   ========================================================= */
(function () {
  const FD = window.FD;
  const { State } = FD;

  /* ---- state mutations ---- */
  FD.setDiscipline = function (idx) {
    idx = ((idx % FD.DATA.length) + FD.DATA.length) % FD.DATA.length;
    if (idx === State.activeIndex) return;
    const from = State.activeIndex;
    State.activeIndex = idx;
    State.isOverview = false;
    FD.syncAll();
    // Central morph: plays the service→service clip, or its reverse when navigating back.
    // Without a clip for this pair, any clip still resting on the core is cleared.
    if (!FD.playCoreTransition || !FD.playCoreTransition(from, idx)) {
      if (FD.stopCoreTransition) FD.stopCoreTransition();
      if (FD.clearCoreRest) FD.clearCoreRest();
    }
  };

  FD.toggleOverview = function () {
    State.isOverview = !State.isOverview;
    if (FD.stopCoreTransition) FD.stopCoreTransition();
    if (FD.clearCoreRest) FD.clearCoreRest();
    FD.syncAll();
  };

  FD.setTab = function (tab) {
    State.activeTab = tab;
    if (State.layout === "mobile" && FD.MobileLayout) FD.MobileLayout.renderTab();
  };

  /* ---- re-render current layout ---- */
  FD.syncAll = function () {
    const L = State.layout;
    if (L === "desktop" && FD.DesktopLayout) FD.DesktopLayout.sync();
    else if (L === "tablet" && FD.TabletLayout) FD.TabletLayout.sync();
    else if (L === "mobile" && FD.MobileLayout) FD.MobileLayout.sync();
  };

  /* ---- master render ---- */
  FD.render = function () {
    const layout = FD.detectLayout();
    // A re-render rebuilds the core markup, so any in-flight morph clip goes with it.
    if (FD.stopCoreTransition) FD.stopCoreTransition();
    State.layout = layout;

    ["desktop", "tablet", "mobile"].forEach((l) => {
      const node = document.getElementById("layout-" + l);
      if (l === layout) {
        node.classList.add("active");
        node.style.display = "flex";
        if (l === "desktop")      FD.DesktopLayout.render();
        else if (l === "tablet")  FD.TabletLayout.render();
        else                      FD.MobileLayout.render();
      } else {
        node.classList.remove("active");
        node.style.display = "none";
      }
    });

    // Put the last resting frame back on the freshly rendered core.
    if (FD.restoreCoreRestState) FD.restoreCoreRestState();
  };

  /* ---- boot ---- */
  document.addEventListener("DOMContentLoaded", () => {
    // Delegated so both toggles keep working after any layout re-render.
    document.addEventListener("click", (e) => {
      if (e.target.closest(".theme-toggle")) {
        FD.toggleTheme();
        return;
      }
      if (!e.target.closest(".lang-toggle")) return;
      FD.setLang(FD.currentLang === "es" ? "en" : "es");
      FD.render();
    });

    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        const newL = FD.detectLayout();
        if (newL !== State.layout) FD.render();
        else FD.syncAll();
      }, 120);
    });

    window.addEventListener("keydown", (e) => {
      const modalOpen = !!document.getElementById("modal-backdrop");
      if (e.key === "Escape") {
        if (modalOpen) FD.closeModal();
        else FD.toggleOverview();
        return;
      }
      if (modalOpen) return;
      if (e.key === "ArrowRight") FD.setDiscipline(State.activeIndex + 1);
      if (e.key === "ArrowLeft")  FD.setDiscipline(State.activeIndex - 1);
    });

    FD.render();
  });
})();