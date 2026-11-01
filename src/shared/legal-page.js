// Styles and footer for the plain-HTML pages (accessibility, privacy, terms).
import { mountFooter } from "./footer.js"
import { mountTheme } from "./theme.js"

const pageStyles = `
  .sgvc-legal {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px 16px 0;
  }
  .sgvc-legal > * { max-width: 42rem; }
  .sgvc-legal h1 {
    margin: 0;
    font-size: var(--fs-title);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  .sgvc-legal h2 {
    margin: 32px 0 8px;
    font-size: var(--fs-section);
    font-weight: 600;
    line-height: 1.3;
  }
  .sgvc-legal p, .sgvc-legal ul { margin: 0 0 12px; }
  .sgvc-legal ul { padding-left: 1.25rem; }
  .sgvc-legal li + li { margin-top: 6px; }
  .sgvc-legal .sgvc-updated { margin: 4px 0 24px; color: var(--muted); font-size: var(--fs-small); }
  @media (min-width: 640px) {
    .sgvc-legal { padding: 32px 32px 0; }
  }
`

mountTheme()

const style = document.createElement("style")
style.textContent = pageStyles
document.head.appendChild(style)

mountFooter()
