import { createApp } from 'vue'
import naive, { NDialogProvider } from 'naive-ui'
import App from './App.vue'
import './style.css'

createApp(() => (
  <NDialogProvider>
    <App />
  </NDialogProvider>
)).use(naive).mount('#app')
