import { Request, Response, NextFunction } from 'express'

import * as httpMessages from '../utils/httpMessages'

export const attachSocket = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.session) {
        req.session.socketId = req.query.socketId
        return next()
    }

    return res.status(403).json(httpMessages.code403({}))
}
