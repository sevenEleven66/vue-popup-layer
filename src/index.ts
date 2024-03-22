import Popup from './components/Popup.vue'
import type { App } from 'vue'

// 导出组件
export { Popup }

// 导出 install 函数,用于 Vue 应用程序的插件安装
export const install = (app: App) => {
  app.component('Popup', Popup)
}

// 默认导出组件
export default {
  install,
  Popup,
}