import * as hpp from 'hpp'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as express from 'express'
import * as passport from 'passport'
import * as session from 'express-session'
import * as compression from 'compression'

import {
    noRoute,
    gateway,
    rateLimit,
    contentType,
    errorHandler,
    passportConfig,
} from './middleware'
import logging from './utils/logging'
import controllers from './controllers'

morgan.token('id', req => req.ip)
const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time'

/**
 * App instance
 */
const app = express()

/**
 * Middlewares
 */
app.use(gateway)
app.use(contentType)

app.disable('x-powered-by')
app.use(helmet())
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
)
app.use(rateLimit)
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json({ limit: '10mb' }))
app.use(compression())
app.use(hpp())
app.use(
    morgan(loggerFormat, {
        stream: process.stderr,
    })
)
app.use(
    session({
        secret: String(process.env.SESSION_SECRET),
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize())
passportConfig()

/**
 * Routes
 */
const router = express.Router()

const appVersion = process.env.APP_VERSION
app.use(`/${appVersion}`, router)

router.use(gateway)
router.use(contentType)

router.get('/_healthz', (_, res) =>
    res.status(200).json({ message: 'OK', status: 200 })
)
router.use('/oauth', controllers.OAuthController)
router.post('/client-logging', (req, res) => {
    logging.error({ 'client-logging': req.body })

    res.sendStatus(200)
})

const noContentUrls = ['/favicon.ico', '/robots.txt']
noContentUrls.forEach(url => {
    app.all(url, (_, res) => res.sendStatus(204))
})

app.use(errorHandler)

router.all('*', noRoute)

export default app
