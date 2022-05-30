// ==================================================================
// --------------------------- The plugin ---------------------------
// ==================================================================
function sgvc({
  targetEl = "#app",
  colors = { primary, secondary, tertiary, error, disabled },
  data = [],
  enableCloseOutsideElement = true,
  sgvcstate = {},
  sgvcform = {},
}) {
  // DEFAULT CONFIG ===========================================
  colors.primary = colors.primary || "#000000"
  colors.secondary = colors.secondary || "#000000"
  colors.tertiary = colors.tertiary || "#666666"
  colors.error = colors.error || "#cc0000"
  colors.disabled = colors.disabled || "#f4f4f4"
  colors.disabledText = colors.disabledText || "#cccccc"
  data.options.isError = data.options.isError || false
  data.options.locale = data.options.locale || "nl-NL"
  data.options.currency = data.options.currency || "eur"
  sgvcstate.isPaymentLowerThanMinimum = false
  sgvcstate.isPaymentMoreThanMaximum = false
  sgvcstate.defaultDropdownNonSelected = "Choose your bank"
  sgvcstate.selectedBank = null
  sgvcform.action = "/result"

  // HELPERS ===========================================
  // Formatted amounts for minimum charge, big and small amount to charge --------------------
  const formattedNumbers = {
    minimum: data.options.minimumCharge / 100,
    charge: data.options.amountToCharge / 100,
    bigAmount: Math.floor(data.options.amountToCharge / 100),
    smallAmount: () => {
      const result = ((data.options.amountToCharge / 100) % 1).toFixed(2) * 100

      return result < 10 ? result.toString().padStart(2, "0") : result
    },
    localeFull: (amount) => {
      return amount.toLocaleString(data.options.locale, {
        style: "currency",
        currency: data.options.currency,
      })
    },
  }

  // Target element #id to load this component to --------------------
  const container = document.querySelector(targetEl)

  // Declare all the styles here --------------------
  const targetElNonHash = () => {
    const regexp = /\B\#\w\w+\b/g
    const findHashChar = targetEl.match(regexp)
    const isHashCharTheFirstChar = targetEl.search(regexp) === 0

    return findHashChar && isHashCharTheFirstChar
      ? targetEl.substring(1)
      : targetEl
  }

  // Getting the currency symbol dynamically
  const localeCurrSymbol = formattedNumbers
    .localeFull(data.options.amountToCharge)
    .substring(0, 1)

  // Check if minimumCharge exists
  const isMinimumCharge =
    typeof data.options.minimumCharge === "number" && data.options.minimumCharge

  // STYLES ===========================================
  const styles = `
     :root {
      --${targetElNonHash()}-border-radius: 0.5rem;
      --${targetElNonHash()}-formfield-width: 25rem;
      --${targetElNonHash()}-border: 2px solid ${colors.tertiary};
      --${targetElNonHash()}-selected: ${colors.disabled};
     }
    
     ${targetEl} div
     , ${targetEl} h2
     , ${targetEl} h3
     , ${targetEl} p
     , ${targetEl} span
     , ${targetEl} a
     , ${targetEl} form
     , ${targetEl} label
     , ${targetEl} button {
       margin: 0;
         padding: 0;
         border: 0;
         font-size: 100%;
         font: inherit;
         vertical-align: baseline;
     }
     ${targetEl} {
       font-family: "Segoe UI";
       font-size: 1rem;
       padding: 1rem;
       line-height: 1.25;
       max-width: 1024px;
       margin: 0 auto;
       text-align: center;
     }
     ${targetEl} .sgvc-gap-top {
        margin-top: 1.5rem;
     }   
  
     ${targetEl} .sgvc-heading h2 {
       color: ${colors.primary};
       font-size: 4.25rem;
     }
     ${targetEl} .sgvc-heading h3 {
       color: ${colors.secondary};
       font-size: 2.25rem;
     }
  
     ${targetEl} .sgvc-amount {
      width: fit-content;
      margin: 0 auto;
     }
     ${targetEl} .sgvc-amount .sgvc-amount-only {
      padding-top: 1rem;
      width: fit-content;
      display: inline-block;
      border-bottom: 2px solid transparent;
     }
     ${targetEl} .sgvc-amount .sgvc-amount-only .sgvc-formfield-bigamount {
      width: ${
        (formattedNumbers.bigAmount.toString().split("").length * 28) / 16
      }rem;
      padding: 0;
      margin: 0;
     }
     ${targetEl} .sgvc-amount .sgvc-amount-only .sgvc-formfield-smallamount {
      width: 1.75rem;
      font-size: 1.625rem;
      vertical-align: top;
      padding: 0 0 0 0.5rem;
      margin: 0;
     }
     ${targetEl} .sgvc-amount .sgvc-focus-amount {
      border-bottom: 2px solid ${colors.secondary};
     }
     ${targetEl} .sgvc-amount, ${targetEl} .sgvc-amount input {
      font-size: 3.125rem;
     }
     ${targetEl} .sgvc-amount input {
      border: 2px solid transparent;
      text-align: right;
      width: auto;
     }
     ${targetEl} .sgvc-amount
     , ${targetEl} .sgvc-amount input
     , ${targetEl} .sgvc-amount input::placeholder {
      color: ${colors.secondary};
      opacity: 1;
    }
     ${targetEl} .sgvc-amount input::-webkit-outer-spin-button
     , ${targetEl} .sgvc-amount input::-webkit-inner-spin-button
     , ${targetEl} .sgvc-amount input[type=number] {
      -webkit-appearance: none;
      -moz-appearance: textfield;
      margin: 0;  
     }
     ${targetEl} .sgvc-amount .sgvc-icon-pencil {
      width: 2.5rem;
      height: 2.5rem;
     }
     ${targetEl} .sgvc-amount input:focus {
      outline: none;
    }
     ${targetEl} .sgvc-btn-edit-amount {
      width: auto; 
      background: none;
      cursor: pointer;
     }
     ${targetEl} .sgvc-payments-container {
      position: relative;
      max-width: var(--${targetElNonHash()}-formfield-width);
      margin-left: auto;
      margin-right: auto;
    }
    ${targetEl} .sgvc-payments-container .sgvc-selected-provider {
      padding: 1.5rem;
      border: var(--${targetElNonHash()}-border);
      border-radius: var(--${targetElNonHash()}-border-radius);
      cursor: pointer;
      position: relative;
    }
    ${targetEl} .sgvc-payments-container .sgvc-selected-provider.sgvc-selected {
      border: 3px solid ${colors.secondary};
      background-color: var(--${targetElNonHash()}-selected);
    }
    ${targetEl} .sgvc-payments-container .sgvc-selected-provider.sgvc-disabled {
      color: ${colors.disabledText};
      cursor: not-allowed !important;
      pointer: all !important;
      border-color: ${colors.disabled};
      background: rgb(102, 102, 102, 0.075);
    }
  
    ${targetEl} .sgvc-payments-container .sgvc-selected-provider.sgvc-disabled svg {
      fill: ${colors.disabled};
    }
  
    ${targetEl} .sgvc-payments-container .sgvc-icon-chevron-down {
      width: 1.75rem;
      padding-right: 1rem;
      padding-left: 1rem;
      height: 100%;
      position: absolute;
      right: 0rem;
      top: 50%;
      transform: translateY(-50%);
      background: rgb(102, 102, 102, 0.25);
      border-top-right-radius: var(--${targetElNonHash()}-border-radius);
      border-bottom-right-radius: var(--${targetElNonHash()}-border-radius);
    }
    ${targetEl} .sgvc-payments-container .sgvc-icon-chevron-down svg {
      width: 100%;
      height: 100%;
      fill: ${colors.tertiary};
    }
    ${targetEl} .sgvc-payments-container .sgvc-payment-list {
      background: #ffffff;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100000001;
      list-style: none;
      padding: 0;
      margin: 0;
      border: var(--${targetElNonHash()}-border);
      border-radius: var(--${targetElNonHash()}-border-radius);
      width: 100%;
      overflow-y: auto;
    }
    ${targetEl} .sgvc-payments-container .sgvc-payment-list li {
      padding: 1.5rem 1rem;
      position: relative;
      cursor: pointer;
    }
    ${targetEl} .sgvc-payments-container .sgvc-payment-list li:hover,
    ${targetEl} .sgvc-payments-container .sgvc-payment-list li:focus,
    ${targetEl} .sgvc-payments-container .sgvc-payment-list li.selected {
      background-color: var(--${targetElNonHash()}-selected);
      border-radius: var(--${targetElNonHash()}-border-radius);
    }
    ${targetEl} .sgvc-payments-container .sgvc-payment-list img
    , ${targetEl} .sgvc-payments-container .sgvc-selected-provider-text img {
      position: absolute;
      width: 40px;
      height: auto;
      top: 50%;
      left: 1rem;
      transform: translateY(-50%);
    }
    ${targetEl} .sgvc-payments-container .sgvc-payment-list span {
      margin-left: 4rem;
    }
  
    ${targetEl} .sgvc-form-btn-submit {
      background-color: ${colors.secondary};
      padding: 1.5rem 1rem;
      border: none;
      border-radius: var(--${targetElNonHash()}-border-radius);
      width: 100%;
      color: #ffffff;
      cursor: pointer;
    }
    
     ${targetEl} .sgvc-overlay {
      position: fixed;
      height: 100%;
      width: 100%;
      z-index: 100000000;
      top: 0;
      left: 0;
      opacity: 1;
    }
  
    ${targetEl} sgvcerror {
      margin: 1rem auto 0;
      padding: 0.5rem 1rem;
      display: block;
      background: ${colors.error};
      width: fit-content;
      border-radius: 0.5rem;
      color: white;
    }
  
    ${targetEl} .sgvc-error {
      color: ${colors.error} !important;
    }
  
    ${targetEl} .sgvc-error-underline {
      border-bottom-color: ${colors.error} !important;
    }
    `

  // Append <style>, last one to load on render --------------------
  setTimeout(function () {
    const innerStyle = document.createElement("style")
    innerStyle.innerHTML = styles
    container.append(innerStyle)
  }, 1)

  // TEMPLATES / MINI COMPONENTS ===========================================
  // Render template --------------------
  container.innerHTML = data.options.isError
    ? renderPaymentNotAvailable()
    : renderMain()

  function renderMain() {
    return `
      <form id="sgvc-form">
        <div class="sgvc-heading">
          <h2>Choose your amount</h2>
          <h3>I will pay:</h3>
        </div>
        <div class="sgvc-amount sgvc-gap-top">
          <div class="sgvc-amount-only">
            ${localeCurrSymbol}
            ${
              isMinimumCharge
                ? renderEditableAmountToCharge()
                : renderNonEditableAmountToCharge()
            }
          </div>
          ${isMinimumCharge ? renderPencilIcon() : ""}
        </div>
        ${isMinimumCharge ? renderMinimumText() : ""}
        <div class="sgvc-payments-container sgvc-gap-top">
          <div class="sgvc-selected-provider" tabindex="0">
            <div class="sgvc-selected-provider-text">${
              sgvcstate.defaultDropdownNonSelected
            }</div>
            <div class="sgvc-icon-chevron-down" role="presentation" aria-hidden="true">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 55.751 55.751" style="enable-background:new 0 0 55.751 55.751;" xml:space="preserve">
                <g>
                  <path d="M31.836,43.006c0.282-0.281,0.518-0.59,0.725-0.912L54.17,20.485c2.107-2.109,2.109-5.528,0-7.638
                    c-2.109-2.107-5.527-2.109-7.638,0l-18.608,18.61L9.217,12.753c-2.109-2.108-5.527-2.109-7.637,0
                    C0.527,13.809-0.002,15.19,0,16.571c-0.002,1.382,0.527,2.764,1.582,3.816l21.703,21.706c0.207,0.323,0.445,0.631,0.729,0.913
                    c1.078,1.078,2.496,1.597,3.91,1.572C29.336,44.604,30.758,44.084,31.836,43.006z"/>
                </g>
              </svg>
              </div>
          </div>
        </div>
        <input type="hidden" id="--sgvc-submit-amount" name="--sgvc-submit-amount" value="${
          data.options.amountToCharge
        }" aria-hidden="true"/>
        <input type="hidden" id="--sgvc-submit-bank-id" name="--sgvc-submit-bank-id" value="" aria-hidden="true"/>
        <input type="hidden" id="--sgvc-submit-hash" name="--sgvc-submit-hash" value="${
          data.options.hash
        }" aria-hidden="true"/>
        <input type="hidden" id="--sgvc-submit-tracker" name="--sgvc-submit-tracker" value="${
          data.options.tracker
        }" aria-hidden="true"/>
      </form>
    `
  }

  function renderPaymentNotAvailable() {
    return `
      <div class="sgvc-heading">
        <h2 class="sgvc-error">Payment not available</h2>
        <p class="sgvc-gap-top">The payment you are trying to access is currently unavailable.</p>
      </div>
      `
  }

  function renderMinimumText() {
    return `
        <p class="sgvc-gap-top">Or click on the pencil to pay part of the amount in advance.<br />(minimum amount: <strong>${formattedNumbers.localeFull(
          data.options.minimumCharge / 100
        )}</strong>, maximum amount: <strong>${formattedNumbers.localeFull(
      data.options.amountToCharge / 100
    )})</strong></p>
      `
  }

  function renderPencilIcon() {
    return `
        <button aria-label="Edit amount" class="sgvc-btn-edit-amount">
          <svg class="sgvc-icon-pencil" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true">
            <g fill="none" fill-rule="evenodd">
              <g fill=${colors.tertiary}>
                <path d="m3 18 12-12 3.0003 3-12 12h-3v-3zm13-13 1.9997-2 3.0003 3-2.001 2.001-2.999-3.001z"/>
              </g>
            </g>
          </svg>
        </button>
      `
  }

  function renderEditableAmountToCharge() {
    return `
        <input id="sgvc-formfield-bigamount"  class="sgvc-formfield-bigamount" autocomplete="off" type="number" value="${
          formattedNumbers.bigAmount
        }" min="0" max="99999" step="1" /><input id="sgvc-formfield-smallamount" class="sgvc-formfield-smallamount" autocomplete="off" type="number" value="${formattedNumbers.smallAmount()}" min="0" max="99" step="1" size="2" />
      `
  }

  function renderNonEditableAmountToCharge() {
    return `
        <span class="sgvc-formfield-bigamount">${formattedNumbers.bigAmount}</span><span class="sgvc-formfield-smallamount">${formattedNumbers.smallAmount}</span>
      `
  }

  function renderSubmitButton() {
    const btn = document.createElement("button")
    btn.setAttribute("type", "submit")
    btn.className = "sgvc-form-btn-submit sgvc-gap-top"
    btn.innerText = "Verder".toUpperCase()

    document.querySelector(".sgvc-payments-container").appendChild(btn)

    setAttributes("#sgvc-form", {
      method: "POST",
      action: sgvcform.action,
    })
  }

  function renderPaymentProvidersList(targetEl) {
    const paymentProvidersList = document.createElement("ul")
    paymentProvidersList.className = "sgvc-payment-list"
    paymentProvidersList.innerHTML = data.providers
      .map((item) => {
        return `
            <li id="${item.id}" class="${
          sgvcstate.selectedBank === item.id ? "selected" : ""
        }">
              <img src="${item.imgurl}" role="presentation">
              <span>${item.name}</span>
            </li>
          `
      })
      .join("")

    document.querySelector(targetEl).appendChild(paymentProvidersList)
  }

  // SPECIAL HANDLER ===========================================
  // Returns container when data.options.isError returns FALSE
  // Preventing event handlers to be declared
  if (data.options.isError) {
    return container
  }

  // METHODS ===========================================
  // Add/remove event listeners for .sgvc-selected-provider element
  function handleDropdownEvent(type) {
    if (type === "add") {
      document
        .querySelector(".sgvc-selected-provider")
        .addEventListener("click", openProvidersDropdown)
      return
    }

    document
      .querySelector(".sgvc-selected-provider")
      .removeEventListener("click", openProvidersDropdown)
  }

  // Set selected item to the trigger element --------------------
  function setSelectedListItem(itemId = null) {
    if (itemId) {
      const selectedItem = data.providers.find((item) => item.id === itemId)

      sgvcstate.selectedBank = itemId

      document.querySelector(".sgvc-selected-provider-text").innerHTML = `
          <img src="${selectedItem.imgurl}" role="presentation">
          <span>${selectedItem.name}</span>
        `
      document
        .querySelectorAll(`.sgvc-selected-provider`)
        .forEach((item) => item.classList.add("sgvc-selected"))

      setAttributes("#--sgvc-submit-bank-id", { value: selectedItem.id })

      // Only render the submit button once for every triggered event
      if (!document.querySelector(".sgvc-form-btn-submit")) {
        renderSubmitButton()
      }

      return
    }

    return null
  }

  // Remove the dropdown --------------------
  function removeProvidersDropdown() {
    const elements = document.querySelectorAll(
      `.sgvc-payment-list ${enableCloseOutsideElement ? ", .sgvc-overlay" : ""}`
    )
    elements.forEach((item) => item.remove())
  }

  // Open the dropdown --------------------
  function openProvidersDropdown() {
    renderPaymentProvidersList(".sgvc-payments-container")

    data.providers.map((item) => {
      document
        .querySelector(`#${item.id}`)
        .addEventListener("click", function () {
          setSelectedListItem(item.id)
          removeProvidersDropdown()
        })
    })

    // Create an overlay elmnt to enable user to click outside the dropdown
    // If false, dropdown will be closed on selected only
    if (enableCloseOutsideElement) {
      const overlay = document.createElement("div")

      overlay.className = "sgvc-overlay"

      container.appendChild(overlay)

      document
        .querySelector(".sgvc-overlay")
        .addEventListener("click", removeProvidersDropdown)
    }
  }

  // Payment related error handler --------------------
  function errorHandlerForPayment() {
    // Changing the state of isPaymentLowerThanMinimum and isPaymentMoreThanMaximum
    sgvcstate.isPaymentLowerThanMinimum =
      parseInt(document.querySelector("#--sgvc-submit-amount").value) <
      data.options.minimumCharge
    sgvcstate.isPaymentMoreThanMaximum =
      parseInt(document.querySelector("#--sgvc-submit-amount").value) >
      data.options.amountToCharge
    sgvcstate.selectedBank = null

    // Toggleing several attributes and classes when error happens
    if (
      sgvcstate.isPaymentLowerThanMinimum ||
      sgvcstate.isPaymentMoreThanMaximum
    ) {
      document
        .querySelector(".sgvc-selected-provider")
        .classList.add("sgvc-disabled")

      document
        .querySelector(".sgvc-selected-provider")
        .removeAttribute("tabindex")

      handleDropdownEvent("remove")
    } else {
      document
        .querySelector(".sgvc-selected-provider")
        .classList.remove("sgvc-disabled")

      setAttributes(".sgvc-selected-provider", { tabindex: 0 })

      handleDropdownEvent("add")
    }

    if (
      isMinimumCharge &&
      (sgvcstate.isPaymentLowerThanMinimum ||
        sgvcstate.isPaymentMoreThanMaximum)
    ) {
      // remove submit button if exists
      if (document.querySelector(".sgvc-form-btn-submit")) {
        document.querySelector(".sgvc-form-btn-submit").remove()
      }

      // remove selected payment provider if exists
      if (document.querySelector(".sgvc-selected-provider")) {
        document
          .querySelector(".sgvc-selected-provider")
          .classList.remove("sgvc-selected")

        document.querySelector(".sgvc-selected-provider-text").innerHTML =
          sgvcstate.defaultDropdownNonSelected

        document.querySelectorAll("#--sgvc-submit-bank-id").forEach((el) => {
          el.removeAttribute("value")
        })

        removeAttributes("#sgvc-form", ["method", "action"])
      }

      const errEl = document.createElement("sgvcerror")

      errEl.textContent = sgvcstate.isPaymentMoreThanMaximum
        ? `U kunt alleen betalen tot het maximum van ${formattedNumbers.localeFull(
            data.options.amountToCharge / 100
          )}`
        : `Voer het minimumbedrag in van  ${formattedNumbers.localeFull(
            data.options.minimumCharge / 100
          )}`

      const sgvcerrorEl = document.querySelector("sgvcerror")
      if (
        sgvcerrorEl &&
        (sgvcstate.isPaymentLowerThanMinimum ||
          sgvcstate.isPaymentMoreThanMaximum)
      ) {
        sgvcerrorEl.remove()
      }

      document
        .querySelector(".sgvc-amount")
        .insertAdjacentElement("afterend", errEl)

      document
        .querySelectorAll(
          ".sgvc-amount, .sgvc-amount-only, .sgvc-amount-only>input"
        )
        .forEach((el) => {
          if (el.attributes.class.value === "sgvc-amount-only") {
            el.classList.add("sgvc-error-underline")
            return
          }

          el.classList.add("sgvc-error")
        })

      return
    }

    // deleting the error if the number is between min and mix
    if (
      isMinimumCharge &&
      !sgvcstate.isPaymentLowerThanMinimum &&
      !sgvcstate.isPaymentMoreThanMaximum &&
      document.querySelector("sgvcerror")
    ) {
      document.querySelector("sgvcerror").remove()

      document
        .querySelectorAll(
          ".sgvc-amount, .sgvc-amount-only, .sgvc-amount-only>input"
        )
        .forEach((el) => {
          el.classList.remove("sgvc-error")
          el.classList.remove("sgvc-error-underline")
        })

      return
    }
  }

  // Add attributes to an element
  function setAttributes(targetEl, attributes) {
    Object.keys(attributes).forEach((attr) => {
      document.querySelector(targetEl).setAttribute(attr, attributes[attr])
    })
  }

  // Remove attributes to an element
  function removeAttributes(targetEl, attributes) {
    attributes.forEach((attr) => {
      document.querySelector(targetEl).removeAttribute(attr)
    })
  }

  // EVENTS ===========================================
  // Event listener to open the providers drowdown --------------------
  handleDropdownEvent("add")

  // Event listener when minimum charge exists --------------------
  if (isMinimumCharge) {
    // Pencil icon to edit big/small amount --------------------
    document
      .querySelector(".sgvc-btn-edit-amount")
      .addEventListener("click", function (event) {
        event.preventDefault()
        document.querySelector("#sgvc-formfield-bigamount").focus()
      })

    document
      .querySelectorAll(
        "#sgvc-formfield-smallamount, #sgvc-formfield-bigamount"
      )
      .forEach((el) => {
        el.addEventListener("focus", function () {
          // Big/Small amount formfield, clear when focused
          this.originalValue = this.value
          this.newValue = this.value
          this.value = ""

          // Add/remove underline when focused
          document
            .querySelector(".sgvc-amount-only")
            .classList.add("sgvc-focus-amount")
        })

        el.addEventListener("blur", function () {
          // Big/Small amount formfield, returns value when blurred, prev or new value
          this.newValue = this.value || this.originalValue

          // Add leading zero if user only enters one char for the small amount
          if (
            el.attributes.id.value === "sgvc-formfield-smallamount" &&
            this.newValue.length === 1 &&
            parseFloat(this.newValue) < 10
          ) {
            this.newValue = this.value.padStart(2, "0")
          }

          // Return the value attr with updated value
          this.value = this.newValue

          // Remove underline when the big/small amount is blurred
          document
            .querySelector(".sgvc-amount-only")
            .classList.remove("sgvc-focus-amount")

          // Updating the hidden formfield for the actual vale for API
          document.querySelector("#--sgvc-submit-amount").value = [
            document.querySelector("#sgvc-formfield-bigamount").value,
            document.querySelector("#sgvc-formfield-smallamount").value,
          ].join("")

          errorHandlerForPayment()
        })

        // Making sure users only enter 2 digit number for cents
        if (el.attributes.id.value === "sgvc-formfield-smallamount") {
          el.addEventListener("keyup", function (event) {
            const enteredVal = this.value

            if (enteredVal.length > 2) {
              this.value = enteredVal.slice(0, 2)
              return
            }

            this.value = enteredVal
          })
        }

        if (el.attributes.id.value === "sgvc-formfield-bigamount") {
          el.addEventListener("keyup", function (event) {
            const enteredVal = this.value

            // Auto adjust the el width based on bigamount as entered
            this.style.width = `${
              ((enteredVal.length <=
              formattedNumbers.bigAmount.toString().length
                ? formattedNumbers.bigAmount.toString().length
                : enteredVal.length) *
                28) /
              16
            }rem`

            // Keeping the it max at 5 characters
            if (enteredVal.length > 5) {
              this.value = enteredVal.slice(0, 5)
              return
            }

            this.value = parseInt(enteredVal, 10)
          })
        }
      })
  }

  // Enable enter/spacebar keyboard key to open the dropdown
  document
    .querySelector(".sgvc-selected-provider")
    .addEventListener("keyup", function (event) {
      if (event.which === 13 || event.which === 32) {
        openProvidersDropdown()

        // console.log(document.querySelector(".sgvc-payment-list").children[0].id)

        const firstChild = document.querySelector(
          `#${document.querySelector(".sgvc-payment-list").children[0].id}`
        )
        firstChild.setAttribute("tabindex", 0)
        firstChild.focus()
        return
      }
    })

  // Returns component --------------------
  return container
}
// ==================================================================

