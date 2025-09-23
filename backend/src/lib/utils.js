import jwt from "jsonwebtoken";

import { ENV } from "../lib/env.js";

export const generateToken = (userId, res) => {
    const {JWT_SECRET, NODE_ENV} = ENV
    if(!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured")
    }

    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '7d',
    })

res.cookie('jwt', token, {
    maxAge: 7*24*60*60*1000, // ms
    httpOnly: true, //prevent XSS attacks: cross-site scripting
    sameSite: 'strict', //CSRF attacks: cross-site request forgery
    secure: ENV.NODE_ENV === 'development' ? false : true, //https only in production
})
return token
}
