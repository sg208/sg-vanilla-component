// Shared look for every page: self-hosted Manrope, colour tokens (light and
// dark follow the system setting), the base reset, the skip link and the
// site header. Styles are CSS in JS, like the component in src/main.js.
import "@fontsource-variable/manrope/wght.css"

const themeStyles = `
  :root {
    color-scheme: light dark;
    --font: "Manrope Variable", "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;
    --ground: #f3f5f7;
    --surface: #ffffff;
    --raised: #f2f8fd;
    --border: #e6e6e6;
    --rule: #eef0f2;
    --control: #8a9096;
    --text: #1b1d1f;
    --muted: #5c6064;
    --accent: #1d5fd6;
    --on-accent: #ffffff;
    --accent-soft: #dcf1ff;
    --accent-ink: #0a3a80;
    --negative: #c41c29;
    --negative-soft: #ffedea;
    --negative-ink: #831c1e;
    --disabled: #eceff2;
    --disabled-ink: #5c6064;
    --shadow-float: 0 12px 32px rgba(15, 23, 42, 0.14);
    --radius-card: 20px;
    --radius-control: 10px;
    --radius-chip: 8px;
    --gap: 24px;
    --pad: 24px;
    --fs-title: 28px;
    --fs-section: 20px;
    --fs-kpi: 32px;
    --fs-body: 16px;
    --fs-small: 14px;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --ground: #0f1113;
      --surface: #181b1f;
      --raised: #1f242b;
      --border: #2c3036;
      --rule: #24282d;
      --control: #7d848c;
      --text: #f1f3f5;
      --muted: #a8adb3;
      --accent: #7eb0ff;
      --on-accent: #0b1b33;
      --accent-soft: #15294a;
      --accent-ink: #cfe2ff;
      --negative: #ff8a8f;
      --negative-soft: #3a1518;
      --negative-ink: #ffc2c0;
      --disabled: #22262b;
      --disabled-ink: #a8adb3;
      --shadow-float: 0 12px 32px rgba(0, 0, 0, 0.5);
    }
  }
  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--ground);
    color: var(--text);
    font-family: var(--font);
    font-size: var(--fs-body);
    line-height: 1.5;
    overflow-wrap: break-word;
  }
  main { flex: 1 0 auto; }
  main:focus { outline: none; }
  a { color: var(--accent); text-underline-offset: 0.2em; }
  a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .sgvc-skip {
    position: absolute;
    left: 16px;
    top: -100px;
    z-index: 1000;
    padding: 10px 16px;
    border-radius: var(--radius-control);
    background: var(--accent);
    color: var(--on-accent);
    font-weight: 600;
    text-decoration: none;
  }
  .sgvc-skip:focus { top: 16px; }
  .sgvc-header {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px 16px 0;
  }
  .sgvc-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    color: var(--text);
    font-weight: 600;
    text-decoration: none;
  }
  .sgvc-brand-mark {
    display: inline-grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-chip);
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-size: var(--fs-small);
    font-weight: 700;
  }
  .sgvc-brand:hover .sgvc-brand-name { text-decoration: underline; }
  .sgvc-shell {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px 16px 0;
  }
  .sgvc-shell h1 {
    margin: 0;
    font-size: var(--fs-title);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  .sgvc-lede { margin: 8px 0 0; max-width: 34rem; color: var(--muted); }
  .sgvc-pay {
    display: grid;
    gap: var(--gap);
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "intro" "pay" "bill";
  }
  .sgvc-intro { grid-area: intro; }
  .sgvc-pay #app { grid-area: pay; }
  .sgvc-pay #sgvc-bill { grid-area: bill; }
  .sgvc-card {
    padding: 24px 20px;
    border-radius: var(--radius-card);
    background: var(--surface);
  }
  .sgvc-card p { margin: 12px 0 0; }
  @media (min-width: 640px) {
    .sgvc-header { padding: 32px 32px 0; }
    .sgvc-shell { padding: 32px 32px 0; }
    .sgvc-card { padding: 32px; }
  }
  @media (min-width: 900px) {
    .sgvc-pay {
      grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
      grid-template-rows: auto 1fr;
      grid-template-areas: "intro pay" "bill pay";
      align-items: start;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`

export const mountTheme = () => {
  if (document.querySelector("style[data-sgvc-theme]")) return
  const style = document.createElement("style")
  style.dataset.sgvcTheme = ""
  style.textContent = themeStyles
  document.head.prepend(style)
}
