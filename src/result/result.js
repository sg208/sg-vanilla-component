import { mountFooter } from "../shared/footer.js"
import { mountTheme } from "../shared/theme.js"

const sgvc = () => {
  const container = document.querySelector("#sgvc-result")

  const renderMain = () => `
    <h1>Sample result page</h1>
    <p>The demo form sent its fields here. Nothing reads them, and no payment was made.</p>
    <p><a href="/">Back to the payment step</a></p>
  `

  container.innerHTML = renderMain()
  return container
}

mountTheme()
sgvc()
mountFooter()
