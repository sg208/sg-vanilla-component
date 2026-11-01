// Styles and footer for the plain-HTML pages (accessibility, privacy, terms).
import { mountFooter } from "./footer.js"

const pageStyles = `
  body {
    margin: 0;
    background: #ffffff;
    color: #1a1a1a;
  }
  .sgvc-legal {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    max-width: 42rem;
    margin: 0 auto;
    padding: 2rem 1rem 0;
    overflow-wrap: break-word;
  }
  .sgvc-legal h1 {
    color: #7D09DE;
    font-size: 2rem;
    line-height: 1.2;
    margin: 0 0 0.5rem;
  }
  .sgvc-legal h2 {
    font-size: 1.25rem;
    margin: 2rem 0 0.5rem;
  }
  .sgvc-legal a {
    color: #7D09DE;
    text-underline-offset: 0.2em;
  }
  .sgvc-legal a:focus-visible {
    outline: 2px solid #7D09DE;
    outline-offset: 2px;
  }
  .sgvc-legal .sgvc-updated {
    color: #595959;
  }
`

const style = document.createElement("style")
style.textContent = pageStyles
document.head.appendChild(style)

mountFooter()
