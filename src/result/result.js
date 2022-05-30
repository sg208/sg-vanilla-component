function sgvc() {
  const container = document.querySelector("#sgvc-result")

  container.innerHTML = renderMain()

  function renderMain() {
    return `<h1>This is a sample result page, not real.</h1>`
  }

  return container
}

sgvc()
