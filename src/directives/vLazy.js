// src/directives/vLazy.js
export const vLazy = {
  mounted(el) {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.src = el.dataset.src
        io.disconnect()
      }
    })
    io.observe(el)
  }
}