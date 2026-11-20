const KEY = "theme";
const root = document.documentElement;
const btn = document.querySelector("[data-theme-toggle]");
const meta = document.querySelector('meta[name="theme-color"]');
const isLight = () => root.getAttribute("data-theme") === "light";

/** Point the browser UI colour (meta theme-color) at the current page background. */
function syncThemeColor() {
  const bg = getComputedStyle(root).getPropertyValue("--nocturne-bg").trim();
  if (meta && bg) meta.setAttribute("content", bg);
}

syncThemeColor();

if (btn) {
  btn.hidden = false;
  btn.addEventListener("click", () => {
    // dark is the default, so going back to it clears the stored choice
    if (isLight()) {
      root.removeAttribute("data-theme");
      try { localStorage.removeItem(KEY); } catch {}
    } else {
      root.setAttribute("data-theme", "light");
      try { localStorage.setItem(KEY, "light"); } catch {}
    }
    syncPressed();
    syncThemeColor();
  });

  syncPressed();
}

/** aria-pressed is true while the dark theme is in effect. */
function syncPressed() {
  btn.setAttribute("aria-pressed", String(!isLight()));
}
