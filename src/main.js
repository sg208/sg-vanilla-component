import { buildStyles, defaultColors } from "./component-styles.js"
import { mountFooter } from "./shared/footer.js"
import { mountTheme } from "./shared/theme.js"
import { renderBillSummary } from "./summary.js"
import { renderBankMark, renderMain, renderPaymentNotAvailable } from "./templates.js"

// ==================================================================
// --------------------------- The plugin ---------------------------
// ==================================================================
const sgvc = ({
  targetEl = "#app",
  colors = {},
  data = { providers: [], options: {} },
  enableCloseOutsideElement = true,
  formMethod = "POST",
}) => {
  const palette = { ...defaultColors, ...colors }
  const options = {
    isError: false,
    locale: "nl-NL",
    currency: "eur",
    ...data.options,
  }
  const state = {
    isPaymentLowerThanMinimum: false,
    isPaymentMoreThanMaximum: false,
    selectedBank: null,
  }
  const placeholderText = "Choose your bank"
  const formAction = new URL("result/", window.location.href).href

  const container = document.querySelector(targetEl)
  const query = (selector) => container.querySelector(selector)

  const formatMoney = (amount) =>
    amount.toLocaleString(options.locale, { style: "currency", currency: options.currency })
  const currencySymbol =
    new Intl.NumberFormat(options.locale, { style: "currency", currency: options.currency })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value ?? ""
  const bigAmount = Math.floor(options.amountToCharge / 100)
  const smallAmount = String(Math.round(options.amountToCharge % 100)).padStart(2, "0")
  const hasMinimumCharge =
    typeof options.minimumCharge === "number" && options.minimumCharge > 0

  // STYLES: one <style> per target, in <head> --------------------
  const styleId = `sgvc-style-${targetEl.replace(/[^\w-]/g, "")}`
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = buildStyles(targetEl, palette)
    document.head.appendChild(style)
  }

  container.innerHTML = options.isError
    ? renderPaymentNotAvailable()
    : renderMain({
        currencySymbol,
        bigAmount,
        smallAmount,
        hasMinimumCharge,
        placeholderText,
        minimumText: hasMinimumCharge ? formatMoney(options.minimumCharge / 100) : "",
        maximumText: formatMoney(options.amountToCharge / 100),
        hiddenFields: {
          amount: options.amountToCharge,
          hash: options.hash,
          tracker: options.tracker,
        },
      })

  if (options.isError) return container

  const trigger = query(".sgvc-selected-provider")
  const triggerText = query(".sgvc-selected-provider-text")
  const findBank = (bankId) => data.providers.find((bank) => bank.id === bankId)

  // SUBMIT BUTTON --------------------
  const renderSubmitButton = () => {
    const button = document.createElement("button")
    button.type = "submit"
    button.className = "sgvc-form-btn-submit sgvc-gap-top"
    button.textContent = "Continue"
    query(".sgvc-payments-container").appendChild(button)
    query("#sgvc-form").setAttribute("method", formMethod)
    query("#sgvc-form").setAttribute("action", formAction)
  }

  // BANK LIST (listbox) --------------------
  const isListOpen = () => Boolean(query(".sgvc-payment-list"))

  const closeList = ({ shouldFocusTrigger = false } = {}) => {
    container.querySelectorAll(".sgvc-payment-list, .sgvc-overlay").forEach((el) => el.remove())
    trigger.setAttribute("aria-expanded", "false")
    if (shouldFocusTrigger) trigger.focus()
  }

  const selectBank = (bankId) => {
    const bank = findBank(bankId)
    if (!bank) return
    state.selectedBank = bankId
    triggerText.innerHTML = `${renderBankMark(bank)}<span>${bank.name}</span>`
    trigger.classList.add("sgvc-selected")
    query("#--sgvc-submit-bank-id").value = bank.id
    if (!query(".sgvc-form-btn-submit")) renderSubmitButton()
  }

  const handleOptionKeydown = (event) => {
    const items = [...container.querySelectorAll(".sgvc-payment-list li")]
    const index = items.indexOf(document.activeElement)
    const focusAt = (next) => items[(next + items.length) % items.length]?.focus()
    const keyActions = {
      ArrowDown: () => focusAt(index + 1),
      ArrowUp: () => focusAt(index - 1),
      Home: () => focusAt(0),
      End: () => focusAt(items.length - 1),
      Escape: () => closeList({ shouldFocusTrigger: true }),
      Enter: () => event.target.click(),
      " ": () => event.target.click(),
    }
    if (event.key === "Tab") {
      closeList()
      return
    }
    const action = keyActions[event.key]
    if (!action) return
    event.preventDefault()
    action()
  }

  const openList = () => {
    const list = document.createElement("ul")
    list.className = "sgvc-payment-list"
    list.setAttribute("role", "listbox")
    list.setAttribute("aria-labelledby", "sgvc-bank-label")
    list.innerHTML = data.providers
      .map(
        (bank) => `
          <li id="${bank.id}" role="option" tabindex="-1" aria-selected="${state.selectedBank === bank.id}">
            ${renderBankMark(bank)}<span>${bank.name}</span>
          </li>`,
      )
      .join("")
    query(".sgvc-payments-container").insertBefore(list, trigger.nextSibling)
    trigger.setAttribute("aria-expanded", "true")

    list.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        selectBank(item.id)
        closeList({ shouldFocusTrigger: true })
      })
    })
    list.addEventListener("keydown", handleOptionKeydown)

    // An overlay lets a click outside the list close it.
    if (enableCloseOutsideElement) {
      const overlay = document.createElement("div")
      overlay.className = "sgvc-overlay"
      overlay.setAttribute("aria-hidden", "true")
      overlay.addEventListener("click", () => closeList())
      container.appendChild(overlay)
    }

    const selected = state.selectedBank && list.querySelector(`[id="${state.selectedBank}"]`)
    ;(selected || list.firstElementChild)?.focus()
  }

  const handleTriggerClick = () => (isListOpen() ? closeList() : openList())

  // AMOUNT CHECKS --------------------
  const setAmountError = (message) => {
    const isInvalid = Boolean(message)
    query("#sgvc-amount-error").textContent = message
    container
      .querySelectorAll("#sgvc-formfield-bigamount, #sgvc-formfield-smallamount")
      .forEach((field) => field.setAttribute("aria-invalid", String(isInvalid)))
    query(".sgvc-amount-only").classList.toggle("sgvc-error-underline", isInvalid)
    container
      .querySelectorAll(".sgvc-amount, .sgvc-amount-only > input")
      .forEach((el) => el.classList.toggle("sgvc-error", isInvalid))
  }

  const resetSelection = () => {
    state.selectedBank = null
    trigger.classList.remove("sgvc-selected")
    triggerText.textContent = placeholderText
    query("#--sgvc-submit-bank-id").removeAttribute("value")
    query(".sgvc-form-btn-submit")?.remove()
    query("#sgvc-form").removeAttribute("method")
    query("#sgvc-form").removeAttribute("action")
  }

  const checkAmount = () => {
    const amount = parseInt(query("#--sgvc-submit-amount").value, 10)
    state.isPaymentLowerThanMinimum = amount < options.minimumCharge
    state.isPaymentMoreThanMaximum = amount > options.amountToCharge
    const isOutOfRange = state.isPaymentLowerThanMinimum || state.isPaymentMoreThanMaximum

    trigger.classList.toggle("sgvc-disabled", isOutOfRange)
    trigger.disabled = isOutOfRange
    if (!isOutOfRange) {
      setAmountError("")
      return
    }

    closeList()
    resetSelection()
    setAmountError(
      state.isPaymentMoreThanMaximum
        ? `You can pay at most ${formatMoney(options.amountToCharge / 100)}. Lower the amount to pick a bank.`
        : `Enter at least ${formatMoney(options.minimumCharge / 100)}. Raise the amount to pick a bank.`,
    )
  }

  // AMOUNT FIELDS --------------------
  const bigField = query("#sgvc-formfield-bigamount")
  const smallField = query("#sgvc-formfield-smallamount")
  const fitBigField = (length) => {
    bigField.style.width = `${Math.max(length, String(bigAmount).length)}ch`
  }

  const handleAmountFocus = (event) => {
    const field = event.target
    field.dataset.originalValue = field.value
    field.value = ""
    query(".sgvc-amount-only").classList.add("sgvc-focus-amount")
  }

  const handleAmountBlur = (event) => {
    const field = event.target
    const isSmallField = field === smallField
    const newValue = field.value || field.dataset.originalValue || ""
    field.value = isSmallField && newValue.length === 1 ? newValue.padStart(2, "0") : newValue
    query(".sgvc-amount-only").classList.remove("sgvc-focus-amount")
    query("#--sgvc-submit-amount").value = `${bigField.value}${smallField.value}`
    if (!isSmallField) fitBigField(bigField.value.length)
    checkAmount()
  }

  const handleSmallInput = () => {
    if (smallField.value.length > 2) smallField.value = smallField.value.slice(0, 2)
  }

  const handleBigInput = () => {
    if (bigField.value.length > 5) bigField.value = bigField.value.slice(0, 5)
    fitBigField(bigField.value.length)
  }

  // EVENTS --------------------
  trigger.addEventListener("click", handleTriggerClick)

  if (hasMinimumCharge) {
    query(".sgvc-btn-edit-amount").addEventListener("click", (event) => {
      event.preventDefault()
      bigField.focus()
    })
    ;[bigField, smallField].forEach((field) => {
      field.addEventListener("focus", handleAmountFocus)
      field.addEventListener("blur", handleAmountBlur)
    })
    smallField.addEventListener("input", handleSmallInput)
    bigField.addEventListener("input", handleBigInput)
  }

  return container
}
// ==================================================================

