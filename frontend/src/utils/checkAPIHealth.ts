import request from './request'
import { healthEndpoint } from '../api/endpoints'

export default async (cb: (...args: any) => any) => {
    const r = request()
    try {
        const check = await r.get(healthEndpoint)

        if (!check || !check.data) {
            throw new Error('API may be down')
        }
    } catch (error) {
        console.error(error)
    }

    return cb()
}
