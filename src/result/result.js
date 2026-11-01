import { mountFooter } from "../shared/footer.js"
import { mountTheme } from "../shared/theme.js"

const sgvc = () => {
  const container = document.querySelector("#sgvc-result")

  const renderMain = () => `
    <h1>This is a sample result page, not real.</h1>
    <p>The demo form sends its fields here, and nothing reads them. No payment was made.</p>
    <p><a href="/">Back to the payment step</a></p>
  `

  container.innerHTML = renderMain()
  return container
}

mountTheme()
sgvc()
mountFooter()
