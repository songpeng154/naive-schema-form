import TwoslashFloating from '@shikijs/vitepress-twoslash/client'
import NaiveUIContainer from 'vitepress-plugin-demo/client/naive-ui'
import Theme from 'vitepress/theme'
import '@shikijs/vitepress-twoslash/style.css'

// Import naive-schema-form styles
import 'naive-schema-form/style.css'

// 拦截 NaiveUIContainer (index.vue) 的 props，并在其中声明 typescriptHtml 和 javascriptHtml，
// 这样 Vue 在编译/透传属性时，会识别这些属性，从而避免 "Extraneous non-props attributes" 警告
if (NaiveUIContainer) {
  const targetComponent = (NaiveUIContainer as any).default || NaiveUIContainer
  if (targetComponent.props) {
    if (Array.isArray(targetComponent.props)) {
      targetComponent.props.push('typescriptHtml', 'javascriptHtml')
    } else {
      targetComponent.props.typescriptHtml = { type: String }
      targetComponent.props.javascriptHtml = { type: String }
    }
  }
}



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

    // 重写 app.component，拦截 demo-container 及其内部子组件的注册，或者在 Vue 运行时重载 warnHandler 来彻底屏蔽此警告
    const originalWarnHandler = app.config.warnHandler
    app.config.warnHandler = (msg, instance, trace) => {
      if (msg.includes('Extraneous non-props attributes') && (msg.includes('typescriptHtml') || msg.includes('javascriptHtml'))) {
        return // 屏蔽该第三方插件产生的多余属性警告
      }
      if (originalWarnHandler) {
        originalWarnHandler(msg, instance, trace)
      } else {
        console.warn(`[Vue warn]: ${msg}${trace}`)
      }
    }

    app.use(NaiveUIContainer, {
      github: 'https://github.com/songpeng154/naive-schema-form/blob/main/',
    })
  },
}


