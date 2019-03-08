interface IBaseError {
    error?: string
    message?: string
}
interface IBaseSuccess {
    data?: object
    message?: string
}

export const code500 = ({
    error = 'Unknown',
    message = 'Something went wrong please try again.',
}: IBaseError) => ({
    error,
    message,
    status: 500,
})

export const code422 = ({
    error = 'Unacceptable data',
    message = 'The data passed does not meet the reqiurements for this endpoint',
    fields = [],
}: IBaseError & { fields: string[] }) => ({
    error,
    message,
    fields,
    status: 422,
})

export const code409 = ({
    error = 'Duplicate',
    message = 'Resource already exists',
}: IBaseError) => ({
    error,
    message,
    status: 409,
})

export const code404 = ({
    error = 'Not Found',
    message = 'The resource at this endpoint was not found',
}: IBaseError) => ({
    error,
    message,
    status: 404,
})

export const code403 = ({
    error = 'Forbbiden',
    message = 'You cannot perform this action',
}: IBaseError) => ({
    error,
    message,
    status: 403,
})

export const code401 = ({
    error = 'Unauthorized',
    message = 'Invalid credentials',
}: IBaseError) => ({
    error,
    message,
    status: 401,
})

export const code204 = ({
    data = {},
    message = 'Resource found',
}: IBaseSuccess) => ({
    data,
    message,
    status: 204,
})

export const code201 = ({ data = {}, message = 'Created' }: IBaseSuccess) => ({
    data,
    message,
    status: 201,
})

export const code200 = ({ data = {}, message = 'Success' }: IBaseSuccess) => ({
    data,
    message,
    status: 200,
})
