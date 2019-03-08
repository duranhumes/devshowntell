import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator/check'

import { code422 } from '../../utils/httpMessages'
import { formatValidationError } from '../helpers'

export const validationRules = {}

export function validationFunc(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const { errString, fields } = formatValidationError(errors.array())

        return res.status(422).json(code422({ fields, message: errString }))
    }

    return next()
}
