// Markup for the sgvc() payment component in src/main.js.
const chevronIcon = `
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path d="m5 7.5 5 5 5-5" />
  </svg>`

const pencilIcon = `
  <svg class="sgvc-icon-pencil" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path d="M13.5 3.5 16.5 6.5 7 16H4v-3z" /><path d="m11.5 5.5 3 3" />
  </svg>`

const initialsOf = (name) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

export const renderBankMark = (bank) =>
  bank.imgurl
    ? `<img class="sgvc-bank-mark" src="${bank.imgurl}" alt="" width="40" height="40" />`
    : `<span class="sgvc-bank-mark" aria-hidden="true">${initialsOf(bank.name)}</span>`

const renderEditableAmount = ({ bigAmount, smallAmount }) => `
  <input id="sgvc-formfield-bigamount" class="sgvc-formfield-bigamount" type="number" inputmode="numeric"
    autocomplete="off" value="${bigAmount}" min="0" max="99999" step="1" style="width: ${String(bigAmount).length}ch"
    aria-label="Euros" aria-describedby="sgvc-amount-note sgvc-amount-error" />
  <input id="sgvc-formfield-smallamount" class="sgvc-formfield-smallamount" type="number" inputmode="numeric"
    autocomplete="off" value="${smallAmount}" min="0" max="99" step="1" size="2"
    aria-label="Cents" aria-describedby="sgvc-amount-note sgvc-amount-error" />`

const renderFixedAmount = ({ bigAmount, smallAmount }) => `
  <span class="sgvc-formfield-bigamount">${bigAmount}</span><span class="sgvc-formfield-smallamount">${smallAmount}</span>`

const renderPencilButton = () => `
  <button type="button" class="sgvc-btn-edit-amount" aria-label="Edit amount">${pencilIcon}</button>`

const renderMinimumText = ({ minimumText, maximumText }) => `
  <p id="sgvc-amount-note" class="sgvc-note">
    Pay it all now, or use the pencil to pay part of it.
    Minimum <strong>${minimumText}</strong>, maximum <strong>${maximumText}</strong>.
  </p>`

export const renderMain = (view) => `
  <form id="sgvc-form">
    <div class="sgvc-heading">
      <h2>Choose your amount</h2>
    </div>
    <div class="sgvc-gap-top" role="group" aria-labelledby="sgvc-amount-label">
      <span id="sgvc-amount-label" class="sgvc-label">I will pay</span>
      <div class="sgvc-amount">
        <div class="sgvc-amount-only">
          <span class="sgvc-currency" aria-hidden="true">${view.currencySymbol}</span>
          ${view.hasMinimumCharge ? renderEditableAmount(view) : renderFixedAmount(view)}
        </div>
        ${view.hasMinimumCharge ? renderPencilButton() : ""}
      </div>
      <p id="sgvc-amount-error" class="sgvc-error-message" role="alert"></p>
      ${view.hasMinimumCharge ? renderMinimumText(view) : ""}
    </div>
    <div class="sgvc-payments-container sgvc-gap-top">
      <span id="sgvc-bank-label" class="sgvc-label">Bank</span>
      <button type="button" class="sgvc-selected-provider" aria-haspopup="listbox" aria-expanded="false"
        aria-labelledby="sgvc-bank-label sgvc-selected-provider-text" aria-describedby="sgvc-amount-error">
        <span id="sgvc-selected-provider-text" class="sgvc-selected-provider-text">${view.placeholderText}</span>
        <span class="sgvc-icon-chevron-down" aria-hidden="true">${chevronIcon}</span>
      </button>
    </div>
    <input type="hidden" id="--sgvc-submit-amount" name="--sgvc-submit-amount" value="${view.hiddenFields.amount}" />
    <input type="hidden" id="--sgvc-submit-bank-id" name="--sgvc-submit-bank-id" value="" />
    <input type="hidden" id="--sgvc-submit-hash" name="--sgvc-submit-hash" value="${view.hiddenFields.hash}" />
    <input type="hidden" id="--sgvc-submit-tracker" name="--sgvc-submit-tracker" value="${view.hiddenFields.tracker}" />
  </form>`

export const renderPaymentNotAvailable = () => `
  <div class="sgvc-heading">
    <h2 class="sgvc-error">Payment not available</h2>
    <p class="sgvc-gap-top">The payment you are trying to access is currently unavailable.</p>
  </div>`
