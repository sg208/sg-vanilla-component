function sgvc() {
  const container = document.querySelector("#sgvc-about")

  container.innerHTML = renderMain()

  function renderMain() {
    return `<h1>This is a sample of about page.</h1>`
  }

  return container
}

sgvc()
