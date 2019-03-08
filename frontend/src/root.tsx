import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './pages'
import ErrorBoundary from './errors/ErrorBoundary'

import './root.css'

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById('root')
)
