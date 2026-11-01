import { mountFooter } from "../shared/footer.js"
import { mountTheme } from "../shared/theme.js"

const sgvc = () => {
  const container = document.querySelector("#sgvc-about")

  const renderMain = () => `
    <h1>This is a sample of about page.</h1>
    <p>sg-vanilla-component is a payment step built in plain JavaScript, with no framework.</p>
    <p><a href="/">Try the payment step</a></p>
  `

  container.innerHTML = renderMain()
  return container
}

mountTheme()
sgvc()
mountFooter()
