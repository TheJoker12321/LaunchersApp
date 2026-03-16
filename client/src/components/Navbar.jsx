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

        
        <div>
            <button>Home</button>
            <button>Add Launcher</button>
            <button onClick={(e) => moveTo(e)}>Launcher Details</button>
    </div>
    )
}

export default Navbar