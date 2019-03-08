import * as passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

import config from '../config'
import { isEmpty } from '../utils'

const { twitter, google, github } = config

export const passportConfig = () => {
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => {
        if (!user || isEmpty(user)) {
            return done(null, false)
        }

        return done(null, user)
    })

    const callback = (
        _: any,
        __: any,
        profile: object,
        cb: (...args: any) => void
    ) => cb(null, profile)

    passport.use(new TwitterStrategy(twitter, callback))
    passport.use(new GoogleStrategy(google, callback))
    passport.use(new GithubStrategy(github, callback))
}
