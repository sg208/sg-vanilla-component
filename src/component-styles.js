// Styles for the sgvc() payment component in src/main.js, scoped to its
// target element. Every colour is a CSS value: the defaults read the page
// tokens from src/shared/theme.js and fall back to the light values, so the
// component also works on a page without the theme.
export const defaultColors = {
  primary: "var(--text, #1b1d1f)",
  secondary: "var(--accent, #1d5fd6)",
  tertiary: "var(--muted, #5c6064)",
  error: "var(--negative, #c41c29)",
  disabled: "var(--disabled, #eceff2)",
  disabledText: "var(--disabled-ink, #5c6064)",
}

export const buildStyles = (scope, colors) => `
  ${scope} {
    --sgvc-ink: ${colors.primary};
    --sgvc-accent: ${colors.secondary};
    --sgvc-muted: ${colors.tertiary};
    --sgvc-error: ${colors.error};
    --sgvc-disabled: ${colors.disabled};
    --sgvc-disabled-ink: ${colors.disabledText};
    --sgvc-surface: var(--surface, #ffffff);
    --sgvc-control: var(--control, #8a9096);
    --sgvc-soft: var(--accent-soft, #dcf1ff);
    --sgvc-soft-ink: var(--accent-ink, #0a3a80);
    --sgvc-on-accent: var(--on-accent, #ffffff);
    --sgvc-radius: var(--radius-control, 10px);
    position: relative;
    padding: 24px 20px;
    border-radius: var(--radius-card, 20px);
    background: var(--sgvc-surface);
    color: var(--sgvc-ink);
    font-family: var(--font, system-ui, sans-serif);
    font-size: 16px;
    line-height: 1.5;
  }
  ${scope} h2, ${scope} p { margin: 0; }
  ${scope} .sgvc-gap-top { margin-top: 24px; }
  ${scope} .sgvc-heading h2 {
    font-size: var(--fs-section, 20px);
    font-weight: 600;
    line-height: 1.3;
  }
  ${scope} .sgvc-label {
    display: block;
    color: var(--sgvc-muted);
    font-size: 14px;
    font-weight: 500;
  }

  ${scope} .sgvc-amount {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 8px 12px;
    margin-top: 8px;
  }
  ${scope} .sgvc-amount-only {
    display: inline-flex;
    align-items: flex-start;
    padding-bottom: 4px;
    border-bottom: 2px solid var(--sgvc-control);
    font-size: 40px;
    font-weight: 600;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }
  ${scope} .sgvc-currency { padding-right: 6px; }
  ${scope} .sgvc-amount input,
  ${scope} .sgvc-amount .sgvc-formfield-bigamount,
  ${scope} .sgvc-amount .sgvc-formfield-smallamount {
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    font-variant-numeric: tabular-nums;
    text-align: right;
    -moz-appearance: textfield;
  }
  ${scope} .sgvc-amount input::-webkit-outer-spin-button,
  ${scope} .sgvc-amount input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ${scope} .sgvc-amount .sgvc-formfield-smallamount {
    width: 2.2ch;
    margin-left: 4px;
    color: var(--sgvc-muted);
    font-size: 24px;
    text-align: left;
  }
  ${scope} .sgvc-amount input:focus-visible {
    outline: 2px solid var(--sgvc-accent);
    outline-offset: 2px;
  }
  ${scope} .sgvc-amount .sgvc-focus-amount { border-bottom-color: var(--sgvc-accent); }
  ${scope} .sgvc-btn-edit-amount {
    display: inline-grid;
    place-items: center;
    width: 44px;
    height: 44px;
    margin-bottom: 4px;
    padding: 0;
    border: 1px solid var(--sgvc-control);
    border-radius: var(--sgvc-radius);
    background: var(--sgvc-surface);
    color: var(--sgvc-ink);
    cursor: pointer;
    transition: background-color 120ms ease, transform 120ms ease;
  }
  ${scope} .sgvc-btn-edit-amount:hover { background: var(--sgvc-soft); color: var(--sgvc-soft-ink); }
  ${scope} .sgvc-btn-edit-amount:active { transform: scale(0.96); }
  ${scope} .sgvc-icon-pencil { width: 20px; height: 20px; }
  ${scope} .sgvc-note { margin-top: 12px; color: var(--sgvc-muted); font-size: 14px; }
  ${scope} .sgvc-note strong { color: var(--sgvc-ink); font-weight: 600; font-variant-numeric: tabular-nums; }

  ${scope} .sgvc-error-message:not(:empty) {
    margin-top: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--negative-soft, #ffedea);
    color: var(--negative-ink, #831c1e);
    font-size: 14px;
    font-weight: 500;
  }
  ${scope} .sgvc-error { color: var(--sgvc-error) !important; }
  ${scope} .sgvc-error-underline { border-bottom-color: var(--sgvc-error) !important; }

  ${scope} .sgvc-payments-container { position: relative; }
  ${scope} .sgvc-selected-provider {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 64px;
    margin-top: 8px;
    padding: 8px 52px 8px 12px;
    border: 1px solid var(--sgvc-control);
    border-radius: var(--sgvc-radius);
    background: var(--sgvc-surface);
    color: var(--sgvc-ink);
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: border-color 120ms ease, background-color 120ms ease;
  }
  ${scope} .sgvc-selected-provider:hover { border-color: var(--sgvc-accent); }
  ${scope} .sgvc-selected-provider.sgvc-selected {
    border: 2px solid var(--sgvc-accent);
    padding-left: 11px;
  }
  ${scope} .sgvc-selected-provider.sgvc-disabled,
  ${scope} .sgvc-selected-provider:disabled {
    border-color: var(--sgvc-disabled);
    background: var(--sgvc-disabled);
    color: var(--sgvc-disabled-ink);
    cursor: not-allowed;
  }
  ${scope} .sgvc-selected-provider-text {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
  }
  ${scope} .sgvc-icon-chevron-down {
    position: absolute;
    right: 16px;
    top: 50%;
    width: 20px;
    height: 20px;
    transform: translateY(-50%);
    color: var(--sgvc-muted);
    transition: transform 120ms ease;
  }
  ${scope} .sgvc-selected-provider[aria-expanded="true"] .sgvc-icon-chevron-down {
    transform: translateY(-50%) rotate(180deg);
  }
  ${scope} .sgvc-icon-chevron-down svg { display: block; width: 100%; height: 100%; }

  ${scope} .sgvc-bank-mark {
    flex: none;
    display: inline-grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-chip, 8px);
    background: var(--sgvc-soft);
    color: var(--sgvc-soft-ink);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0;
  }
  ${scope} img.sgvc-bank-mark { object-fit: contain; background: #ffffff; }

  ${scope} .sgvc-payment-list {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 100000001;
    width: 100%;
    max-height: min(26rem, 60vh);
    overflow-y: auto;
    margin: 0;
    padding: 6px;
    list-style: none;
    border: 1px solid var(--border, #e6e6e6);
    border-radius: 14px;
    background: var(--sgvc-surface);
    box-shadow: var(--shadow-float, 0 12px 32px rgba(15, 23, 42, 0.14));
  }
  ${scope} .sgvc-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
  ${scope} .sgvc-payment-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 52px;
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
  ${scope} .sgvc-payment-list li:hover,
  ${scope} .sgvc-payment-list li:focus { background: var(--raised, #f2f8fd); outline: none; }
  ${scope} .sgvc-payment-list li:focus-visible { outline: 2px solid var(--sgvc-accent); outline-offset: -2px; }
  ${scope} .sgvc-payment-list li[aria-selected="true"] { font-weight: 600; }
  ${scope} .sgvc-payment-list li[aria-selected="true"]::after {
    content: "";
    width: 10px;
    height: 10px;
    margin-left: auto;
    border-radius: 50%;
    background: var(--sgvc-accent);
  }

  ${scope} .sgvc-form-btn-submit {
    width: 100%;
    min-height: 52px;
    padding: 12px 16px;
    border: 0;
    border-radius: var(--sgvc-radius);
    background: var(--sgvc-accent);
    color: var(--sgvc-on-accent);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: filter 120ms ease, transform 120ms ease;
  }
  ${scope} .sgvc-form-btn-submit:hover { filter: brightness(0.92); }
  ${scope} .sgvc-form-btn-submit:active { transform: scale(0.99); }
  ${scope} .sgvc-form-btn-submit:focus-visible {
    outline: 2px solid var(--sgvc-accent);
    outline-offset: 3px;
  }

  ${scope} .sgvc-overlay {
    position: fixed;
    inset: 0;
    z-index: 100000000;
  }

  @media (min-width: 640px) {
    ${scope} { padding: 32px; }
  }
  @media (prefers-reduced-motion: reduce) {
    ${scope} *, ${scope} *::before, ${scope} *::after { transition: none !important; }
  }
`
