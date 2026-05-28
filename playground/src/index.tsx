import naive, { NDialogProvider } from 'naive-ui'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(() => (
  <NDialogProvider>
    <App />
  </NDialogProvider>
)).use(naive).mount('#app')
