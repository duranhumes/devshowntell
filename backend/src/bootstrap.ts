import { createServer } from 'http'
import { normalize, join, resolve } from 'path'

import { createDirIfNotExists } from './utils'
import logging, { consoleLog } from './utils/logging'

const appName = String(process.env.APP_NAME)
const port = Number(process.env.APP_PORT)

consoleLog('Booting %s', appName)

let httpServer = createServer()
async function main() {
    const basePath = normalize(resolve(__dirname, '..'))
    const logsDir = normalize(join(basePath, 'logs'))
    createDirIfNotExists(logsDir)

    setImmediate(() => {
        const app = require('./server').default
        app.set('port', port)
        httpServer = createServer(app)
        httpServer.listen(port)
        httpServer.on('error', onError)

        const io = require('socket.io')(httpServer)
        io.on('connection', () => console.log('[socket] connected'))
        app.set('io', io)

        consoleLog('%s is ready for use on port %s', appName, port)
    })
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
    switch (error.code) {
        case 'EACCES':
            consoleLog('%s requires elevated privileges', bind)
            break
        case 'EADDRINUSE':
            consoleLog('%s is already in use', bind)
            break
        default:
            throw error
    }

    process.exit(1)
}

process.on(
    'uncaughtException',
    (exception: NodeJS.ErrnoException): void => {
        logging.error(exception)
        consoleLog('uncaughtException %s', exception.toString())
        process.exit(1)
    }
)

process.on(
    'unhandledRejection',
    (reason: any, promise: any): void => {
        logging.error({ promise, reason })
        consoleLog(
            'unhandledRejection %s, %s',
            promise.toString(),
            reason.toString()
        )
        process.exit(1)
    }
)

// Clean up on nodemon restarts
process.once('SIGUSR2', () => {
    process.kill(process.pid, 'SIGUSR2')
})

process.on('exit', () => {
    closeServer()
})

export function closeServer() {
    httpServer.close()
    consoleLog('Server successfully closed')
}

export default main
