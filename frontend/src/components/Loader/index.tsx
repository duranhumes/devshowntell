import * as React from 'react'

import './Loader.css'

export function Loader() {
    return (
        <div className="loading-wrapper fadein-slow">
            <div className="loading">
                <div className="background">
                    <i className="fas fa-bomb" />
                </div>
                <div className="spinner" />
            </div>
        </div>
    )
}
