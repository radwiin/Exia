module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 150,
        endOfLine: 'auto', // 兼容CRLF与LF换行
        singleQuote: true, // 单引号
        trailingComma: 'none', // 数组尾逗号
        semi: false, // 行末分号
        bracketSpacing: true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
        jsxBracketSameLine: true, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
        alwaysParens: 'always', // 为单行箭头函数的参数添加圆括号
        ignoreWhenBindingPresent: false

      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-components': 'off', // 关闭未使用组件验证
    'no-unused-vars': 'off' // 关闭未使用变量验证
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
