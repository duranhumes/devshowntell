require('dotenv-safe/config')

const { createServer } = require('http')
const { normalize, join } = require('path')

const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const compression = require('compression')

const basePath = normalize(__dirname)
const publicPath = normalize(join(basePath, 'public'))
const htmlPath = join(publicPath, 'index.html')

morgan.token('id', req => req.ip)
const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time'

const app = express()

const port = process.env.APP_PORT
app.set('port', port)

app.disable('x-powered-by')
app.use(compression())
app.use(helmet())
app.use(
    morgan(loggerFormat, {
        stream: process.stderr,
    })
)

app.use(express.static(publicPath))
app.use('*', (_, res) => {
    res.sendFile(htmlPath)
})

const noContentUrls = ['/favicon.ico', '/robots.txt']
noContentUrls.forEach(url => {
    app.all(url, (_, res) => res.sendStatus(204))
})

const server = createServer(app)
server.listen(port, () => console.log(`Server Running on port ${port}`))
