import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it, vi } from "vitest"

const srcDir = resolve(import.meta.dirname, "../src")
const pages = [
  { name: "home", html: "index.html", script: "../src/main.js" },
  { name: "result", html: "result/index.html", script: "../src/result/result.js" },
  { name: "about", html: "about/index.html", script: "../src/about/about.js" },
  {
    name: "accessibility",
    html: "accessibility/index.html",
    script: "../src/shared/legal-page.js",
  },
  { name: "privacy", html: "privacy/index.html", script: "../src/shared/legal-page.js" },
  { name: "terms", html: "terms/index.html", script: "../src/shared/legal-page.js" },
]

const loadPage = async ({ html, script }) => {
  vi.resetModules()
  const page = new DOMParser().parseFromString(
    readFileSync(resolve(srcDir, html), "utf8"),
    "text/html",
  )
  page.querySelectorAll("script").forEach((tag) => tag.remove())
  document.head.innerHTML = page.head.innerHTML
  document.body.innerHTML = page.body.innerHTML
  await import(script)
}

describe.each(pages)("$name page", (page) => {
  it("has exactly one h1, the landmarks and a skip link to main", async () => {
    await loadPage(page)
    expect(document.querySelectorAll("h1").length).toBe(1)
    expect(document.querySelectorAll("header").length).toBe(1)
    expect(document.querySelectorAll("main").length).toBe(1)
    expect(document.querySelectorAll("footer").length).toBe(1)
    const skip = document.body.firstElementChild
    expect(skip.getAttribute("href")).toBe("#main")
    expect(document.querySelector("main").id).toBe("main")
  })

  it("mounts the footer with the legal links and the GitHub repo icon", async () => {
    await loadPage(page)
    const hrefs = [...document.querySelectorAll("footer a")].map((link) =>
      link.getAttribute("href"),
    )
    expect(hrefs).toEqual(
      expect.arrayContaining([
        "/accessibility/",
        "/privacy/",
        "/terms/",
        "https://github.com/sg208/sg-vanilla-component",
      ]),
    )
  })

  it("loads no web fonts from a CDN", () => {
    const source = readFileSync(resolve(srcDir, page.html), "utf8")
    expect(source).not.toMatch(/fonts\.(googleapis|gstatic)\.com/)
  })
})
