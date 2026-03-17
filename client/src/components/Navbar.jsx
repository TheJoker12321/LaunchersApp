import { Link, useNavigate } from "react-router-dom"
import useStore from "../zustand/createZustand.js"
import axios from "axios"

function Navbar() {

    const navigate = useNavigate()
    const { setTokenStore } = useStore()

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

    function logOut() {

        localStorage.setItem('token', '')
        setTokenStore('')
        navigate('/')
    }

    async function getConnect() {

        try {

            const token = localStorage.getItem('token')
            const res = await axios.get('http://localhost:3000/api/auth/getUser', {

                headers: {Authorization: `Bearer ${token}`}
            })

            const user = res.data            

            alert(`username: ${user.user.username}
user role type: ${user.user.user_type}`)

        } catch (err) {

            console.error(err);
            navigate('/')
            
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
            <button className="log-out" onClick={logOut}>Log Out</button>
            <button className="get-connect" onClick={getConnect}>Get Connect</button>
            
    </div>
    )
}

export default Navbar