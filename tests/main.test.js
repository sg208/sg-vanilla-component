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
    expect(query("#sgvc-form").getAttribute("method")).toBe("GET")
    expect(query("#sgvc-form").getAttribute("action")).toMatch(/\/result\/$/)
  })

  it("flags an amount below the minimum and clears it when valid", () => {
    setAmount("50", "00")
    expect(query("#--sgvc-submit-amount").value).toBe("5000")
    const error = query("#sgvc-amount-error")
    expect(error.getAttribute("role")).toBe("alert")
    expect(error.textContent).toContain("Enter at least")
    expect(query("#sgvc-formfield-bigamount").getAttribute("aria-invalid")).toBe("true")
    expect(query(".sgvc-selected-provider").disabled).toBe(true)
    expect(query(".sgvc-selected-provider").classList.contains("sgvc-disabled")).toBe(true)

    setAmount("90", "00")
    expect(query("#sgvc-amount-error").textContent).toBe("")
    expect(query("#sgvc-formfield-bigamount").getAttribute("aria-invalid")).toBe("false")
    expect(query(".sgvc-selected-provider").disabled).toBe(false)
    expect(query(".sgvc-selected-provider").classList.contains("sgvc-disabled")).toBe(false)
  })

  it("flags an amount above the maximum", () => {
    setAmount("120", "00")
    expect(query("#sgvc-amount-error").textContent).toContain("at most")
  })

  it("labels the amount fields", () => {
    expect(query("#sgvc-formfield-bigamount").getAttribute("aria-label")).toBe("Euros")
    expect(query("#sgvc-formfield-smallamount").getAttribute("aria-label")).toBe("Cents")
    expect(query(".sgvc-btn-edit-amount").getAttribute("type")).toBe("button")
  })

  it("exposes the bank picker as a listbox driven by the keyboard", () => {
    const trigger = query(".sgvc-selected-provider")
    expect(trigger.tagName).toBe("BUTTON")
    expect(trigger.getAttribute("aria-haspopup")).toBe("listbox")
    trigger.click()
    expect(trigger.getAttribute("aria-expanded")).toBe("true")
    const list = query(".sgvc-payment-list")
    expect(list.getAttribute("role")).toBe("listbox")
    expect(document.activeElement.id).toBe("ABNANL2A")

    const press = (key) =>
      document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }))
    press("ArrowDown")
    expect(document.activeElement.id).toBe("ASNBNL21")
    press("Enter")
    expect(query("#--sgvc-submit-bank-id").value).toBe("ASNBNL21")
    expect(document.activeElement).toBe(trigger)
    expect(trigger.getAttribute("aria-expanded")).toBe("false")

    trigger.click()
    expect(query('[id="ASNBNL21"]').getAttribute("aria-selected")).toBe("true")
    press("Escape")
    expect(query(".sgvc-payment-list")).toBeNull()
    expect(document.activeElement).toBe(trigger)
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
