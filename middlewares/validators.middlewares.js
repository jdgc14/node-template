const { body, validationResult } = require('express-validator')

// Utils
const { AppError } = require('../utils/appError.util')

const checkValidations = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg)

        const message = errorMessages.join('. ')

        return next(new AppError(message, 400))
    }

    next()
}

const createUserValidators = [
    body('firstName')
        .isString()
        .withMessage('firstName must be a string')
        .isLength({ min: 3 })
        .withMessage('firstName must be at least 3 characters'),
    body('lastName')
        .isString()
        .withMessage('lastName must be a string')
        .isLength({ min: 3 })
        .withMessage('lastName must be at least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('password must be a string')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
    checkValidations,
]

module.exports = { createUserValidators }
