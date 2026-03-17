import express from 'express'
import db from '../DB/connectMongo.js'
import validLauncher from '../middleware/validLauncher.js'
import { ObjectId } from 'mongodb'
import { authorized } from '../middleware/authorized.js'

const api = express.Router()

api.get('/launchers',authorized, async (req, res) => {

    
    try {
        const launchers = await db.collection('launchers').find().toArray()

        res.status(200).json({

            launchers

        })


    } catch (err) {

        res.status(500).json({

            error: err.message
        })
    }

})

api.get('/launchers/:id', authorized, async (req, res) => {

    try {
        const { id } = req.params
    
        const result = await db.collection('launchers').findOne({_id: new ObjectId(id)})

        if (!result) {

            throw new Error("id not definded");
            
        }

        res.status(200).json({

            launcher: result

        })

    } catch (err) {

        res.status(500).json({

            error: err.message

        })
    }
})


api.post('/launchers', validLauncher, authorized, async (req, res) => {

    const { payload } = req.headers
    
    if (payload['user_type'] !== 'admin' || payload['user_type'] !== 'Intelligence Corps') {

        return res.status(401).json({

            error: 'Unaouthorized'

        })

    }

    try {

        const {launcher} = req.body

        if (!launcher['destroyed']) {

            launcher['destroyed'] = false
        }

        
        await db.collection('launchers').insertOne(launcher)

        res.status(201).json({

            message: 'created',
            launcher

        })

    } catch (err) {

        res.status(500).json({

            error: err.message

        })
    }
})

api.delete('/launchers/:id', authorized, async (req, res) => {

    const { payload } = req.headers
    
    if (payload['user_type'] !== 'admin' || payload['user_type'] !== 'Intelligence Corps') {

        return res.status(401).json({

            error: 'Unaouthorized'

        })

    }

    try {

        const { id } = req.params
        
        await db.collection('launchers').deleteOne({_id: new ObjectId(id)})

        res.status(204).json({

            message: 'deleted successfully'

        })
        
    } catch (err) {

        res.status(500).json({

            error: err.message
            
        })
    }

})


export default api