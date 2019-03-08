import * as React from 'react'

import './Card.css'

import { IUser } from '../../interfaces/IUser'

interface ICard {
    user: IUser
    provider: string
    atSymbol: string
    closeCard: () => void
}

export default function Card({ user, provider, atSymbol, closeCard }: ICard) {
    const { id, name, photo } = user
    return (
        <div className="card">
            {photo && <img src={photo} alt={name} />}
            <h4>id: {id}</h4>
            <h4>username: {`${atSymbol}${name}`}</h4>
            <h4>provider: {provider}</h4>
            <button className="close" onClick={closeCard}>
                <i className="fas fa-times-circle" />
            </button>
        </div>
    )
}
