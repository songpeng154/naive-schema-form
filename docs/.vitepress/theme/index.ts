import TwoslashFloating from '@shikijs/vitepress-twoslash/client'
import NaiveUIContainer from 'vitepress-plugin-demo/client/naive-ui'
import Theme from 'vitepress/theme'
import '@shikijs/vitepress-twoslash/style.css'

// Import naive-schema-form styles
import 'naive-schema-form/style.css'

export default {
  ...Theme,
  async enhanceApp({ app, router, siteData }) {
    if (!import.meta.env.SSR) {
      const { default: NaiveUI } = await import('naive-ui')
      app.use(NaiveUI)

      // Import and setup naive-schema-form globally if needed
      const { createNaiveSchemaForm } = await import('naive-schema-form')
      app.use(createNaiveSchemaForm())
    }

    app.use(TwoslashFloating)
    app.use(NaiveUIContainer, {
      github: 'https://github.com/songpeng154/naive-schema-form/blob/main/',
    })
  },
}
