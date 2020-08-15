<template>
  <page-container>
    <editor height="100%" style="padding-bottom: 20px;" />
  </page-container>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/vue-editor'
export default {
  name: 'markdown-editor',
  components: {
    editor: Editor
  }
}
</script>

<style></style>
