const fs = require('fs')
const path = require('path')

const isDirectory = filePath => {
  return fs.lstatSync(filePath).isDirectory()
}

const mkdir = dir => {
  try {
    // eslint-disable-next-line no-octal
    fs.mkdirSync(dir, 0755)
  } catch (error) {
    if (error.code != 'EEXIST') {
      throw error
    }
  }
}

const copyDir = (src, dest) => {
  mkdir(dest)
  let files = fs.readdirSync(src)
  for (const file of files) {
    if (isDirectory(path.join(src, file))) {
      copyDir(`${src}/${file}`, `${dest}/${file}`)
    } else {
      fs.copyFileSync(`${src}/${file}`, `${dest}/${file}`)
    }
  }
}

module.exports = dest => copyDir('assets', dest)