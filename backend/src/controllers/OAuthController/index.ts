import * as passport from 'passport'
import { Router, Response, Request } from 'express'

import { attachSocket } from '../../middleware'

const githubAuth = passport.authenticate('github')
const twitterAuth = passport.authenticate('twitter')
const googleAuth = passport.authenticate('google', { scope: ['profile'] })

class Controller {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.get('/google/callback', googleAuth, this.googleCallback)
        this.router.get('/github/callback', githubAuth, this.githubCallback)
        this.router.get('/twitter/callback', twitterAuth, this.twitterCallback)

        this.router.use(attachSocket)
        this.router.get('/google', googleAuth)
        this.router.get('/github', githubAuth)
        this.router.get('/twitter', twitterAuth)
    }

    googleCallback = async (req: Request, res: Response) => {
        const io = req.app.get('io')
        const user = {
            id: req.user.id,
            name: req.user.displayName,
            photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=500'),
        }

        if (req.session) {
            io.in(req.session.socketId).emit('google', user)
        }

        return res.sendStatus(200)
    }

    githubCallback = async (req: Request, res: Response) => {
        const io = req.app.get('io')
        const user = {
            id: req.user.id,
            name: req.user.username,
            photo: req.user.photos[0].value,
        }

        if (req.session) {
            io.in(req.session.socketId).emit('github', user)
        }

        return res.sendStatus(200)
    }

    twitterCallback = async (req: Request, res: Response) => {
        const io = req.app.get('io')
        const user = {
            id: req.user.id,
            name: req.user.username,
            photo: req.user.photos[0].value.replace(/_normal/, ''),
        }

        if (req.session) {
            io.in(req.session.socketId).emit('twitter', user)
        }

        return res.sendStatus(200)
    }
}

export const OAuthController = new Controller().router
