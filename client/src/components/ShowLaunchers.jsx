import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import ShowData from "./showData"

function ShowLaunchers() {

    const [data, setData] = useState([])
    const [flag, setFlag] = useState(false)
    const [dataShow, setDataShow] = useState([])
    const [id, setId] = useState('')
    const [city, setCity] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {

        async function getLaunchers() {

            const launchers = await axios.get('http://localhost:3000/api/launchers')
            
            setData(launchers.data.launchers)
        }
        getLaunchers()
        

    }, [flag])

    async function deleteLauncher(e) {

        e.stopPropagation()
        const newData = data.filter((obj) => obj._id !== e.target.id)
        setData(newData)        
        await axios.delete(`http://localhost:3000/api/launchers/${e.target.id}`)
        setFlag(!flag)

    }

    function showAll() {

        setDataShow(data)

    }

    async function searchById() {

        if (!id) return 
        
        try {

            const launcherFound = await axios.get(`http://localhost:3000/api/launchers/${id}`)
            
            setDataShow([launcherFound.data.launcher])

        } catch (err) {

            console.error(err);
            
        }
    }

    function searchByCity() {

        if (!city) return;

        const result = data.filter((launcherObj) => launcherObj.city === city)

        setDataShow(result)
    }

    function searchByType() {

        if (!type) return;

        const result = data.filter((launcherObj) => launcherObj.rocketType === type)

        setDataShow(result)
    }

    return (

        <>
            <div className="show-div">

                <h1 id="title">Launchers</h1>
                <div className="searching">
                    <button onClick={showAll} className="all">ShowAll</button>
                    <div className="search-div">
                        <input type="text" placeholder="search by id..." onChange={e => setId(e.target.value)}/>
                        <button onClick={searchById}>Search</button>
                    </div>
                    <div className="search-div">
                        <input type="text" placeholder="search by city" onChange={e => setCity(e.target.value)}/>
                        <button onClick={searchByCity}>Search</button>
                    </div>
                    <div className="search-div">
                        <input type="text" placeholder="search by type..." onChange={e => setType(e.target.value)}/>
                        <button onClick={searchByType}>Search</button>
                    </div>
                </div>
                <ShowData data={dataShow} onclick={deleteLauncher}/>
            </div>
        </>
    )
}

export default ShowLaunchers