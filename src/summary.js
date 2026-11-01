// "Your bill" card beside the payment component. Every figure is computed
// from the same data object the component uses.
const summaryStyles = `
  .sgvc-bill {
    padding: 24px 20px;
    border-radius: var(--radius-card, 20px);
    background: var(--surface, #ffffff);
  }
  .sgvc-bill h2 {
    margin: 0;
    font-size: var(--fs-section, 20px);
    font-weight: 600;
    line-height: 1.3;
  }
  .sgvc-bill dl { margin: 16px 0 0; }
  .sgvc-bill-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    padding: 12px 0;
    border-top: 1px solid var(--rule, #eef0f2);
  }
  .sgvc-bill-row:first-child { border-top: 0; padding-top: 0; }
  .sgvc-bill dt { color: var(--muted, #5c6064); }
  .sgvc-bill dd {
    margin: 0;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
  .sgvc-bill-row:first-child dd { font-size: var(--fs-kpi, 32px); letter-spacing: -0.02em; line-height: 1.2; }
  .sgvc-bill h3 { margin: 24px 0 0; font-size: 16px; font-weight: 600; }
  .sgvc-bill ol { margin: 8px 0 0; padding-left: 1.25rem; }
  .sgvc-bill li + li { margin-top: 4px; }
  @media (min-width: 640px) {
    .sgvc-bill { padding: 32px; }
  }
`

export const renderBillSummary = ({ targetEl, data }) => {
  const container = document.querySelector(targetEl)
  const { options } = data
  if (!container || options.isError) return container

  const locale = options.locale ?? "nl-NL"
  const currency = options.currency ?? "eur"
  const formatCents = (cents) =>
    (cents / 100).toLocaleString(locale, { style: "currency", currency })
  const hasMinimumCharge = typeof options.minimumCharge === "number" && options.minimumCharge > 0
  const laterCents = hasMinimumCharge ? options.amountToCharge - options.minimumCharge : 0

  const style = document.createElement("style")
  style.textContent = summaryStyles
  document.head.appendChild(style)

  container.classList.add("sgvc-bill")
  container.innerHTML = `
    <h2 id="sgvc-bill-title">Your bill</h2>
    <dl>
      <div class="sgvc-bill-row"><dt>Full amount</dt><dd>${formatCents(options.amountToCharge)}</dd></div>
      ${
        hasMinimumCharge
          ? `<div class="sgvc-bill-row"><dt>Least you can pay now</dt><dd>${formatCents(options.minimumCharge)}</dd></div>
             <div class="sgvc-bill-row"><dt>Most you can leave for later</dt><dd>${formatCents(laterCents)}</dd></div>`
          : ""
      }
      <div class="sgvc-bill-row"><dt>Banks to choose from</dt><dd>${data.providers.length}</dd></div>
    </dl>
    <h3>How it works</h3>
    <ol>
      <li>Keep the full amount, or edit it within the limits.</li>
      <li>Pick your bank from the list.</li>
      <li>Continue to the sample result page. No money moves.</li>
    </ol>
  `
  return container
}
