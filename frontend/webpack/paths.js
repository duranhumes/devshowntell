const { normalize, resolve, join } = require('path')

const basePath = normalize(resolve(__dirname, '..'))
const buildPath = normalize(join(basePath, 'public'))
const entryPath = normalize(join(basePath, 'src', 'root.tsx'))
const htmlPath = normalize(join(basePath, 'public', 'index.html'))
const templatePath = normalize(
    join(basePath, 'src', 'templates', 'index.html.ejs')
)

module.exports = { basePath, buildPath, entryPath, htmlPath, templatePath }
