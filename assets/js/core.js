/* =========================================================
   CORE — i18n helpers + application state (single source of truth)
   ========================================================= */
(function () {
  const FD = window.FD;

  FD.currentLang = "es";
  // The inline script in index.html already resolved the stored/system theme before paint.
  FD.theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";

  FD.State = {
    activeIndex: 0,
    isOverview: false,
    activeTab: "areas", // mobile only
    layout: null,       // 'desktop' | 'tablet' | 'mobile'
  };

  FD.t    = (key) => (FD.UI[FD.currentLang] && FD.UI[FD.currentLang][key]) || key;
  FD.item = ()    => FD.DATA[FD.State.activeIndex];
  FD.d    = ()    => FD.item()[FD.currentLang];

  FD.setLang = function (lang) {
    FD.currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang-label]").forEach((node) => {
      node.textContent = lang.toUpperCase();
    });
  };

  /* ---- theme ---- */
  FD.themeIcon = (theme) => (theme === "light" ? "dark_mode" : "light_mode");

  FD.setTheme = function (theme, opts) {
    theme = theme === "light" ? "light" : "dark";
    FD.theme = theme;
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f6f6f7" : "#0b0b0c");

    // The toggle only swaps its glyph, so the layout is never rebuilt mid-transition.
    const label = FD.t(theme === "light" ? "theme.toDark" : "theme.toLight");
    document.querySelectorAll("[data-theme-toggle]").forEach((node) => {
      node.setAttribute("aria-label", label);
      node.setAttribute("title", label);
    });
    document.querySelectorAll("[data-theme-icon]").forEach((node) => {
      node.textContent = FD.themeIcon(theme);
    });

    if (!opts || opts.persist !== false) {
      try { localStorage.setItem("fd-theme", theme); } catch (e) { /* private mode */ }
    }
  };

  FD.toggleTheme = function () {
    FD.setTheme(FD.theme === "light" ? "dark" : "light");
  };
})();