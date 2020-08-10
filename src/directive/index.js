import Vue from 'vue'
import watermark from './watermark'
import scrollbar from './scrollbar'

// register globally
Vue.directive('watermark', watermark)
Vue.directive('scrollbar', scrollbar)
