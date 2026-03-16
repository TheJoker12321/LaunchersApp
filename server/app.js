import express from 'express'
import cors from 'cors'
import api from './routes/api.js'


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', api)



app.listen(3000, () => {

    console.log('start running server');
    
})