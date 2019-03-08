import * as React from 'react'

import Card from './Card'
import Button from './Button'

import { isEmpty } from '../../utils'
import { IUser } from '../../interfaces/IUser'
import { oauthEndpoint } from '../../api/endpoints'

interface IOAuthProps {
    provider: string
    socket: SocketIOClient.Socket
}
interface IOAuthState {
    user: IUser
    disabled: boolean
}

function openPopup({ provider, socket }: IOAuthProps) {
    const width = 600
    const height = 600
    const left = window.innerWidth / 2 - width / 2
    const top = window.innerHeight / 2 - height / 2

    // @ts-ignore
    const socketId = socket.io.engine.id

    const url = `${oauthEndpoint}/${provider}?socketId=${socketId}`

    const popupOpts = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, centerscreen=yes, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`

    return window.open(url, '', popupOpts)
}

export function OAuth({ socket, provider }: IOAuthProps) {
    let popup: any
    const [state, setState] = React.useState<IOAuthState>({
        user: {},
        disabled: false,
    })

    socket.on(provider, (user: IUser) => {
        if (popup) {
            popup.close()
        }

        setState({ ...state, user })
    })

    const startAuth = () => {
        if (!state.disabled) {
            popup = openPopup({ provider, socket })
            const check = setInterval(() => {
                if (!popup || !popup.closed) {
                    clearInterval(check)
                    setState({ ...state, disabled: false })
                }
            }, 1000)
        }
    }

    const closeCard = () => {
        setState({ ...state, user: {} })
    }

    const atSymbol = provider === 'twitter' ? '@' : ''

    return (
        <>
            {!isEmpty(state.user) ? (
                <Card
                    user={state.user}
                    provider={provider}
                    atSymbol={atSymbol}
                    closeCard={closeCard}
                />
            ) : (
                <Button
                    provider={provider}
                    isDisabled={state.disabled}
                    startAuth={startAuth}
                />
            )}
        </>
    )
}
