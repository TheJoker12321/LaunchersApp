import axios from "axios"
import { useState } from "react"

function FormLauncher() {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [city, setCity] = useState("")
    const [destroyed, setDestroyed] = useState(false)


    async function createLauncher(e) {

        e.preventDefault()
        
        const launcher = {

            name, 
            rocketType: type, 
            latitude: lat,
            longitude: long,
            city,
            destroyed

        }

        try {
            
            const token = localStorage.getItem('token')

            await axios.post('http://localhost:3000/api/launchers', {launcher}, {
                headers: {Authorization: `Bearer ${token}`}
            })
            
        } catch (err) {

            console.error(err.message);
            
        }
    }

    return (

        <div className="form-div">
            <form className="post-launcher">
                <h3 className="title-post">Post Launcher Form</h3>
                <div className="input-div">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" onChange={e => setName(e.target.value)}/>
                </div>
                <div className="input-div">
                    <label htmlFor="type">Rocket Type: </label>
                    <input type="text" id="type" onChange={e => setType(e.target.value)}/>
                </div>
                <div className="input-div">
                    <label htmlFor="lat">Latitude: </label>
                    <input type="text" id="lat" onChange={e => setLat(Number(e.target.value))}/>
                </div>
                <div className="input-div">
                    <label htmlFor="long">Longitude: </label>
                    <input type="text" id="long" onChange={e => setLong(Number(e.target.value))}/>
                </div>
                <div className="input-div">
                    <label htmlFor="city">City: </label>
                    <input type="text" id="city" onChange={e => setCity(e.target.value)}/>
                </div>
                <div className="input-div">
                    <select id="" onChange={e => setDestroyed(Boolean(e.target.value))}>
                        <option style={{display: 'none'}}></option>
                        <option value="true">destroyed</option>
                        <option value="false">not destroyed</option>
                    </select>

                </div>
                <button className="submit" onClick={(e) => createLauncher(e)}>Create</button>
            </form>
        </div>
    )
}

export default FormLauncher