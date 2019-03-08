import * as React from 'react'

import './Button.css'

interface IButton {
    provider: string
    isDisabled: boolean
    startAuth: () => void
}

export default function Button({ provider, isDisabled, startAuth }: IButton) {
    const disabled = isDisabled ? 'disabled' : ''
    return (
        <div className="button-wrapper fadein-fast">
            <button
                onClick={startAuth}
                className={`${provider} ${disabled} button`}
            >
                <i className={`fab fa-${provider}`} />
            </button>
        </div>
    )
}
