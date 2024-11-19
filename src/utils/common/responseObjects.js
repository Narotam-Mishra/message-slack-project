
export const 

export const customErrorResponse = (error) => {
    if(!error.message && !error.explanation)
    return {
        success: false,
        err: error.explanation,
        data: {},
        message: error.message
    }
}