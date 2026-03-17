import express from 'express'
import { authorized } from '../middleware/authorized.js'
import db from '../DB/connectMongo.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'


const auth = express.Router()

auth.get('/users', authorized, async (req, res) => {

    const { payload } = req.headers
    
    if (payload['user_type'] !== 'admin') {

        return res.status(401).json({

            error: 'Unaouthorized'

        })

    }

    try {

        
        const users = await db.collection('users').find().toArray()
        
        res.status(200).json({
            
            users
            
        })

    } catch (err) {

        res.status(500).json({

            error:err.message

        })
    }
})

auth.get('/getUser', authorized, async (req, res) => {

    const {payload} = req.headers
    try {

        const findUser = await db.collection('users').findOne({username: payload.username})
        
        res.status(200).json({
            
            user: findUser
            
        })

    } catch (err) {

        res.status(500).json({

            error: err.message

        })
    }
})

auth.post('/register/create', authorized, async (req, res) => {

    const { user } = req.body
    const { payload } = req.headers
    
    if (payload['user_type'] !== 'admin') {

        return res.status(401).json({

            error: 'Unaouthorized'

        })

    }

    const users = await db.collection('users').find().toArray()
    
    const findType = users.filter((userObj) => userObj.user_type === user.user_type)
    if (findType.length > 0){

        return res.status(201).json({

            message: 'This type of user already exists'
        })
    } 

    try {

        user['last_login'] = null

        await db.collection('users').insertOne(user)

        res.status(201).json({

            message: 'created',
            user
        })
    } catch (err) {

        res.status(500).json({

            error: err.message

        })
    }



})

auth.post('/login', async (req, res) => {

    const { user } = req.body
    console.log(user);
    
    
    const findUser = await db.collection('users').findOne({$and: [{username: user.username}, {password: user.password}]})
    console.log(findUser);
    
    if (!findUser) {

        return res.status(404).json({

            error: 'user not found'
        })
    }

    try {

        db.collection('users').updateOne({username: user.username}, {$set: {last_login: new Date().toDateString()}})
        const token = jwt.sign({username: user.username, user_type: findUser.user_type}, process.env.PRIVATE_KEY, {expiresIn: '1h'})
        res.status(201).json({

            token
        })

    } catch (err) {

        res.status(500).json({

            error: err.message

        })
    }
})

auth.put('/register/update/:id', authorized, async (req, res) => {

    const {id} = req.params
    const {user} = req.body
    const { payload } = req.headers
    
    if (payload['user_type'] !== 'admin') {

        return res.status(401).json({

            error: 'Unaouthorized'

        })

    }

    try {

        await db.collection('users').updateOne({_id: new ObjectId(id)}, {$set: {

            username: user.username,
            password: user.password,
            email: user.email

        }})

        res.status(203).json({

            message: 'user updated successfully'
        })


    } catch (err) {

        res.status(500).json({

            error: err.message
            
        })
    }

})

auth.delete('/register/delete/:id', authorized, async (req, res) => {

    const { payload } = req.headers
    
    if (payload['user_type'] !== 'admin') {

        return res.status(401).json({

            error: 'Unaouthorized'

        })

    }

    try {

        const { id } = req.params

        await db.collection('users').deleteOne({_id: new ObjectId(id)})

        res.status(204).json({

            message: 'deleted successfully'

        })
    } catch (err) {

        res.status(500).json({

            error: err.message

        })
    }
})


export default auth