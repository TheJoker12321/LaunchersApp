import useStore from "../zustand/createZustand.js"

function Details() {
    
    const { launcherChoose } = useStore()    


    return (

        <div className="det-page">
            <div className="det-div">
                <h1 className="id-detail">id launcher:   {launcherChoose._id}</h1>
                <p className="name-detail">name launcher: {launcherChoose.name}</p>
                <p className="type-detail">rocket type of launcher: {launcherChoose.rocketType}</p>
                <p className="lat-detail">latitude: {launcherChoose.latitude}</p>
                <p className="long-detail">longitude: {launcherChoose.longitude}</p>
                <p className="city-detail">city: {launcherChoose.city}</p>
                <p className="des-detail">destroyed: {String(launcherChoose.destroyed)}</p>
            </div>
        </div>

    )
}

export default Details