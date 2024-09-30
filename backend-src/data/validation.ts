import Joi from 'joi'
import { Cart } from '../Interfaces/cart.js'
import { Flower } from '../Interfaces/product.js'
import { User } from '../Interfaces/user.js'

export const cartSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        _id: Joi.string()
        .min(24),
        userId: Joi.string()
            .min(24),
        productId: Joi.string()
            .min(24),
        amount: Joi.number()
            .min(1)
            .required()
    }
).unknown(false)

export const flowerSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        _id: Joi.string()
        .min(24),
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

export const userSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        _id: Joi.string()
        .min(24),
        name: Joi.string()
            .min(1)
            .required(),
        isAdmin: Joi.boolean()
            .required()
    }
).unknown(false)

export function isValidCart(cart: Cart): boolean {
    let result = cartSchema.validate(cart)
    return !result.error
}

export function isValidFlower(flower: Flower): boolean {
    let result = flowerSchema.validate(flower)
    return !result.error
}

export function isValidUser(user: User): boolean {
    let result = userSchema.validate(user)
    return !result.error
}