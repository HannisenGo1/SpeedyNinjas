import Joi from 'joi'
import { Cart } from '../Interfaces/cart.js'
import { Flower } from '../Interfaces/product.js'
import { User } from '../Interfaces/user.js'

export const cartSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        userId: Joi.string()
            .min(24),
        productId: Joi.string()
            .min(24),
        amount: Joi.number()
            .min(1)
            .required()
    }
).unknown(false)

export const cartSchemaPut = Joi.defaults(schema => {
    return schema.required()
})
    .object().keys({
        userId: Joi.string()
            .min(24),
        productId: Joi.string()
            .min(24),
        amount: Joi.number()
            .min(1)
            .optional()
    }
).required().min(1)

export const flowerSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        name: Joi.string()
            .min(1)
            .required(),
        price: Joi.number()
            .min(1)
            .required(),
        image: Joi.string()
            .min(1)
            .required(),
        amountInStock: Joi.number()
            .min(1)
            .required()
    }
).unknown(false)

export const flowerSchemaPut = Joi.defaults(schema => {
    return schema.required()
})
    .object().keys({
        name: Joi.string()
            .min(1)
            .optional(),
        price: Joi.number()
            .min(1)
            .optional(),
        image: Joi.string()
            .min(1)
            .optional(),
        amountInStock: Joi.number()
            .min(1)
            .optional()
    }
).required().min(1)

export const userSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        name: Joi.string()
            .min(1)
            .required(),
        isAdmin: Joi.boolean()
            .required()
    }
).unknown(false)

export const userSchemaPut = Joi.defaults(schema => {
    return schema.required()
})
    .object().keys({
        name: Joi.string()
            .min(1)
            .optional(),
        isAdmin: Joi.boolean()
            .optional()
    }
).required().min(1)

export function isValidCart(cart: Cart): boolean {
    let result = cartSchema.validate(cart)
    return !result.error
}
export function isValidCartPUT(cart: Cart): boolean {
    let result = cartSchemaPut.validate(cart)
    return !result.error
}

export function isValidFlower(flower: Flower): boolean {
    let result = flowerSchema.validate(flower)
    return !result.error
}
export function isValidFlowerPUT(flower: Flower): boolean {
    let result = flowerSchemaPut.validate(flower)
    return !result.error
}

export function isValidUser(user: User): boolean {
    let result = userSchema.validate(user)
    return !result.error
}
export function isValidUserPUT(user: User): boolean {
    let result = userSchemaPut.validate(user)
    return !result.error
}