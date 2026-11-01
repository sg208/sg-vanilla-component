// Shared site footer: injects its own styles (CSS in JS, like src/main.js)
// and appends a <footer> landmark to <body>.
const REPO_URL = "https://github.com/sg208/sg-vanilla-component"

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/accessibility/", label: "Accessibility" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
]

const footerStyles = `
  .sgvc-footer {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #595959;
    max-width: 1024px;
    margin: 3rem auto 0;
    padding: 1.5rem 1rem 2rem;
    border-top: 1px solid #dddddd;
    text-align: center;
  }
  .sgvc-footer ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem 1.25rem;
  }
  .sgvc-footer a {
    color: #7D09DE;
    text-underline-offset: 0.2em;
    display: inline-block;
    padding: 0.25rem 0;
  }
  .sgvc-footer a:focus-visible {
    outline: 2px solid #7D09DE;
    outline-offset: 2px;
  }
`

const renderLinks = () =>
  footerLinks
    .map(({ href, label }) => `<li><a href="${href}">${label}</a></li>`)
    .join("")

export const mountFooter = () => {
  if (document.querySelector(".sgvc-footer")) return

  const style = document.createElement("style")
  style.textContent = footerStyles
  document.head.appendChild(style)

  const footer = document.createElement("footer")
  footer.className = "sgvc-footer"
  footer.innerHTML = `
    <nav aria-label="Site">
      <ul>
        ${renderLinks()}
        <li><a href="${REPO_URL}">Source on GitHub</a></li>
      </ul>
    </nav>
  `
  document.body.appendChild(footer)
  return footer
}
