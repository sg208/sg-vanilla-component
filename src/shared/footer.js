// Shared site footer: injects its own styles (CSS in JS, like src/main.js)
// and appends a <footer> landmark to <body>. Colours come from the tokens in
// src/shared/theme.js.
const REPO_URL = "https://github.com/sg208/sg-vanilla-component"

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/accessibility/", label: "Accessibility" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
]

const footerStyles = `
  .sgvc-footer {
    width: 100%;
    max-width: 1100px;
    margin: 64px auto 0;
    padding: 24px 16px 32px;
    color: var(--muted, #5c6064);
    font-size: var(--fs-small, 14px);
    line-height: 1.5;
  }
  .sgvc-footer-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border, #e6e6e6);
  }
  .sgvc-footer p { margin: 0; }
  .sgvc-footer ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 4px 20px;
  }
  .sgvc-footer a {
    display: inline-flex;
    align-items: center;
    min-height: 32px;
    color: var(--text, #1b1d1f);
    text-decoration-color: var(--control, #8a9096);
  }
  .sgvc-footer a:hover { color: var(--accent, #1d5fd6); }
  .sgvc-footer a[aria-current="page"] { font-weight: 600; text-decoration: none; }
  @media (min-width: 640px) {
    .sgvc-footer { padding: 24px 32px 40px; }
  }
`

const currentPath = () => window.location.pathname.replace(/index\.html$/, "")

const renderLinks = () =>
  footerLinks
    .map(({ href, label }) => {
      const current = currentPath() === href ? ' aria-current="page"' : ""
      return `<li><a href="${href}"${current}>${label}</a></li>`
    })
    .join("")

export const mountFooter = () => {
  if (document.querySelector(".sgvc-footer")) return

  const style = document.createElement("style")
  style.textContent = footerStyles
  document.head.appendChild(style)

  const footer = document.createElement("footer")
  footer.className = "sgvc-footer"
  footer.innerHTML = `
    <div class="sgvc-footer-inner">
      <p>sg-vanilla-component, a demo payment step. No real payments.</p>
      <nav aria-label="Site">
        <ul>
          ${renderLinks()}
          <li><a href="${REPO_URL}">Source on GitHub</a></li>
        </ul>
      </nav>
    </div>
  `
  document.body.appendChild(footer)
  return footer
}
