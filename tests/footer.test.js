import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { beforeEach, describe, expect, it, vi } from "vitest"
import viteConfig from "../vite.config.js"

const srcDir = resolve(import.meta.dirname, "../src")
const legalPages = ["accessibility", "privacy", "terms"]

const parsePage = (name) => {
  const html = readFileSync(resolve(srcDir, name, "index.html"), "utf8")
  return new DOMParser().parseFromString(html, "text/html")
}

describe("footer", () => {
  beforeEach(async () => {
    vi.resetModules()
    document.head.innerHTML = ""
    document.body.innerHTML = '<div id="sgvc-about"></div>'
    await import("../src/about/about.js")
  })

  it("renders one footer with the legal page links", () => {
    const footers = document.querySelectorAll("footer")
    expect(footers.length).toBe(1)
    const hrefs = [...footers[0].querySelectorAll("a")].map((link) => link.getAttribute("href"))
    expect(hrefs).toEqual(expect.arrayContaining(["/accessibility/", "/privacy/", "/terms/"]))
  })

  it("links to the GitHub repo once, as a labelled icon that opens a new tab", () => {
    const githubLinks = document.querySelectorAll('footer a[href*="github.com"]')
    expect(githubLinks.length).toBe(1)
    const repoLink = githubLinks[0]
    expect(repoLink.getAttribute("href")).toBe("https://github.com/sg208/sg-vanilla-component")
    expect(repoLink.getAttribute("aria-label")).toBe("Source code on GitHub (opens in a new tab)")
    expect(repoLink.textContent.trim()).toBe("")
    expect(repoLink.getAttribute("target")).toBe("_blank")
    expect(repoLink.getAttribute("rel")).toBe("noopener noreferrer")
    const icon = repoLink.querySelector("svg")
    expect(icon?.getAttribute("aria-hidden")).toBe("true")
    expect(icon?.getAttribute("focusable")).toBe("false")
  })

  it("does not add a second footer when mounted twice", async () => {
    const { mountFooter } = await import("../src/shared/footer.js")
    mountFooter()
    expect(document.querySelectorAll("footer").length).toBe(1)
  })
})

describe("legal pages", () => {
  it.each(legalPages)("%s page has lang, one h1, main and a unique title", (name) => {
    const page = parsePage(name)
    expect(page.documentElement.lang).toBe("en")
    expect(page.querySelectorAll("h1").length).toBe(1)
    expect(page.querySelector("main")).not.toBeNull()
    expect(page.title).toMatch(/sg-vanilla-component/)
  })

  it("gives each legal page a different title", () => {
    const titles = new Set(legalPages.map((name) => parsePage(name).title))
    expect(titles.size).toBe(legalPages.length)
  })

  it("registers every legal page as a build input", () => {
    const inputs = viteConfig.build.rollupOptions.input
    legalPages.forEach((name) => expect(inputs[name]).toContain(`${name}/index.html`))
  })
})
