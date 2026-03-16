export default function validLauncher(req, res, next) {

    const {name, rocketType, latitude, longitude, city} = req.body
    
    if (typeof name !== 'string' || typeof rocketType !== 'string' || 
        typeof city !== 'string' || typeof latitude !== 'number' || typeof longitude !== 'number') {

        return res.status(500).json({

            error: 'name, city and rocket type must be string and longitude and latitude must be number'
            
        })
    }

    next()
}