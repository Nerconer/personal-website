const fs = require('fs')

const outputFolder = 'dist'

require('./build/copy-assets')(outputFolder)

let html = fs.readFileSync('index.html').toString()
let css = fs.readFileSync('index.css').toString()

const templates = require('./build/templates')

html = require('./build/css.js')(css)(html)

html = templates('project-item-template')('project-list')(html)
html = templates('generic-template')('side-project-list')(html)
html = templates('education-template')('education-list')(html)
html = templates('social-media-item-template')('social-media-list')(html)


html = require('./build/minifier')(html, 'html')


require('./build/robots')()

fs.writeFileSync(`${outputFolder}/index.html`, html)
