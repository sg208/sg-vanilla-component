import { beforeEach, describe, expect, it, vi } from "vitest"

const mountComponent = async () => {
  vi.resetModules()
  document.body.innerHTML = '<div id="app"></div>'
  await import("../src/main.js")
}

const query = (selector) => document.querySelector(selector)

const setAmount = (bigAmount, smallAmount) => {
  const bigField = query("#sgvc-formfield-bigamount")
  const smallField = query("#sgvc-formfield-smallamount")
  bigField.dispatchEvent(new Event("focus"))
  bigField.value = bigAmount
  smallField.value = smallAmount
  bigField.dispatchEvent(new Event("blur"))
}

describe("payment component", () => {
  beforeEach(mountComponent)

  it("renders the amount to charge into #app", () => {
    expect(query("#sgvc-form")).not.toBeNull()
    expect(query("#sgvc-formfield-bigamount").value).toBe("99")
    expect(query("#sgvc-formfield-smallamount").value).toBe("00")
    expect(query("#--sgvc-submit-amount").value).toBe("9900")
  })

  it("shows the minimum and maximum amounts", () => {
    const text = query("#app").textContent
    expect(text).toContain("88,88")
    expect(text).toContain("99,00")
  })

  it("selects a bank and shows the submit button", () => {
    query(".sgvc-selected-provider").click()
    const items = document.querySelectorAll(".sgvc-payment-list li")
    expect(items.length).toBeGreaterThan(0)

    query("#INGBNL2A").click()

    expect(query("#--sgvc-submit-bank-id").value).toBe("INGBNL2A")
    expect(query(".sgvc-selected-provider-text").textContent).toContain("ING")
    expect(query(".sgvc-form-btn-submit")).not.toBeNull()
    expect(query(".sgvc-payment-list")).toBeNull()
    expect(query("#sgvc-form").getAttribute("method")).toBe("POST")
  })

  it("flags an amount below the minimum and clears it when valid", () => {
    setAmount("50", "00")
    expect(query("#--sgvc-submit-amount").value).toBe("5000")
    expect(query("sgvcerror")?.textContent).toContain("minimumbedrag")
    expect(query(".sgvc-selected-provider").classList.contains("sgvc-disabled")).toBe(true)

    setAmount("90", "00")
    expect(query("sgvcerror")).toBeNull()
    expect(query(".sgvc-selected-provider").classList.contains("sgvc-disabled")).toBe(false)
  })

  it("flags an amount above the maximum", () => {
    setAmount("120", "00")
    expect(query("sgvcerror")?.textContent).toContain("maximum")
  })
})

describe("static pages", () => {
  it("renders the result page", async () => {
    vi.resetModules()
    document.body.innerHTML = '<div id="sgvc-result"></div>'
    await import("../src/result/result.js")
    expect(query("#sgvc-result h1")?.textContent).toContain("result page")
  })

  it("renders the about page", async () => {
    vi.resetModules()
    document.body.innerHTML = '<div id="sgvc-about"></div>'
    await import("../src/about/about.js")
    expect(query("#sgvc-about h1")?.textContent).toContain("about page")
  })
})
