import * as React from 'react'
import * as io from 'socket.io-client'

import { OAuth, Loader } from '../components'
import checkAPIHealth from '../utils/checkAPIHealth'

const socket = io('http://localhost:8000')
const providers = ['twitter', 'google', 'github']

export default function App() {
    const [state, setState] = React.useState({ loading: true })
    React.useEffect(() => {
        checkAPIHealth(() => {
            setState({ ...state, loading: false })
        })
    }, [])

    const RenderOAuth = () =>
        providers.map(provider => (
            <OAuth key={provider} provider={provider} socket={socket} />
        ))

    return (
        <div className="wrapper">
            <h1>OAuth</h1>
            <div className="container">
                {state.loading ? <Loader /> : RenderOAuth()}
            </div>
        </div>
    )
}
