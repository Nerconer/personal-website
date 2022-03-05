const fs = require('fs')

const replace = (data, template) => {
  for (const element in data) {
    /*if (Array.isArray(element)) {
      template = replace(element, template)
    }*/
    let target = new RegExp(`{{${element}}}`, 'g')
    template = template.replace(target, data[element])
  }
  return template
}

module.exports = templateName => templateData => html => {
  const listItemData = JSON.parse(fs.readFileSync(`data/${templateData}.json`).toString())
  const baseTemplate = fs.readFileSync(`templates/${templateName}.html`).toString()

  let generatedTemplateContent = listItemData.map(itemData => {    
    let template = baseTemplate
    
    template = replace(itemData, template)
    
    return template
  })
    .join('')

  return html
    .replace(`{{${templateData}}}`, generatedTemplateContent)
}