/**
 * Build callback urls used by these OAuth providers
 */
const port = Number(process.env.APP_PORT)
const appVersion = String(process.env.APP_VERSION)

const providers = ['twitter', 'google', 'github']
const [twitterURL, googleURL, githubURL] = providers.map(
    provider =>
        `http://localhost:${port}/${appVersion}/oauth/${provider}/callback`
)

export default {
    twitter: {
        consumerKey: String(process.env.TWITTER_KEY),
        consumerSecret: String(process.env.TWITTER_SECRET),
        callbackURL: twitterURL,
    },
    google: {
        clientID: String(process.env.GOOGLE_KEY),
        clientSecret: String(process.env.GOOGLE_SECRET),
        callbackURL: googleURL,
    },
    github: {
        clientID: String(process.env.GITHUB_KEY),
        clientSecret: String(process.env.GITHUB_SECRET),
        callbackURL: githubURL,
    },
}
