import { Link, useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate()

    function moveTo(e) {

        if (e.target.id === 'to-home') {

            navigate('/')

        } else if (e.target.id === 'to-add') {

            navigate('/launcher/add')

        } else {

            navigate('/launcher/details')
        }
    }

    return (

        
        <div className="navbar">
            <button id="to-home" className="nav-button" onClick={(e) => moveTo(e)}>Home</button>
            <button id="to-add" className="nav-button" onClick={(e) => moveTo(e)}>Add Launcher</button>
            <button className="nav-button" onClick={(e) => moveTo(e)}>Launcher Details</button>
    </div>
    )
}

export default Navbar