// ==================================================================
// ---------- MOCK DATA but please maintain objects naming ----------
// ==================================================================
// `imgurl` (optional) shows a logo image; without it the bank gets a
// lettered mark. The old logo host (portal.bp.nu) no longer answers.
const data = {
  providers: [
    { name: "ABN AMRO", id: "ABNANL2A" },
    { name: "ASN Bank", id: "ASNBNL21" },
    { name: "bunq", id: "BUNQNL2A" },
    { name: "Handelsbanken", id: "HANDNL2A" },
    { name: "ING", id: "INGBNL2A" },
    { name: "Knab", id: "KNABNL2H" },
    { name: "Rabobank", id: "RABONL2U" },
    { name: "SNS", id: "SNSBNL2A" },
    { name: "Triodos Bank", id: "TRIONL2U" },
    { name: "Van Lanschot", id: "FVLBNL22" },
  ],
  options: {
    isError: false,
    amountToCharge: 9900, // number, represent cents
    minimumCharge: 8888, // number || null, represent cents
    locale: "nl-NL", // string (optional), default is "nl-NL"
    currency: "eur", // string (optional), default is "eur"
    hash: "xxxxxxxxxxxxxxxxx", // string, apply this to hidden formfield
    tracker: "yyyyyyyyyyyyyyyyy", // string, apply this to hidden formfield
  },
}
// ==================================================================

// ==================================================================
// ----------------------- Invoke the function ----------------------
// ==================================================================
// The demo is static: Cloudflare static assets answer POST with 405, so the
// sample result page is reached with GET.
mountTheme()
sgvc({ targetEl: "#app", data, formMethod: "GET" })
renderBillSummary({ targetEl: "#sgvc-bill", data })
mountFooter()
