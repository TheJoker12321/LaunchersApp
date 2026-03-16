import express from 'express'
import db from '../DB/connectMongo.js'
import validLauncher from '../middleware/validLauncher.js'
import { ObjectId } from 'mongodb'

const api = express.Router()

api.get('/launchers', async (req, res) => {

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

api.get('/launchers/:id', async (req, res) => {

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


api.post('/launchers', validLauncher, async (req, res) => {

    try {

        const {launcher} = req.body
        
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

api.delete('/launchers/:id', async (req, res) => {

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

api.put('/launchers/:id', async (req, res) => {

    const { updateLauncher } = req.body
    const { id } = req.params

    try {

        await db.collection('launchers').updateOne({_id: new ObjectId(id)}, {$set: {updateLauncher}})

        res.status(203).json({

            message: 'updated successfully'

        })
    } catch (err) {

        res.status(500).json({

            error: err.message
            
        })
    }

})

export default api