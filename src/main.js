// src/main.js
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apollo'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { vLazy } from './directives/vLazy.js'
import './assets/tailwind.css'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.directive('lazy', vLazy)
app.mount('#app')