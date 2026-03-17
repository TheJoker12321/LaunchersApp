import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useStore from "../zustand/createZustand.js"

function GetUsers() {

    const navigate = useNavigate()
    const { setValueUpdated } = useStore()
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        async function getData() {

            try {
                
                const token = localStorage.getItem('token')
                const res = await axios.get('http://localhost:3000/api/auth/users', {
                    
                    headers: {Authorization: `Bearer ${token}`}
                    
                })

                setData(res.data.users)

            } catch (err) {
                
                console.error(err);
                
            }
        }

        getData()

    }, [flag])

    function moveToEdit(userObj) {

        setValueUpdated(userObj)
        navigate('/editUser')

    }

    async function deleteUser(e) {

        try {

            const token = localStorage.getItem('token')

            await axios.delete(`http://localhost:3000/api/auth/register/delete/${e.target.id}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFlag(!flag)

        } catch (err) {

            console.error(err);
            
        }

    }

    function getUsers() {

        setShow(true)

    }

    function hideUsers() {

        setShow(false)
    }

    return (

        <div>
            
            <button onClick={show && hideUsers || getUsers}>{show && 'hide' || 'Get All Users'}</button>
            <div>
                <div>id</div>
                <div>username</div>
                <div>password</div>
                <div>email</div>
                <div>user type</div>
                <div>last login</div>
            </div>
            {Array.isArray(data) && data.map((userObj) => {

                return (
                    <div key={userObj._id}>
                        <div>{userObj._id}</div>
                        <div>{userObj.username}</div>
                        <div>{userObj.password}</div>
                        <div>{userObj.email}</div>
                        <div>{userObj.user_type}</div>
                        <div>{userObj.last_login}</div>
                        <button onClick={() => moveToEdit(userObj)}>Edit</button>
                        <button id={userObj._id} onClick={(e) => deleteUser(e)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default GetUsers