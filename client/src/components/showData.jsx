import { useNavigate } from "react-router-dom"
import useStore from "../zustand/createZustand.js"

function ShowData({data, onclick}) {

    const navigate = useNavigate()
    const {setLauncher} = useStore()

    function moveToDetails(launcherObj) {
        
        setLauncher(launcherObj)
        navigate('/launcher/details')

    }

    return (
        <>
        <div className="title-launchers">
                <div className="id-title">id</div>
                <div className="name-title">name</div>
                <div className="type-title">rocket type</div>
                <div className="lat-title">latitude</div>
                <div className="long-title">longitude</div>
                <div className="city-title">city</div>
                <div className="empty"></div>
        </div>
            {Array.isArray(data) && data.map((launcherObj) => {
                
                return (

                    <div key={launcherObj._id} className="launcher-div" onClick={() => moveToDetails(launcherObj)}>
                        <div className="launcher-id">{launcherObj._id}</div>
                        <div className="launcher-name">{launcherObj.name}</div>
                        <div className="launcher-rocket">{launcherObj.rocketType}</div>
                        <div className="launcher-lat">{launcherObj.latitude}</div>
                        <div className="launcher-long">{launcherObj.longitude}</div>
                        <div className="launcher-city">{launcherObj.city}</div>
                        <div className="button-del">
                            <button id={launcherObj._id} className="delete-launcher" onClick={(e) => onclick(e)}>Delete</button>
                        </div>
                        </div>
                )
            })}
        </>
    )
}

export default ShowData