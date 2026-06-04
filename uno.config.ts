import { defineConfig, presetIcons, presetWind4, transformerDirectives } from 'unocss'

export default defineConfig({
  transformers: [
    transformerDirectives(),
  ],
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      // 额外的CSS属性配置
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
})
