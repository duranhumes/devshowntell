import * as React from 'react'

import request from '../utils/request'
import { promiseWrapper } from '../utils'
import { loggingEndpoint } from '../api/endpoints'
import checkAPIHealth from '../utils/checkAPIHealth'

export default class ErrorBoundary extends React.Component<
    any,
    { hasError: boolean }
> {
    static getDerivedStateFromError(error: object) {
        return { hasError: !!error }
    }

    state = { hasError: false }

    componentDidCatch(error: object, info: object) {
        this.setState({ hasError: true })

        const r = request()
        checkAPIHealth(async () => {
            const [, err] = await promiseWrapper(
                r.post(loggingEndpoint, { error, info })
            )
            if (err) {
                console.error('Something went wrong with logging')
            }
        }).then(() => console.log(error, info))
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>
        }

        return this.props.children
    }
}
