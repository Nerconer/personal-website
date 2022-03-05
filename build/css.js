module.exports = css => html => {
  css = require('./minifier')(css, 'css')
  
  return html
    .replace('{{inline-styles}}', `<style>${css}</style>`)
}