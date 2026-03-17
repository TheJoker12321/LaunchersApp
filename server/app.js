import express from 'express'
import cors from 'cors'
import api from './routes/api.js'
import auth from './routes/auth.js'


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', api)
app.use('/api/auth', auth)



app.listen(3000, () => {

    console.log('start running server');
    
})