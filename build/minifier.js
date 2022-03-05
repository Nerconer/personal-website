module.exports = (content, type) => {
  let minified = content
  if(type === 'html') {
    minified = content
      .replace(/<!--.*?-->/g,'') // remove comments
      .replace(/>\s*/g,'>') // remove between > and content
      .replace(/\s*</g,'<') // remove between content and <
  } else if (type === 'css') {
    minified = content
      .replace(/\/\*.*?\*\//g, '') // remove comments
      .replace(/,\s*/g, ',')  // between class names separated with , {
      .replace(/\s*\{/g, '{') // between class name and {
      .replace(/\{\s*/g, '{') // between class { and class content start
      .replace(/:\s*/g, ':')  // between attribute: and attribute value
      .replace(/;\s*/g, ';')  // between prev attribute; and next attribute
      .replace(/\}\s*/g, '}') // between end of class and next class
  }
  return minified
}