// ==================================================================
// ---------- MOCK DATA but please maintain objects naming ----------
// ==================================================================
const data = {
  providers: [
    {
      name: "ABN AMRO",
      id: "ABNANL2A",
      imgurl: "https://portal.bp.nu/img/banks/ABNANL2A.png",
    },
    {
      name: "ASN Bank",
      id: "ASNBNL21",
      imgurl: "https://portal.bp.nu/img/banks/ASNBNL21.png",
    },
    {
      name: "bunq",
      id: "BUNQNL2A",
      imgurl: "https://portal.bp.nu/img/banks/BUNQNL2A.png",
    },
    {
      name: "Handelsbanken",
      id: "HANDNL2A",
      imgurl: "https://portal.bp.nu/img/banks/HANDNL2A.png",
    },
    {
      name: "ING",
      id: "INGBNL2A",
      imgurl: "https://portal.bp.nu/img/banks/INGBNL2A.png",
    },
    {
      name: "Knab",
      id: "KNABNL2H",
      imgurl: "https://portal.bp.nu/img/banks/KNABNL2H.png",
    },
    {
      name: "Rabobank",
      id: "RABONL2U",
      imgurl: "https://portal.bp.nu/img/banks/RABONL2U.png",
    },
    {
      name: "SNS",
      id: "SNSBNL2A",
      imgurl: "https://portal.bp.nu/img/banks/SNSBNL2A.png",
    },
    {
      name: "Triodos Bank",
      id: "TRIONL2U",
      imgurl: "https://portal.bp.nu/img/banks/TRIONL2U.png",
    },
    {
      name: "Van Lanschot",
      id: "FVLBNL22",
      imgurl: "https://portal.bp.nu/img/banks/FVLBNL22.png",
    },
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
sgvc({
  targetEl: "#app",
  colors: {
    primary: "#7D09DE",
    secondary: "#CC16F5",
  },
  data: data,
})
