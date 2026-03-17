import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function authorized(req, res, next) {

    const { authorization } = req.headers

    if (!authorization) {

        return res.status(401).json({

            error: 'Unaouthorized'

        })
    }
    

    const partAuth = authorization.split(' ')

    if (partAuth.length !== 2 || partAuth[0] !== 'Bearer') {

        return res.status(401).json({

            error: 'Unaouthorized'

        })
    }

    const isAuth = jwt.verify(partAuth[1], process.env.PRIVATE_KEY)    

    if (!isAuth) {

        return res.status(401).json({

            error: 'Unaouthorized'

        })
    }

    req.headers.payload = isAuth

    next()
    
}