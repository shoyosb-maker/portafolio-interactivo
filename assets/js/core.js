/* =========================================================
   CORE — i18n helpers + application state (single source of truth)
   ========================================================= */
(function () {
  const FD = window.FD;

  FD.currentLang = "es";

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
    const label = document.getElementById("lang-label");
    if (label) label.textContent = lang.toUpperCase();
  };
})();