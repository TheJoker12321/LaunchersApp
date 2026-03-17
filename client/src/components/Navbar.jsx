import { Link, useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate()

    function moveTo(e) {

        if (e.target.id === 'to-home') {

            navigate('/home')

        } else if (e.target.id === 'to-add') {

            navigate('/launcher/add')

        } else if(e.target.id === 'to-details') {

            navigate('/launcher/details')
        } else if (e.target.id === 'to-register') {

            navigate('/register')
            
        } else if (e.target.id === 'to-login') {

            navigate('/')

        } else {

            navigate('/getUsers')
        }
    }

    return (

        
        <div className="navbar">
            <button id="to-home" className="nav-button" onClick={(e) => moveTo(e)}>Home</button>
            <button id="to-add" className="nav-button" onClick={(e) => moveTo(e)}>Add Launcher</button>
            <button id="to-details" className="nav-button" onClick={(e) => moveTo(e)}>Launcher Details</button>
            <button id="to-getUsers" className="nav-button" onClick={(e) => moveTo(e)}>Get Users</button>
            <button id="to-login" className="nav-button" onClick={(e) => moveTo(e)}>Log In</button>
            <button id="to-register" className="nav-button" onClick={(e) => moveTo(e)}>Register</button>
            
    </div>
    )
}

export default Navbar