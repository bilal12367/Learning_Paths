import { CookieParseOptions } from "cookie-parser";
import { CookieOptions, Request, Response } from "express";


const addCookieToResponse = (res: Response, id: string): Response => {
    const opts: CookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 100,
        path: "/auth/refreshToken",
        domain: "http://localhost:5000",
        secure: true,
        sameSite: true,
        signed: true
    }
    res.cookie('permanentToken', { id }, opts)
    return res
}

export { addCookieToResponse }