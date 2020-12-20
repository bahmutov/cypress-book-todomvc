// @ts-check
const { registerPlugin } = require('cypress-book')
const mdPreprocessor = require('cypress-markdown-preprocessor')

module.exports = (on, config) => {
  on('file:preprocessor', mdPreprocessor)
  registerPlugin(on, config)
}
