import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'

function ShowLaunchers() {

    const [data, setData] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(() => {

        async function getLaunchers() {

            const launchers = await axios.get('http://localhost:3000/api/launchers')
            console.log(launchers);
            
            setData(launchers.data.launchers)
        }
        getLaunchers()

    }, [flag])

    async function deleteLauncher(e) {

        await axios.delete(`http://localhost:3000/api/launchers/${e.target.id}`)
        setFlag(!flag)

    }

    return (

        <>
        <div className="show-div">

            <h1 id="title">Launchers</h1>
            <div className="title-launchers">
                <div className="id-title">id</div>
                <div className="name-title">name</div>
                <div className="type-title">rocket type</div>
                <div className="lat-title">latitude</div>
                <div className="long-title">longitude</div>
                <div className="city-title">city</div>
                <div className="empty"></div>
        </div>
            {Array.isArray(data) && data.map((launcherObj, index) => {
                
                return (
                    
                    <div key={index} className="launcher-div">
                        <div className="launcher-id">{launcherObj._id}</div>
                        <div className="launcher-name">{launcherObj.name}</div>
                        <div className="launcher-rocket">{launcherObj.rocketType}</div>
                        <div className="launcher-lat">{launcherObj.latitude}</div>
                        <div className="launcher-long">{launcherObj.longitude}</div>
                        <div className="launcher-city">{launcherObj.city}</div>
                        <div className="button-del">
                            <button id={launcherObj._id} className="delete-launcher" onClick={deleteLauncher}>Delete</button>
                        </div>
                    </div>
                )
            })}
            </div>
        </>
    )
}

export default ShowLaunchers