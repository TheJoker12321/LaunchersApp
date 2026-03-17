import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useStore from "../zustand/createZustand.js"

function GetUsers() {

    const navigate = useNavigate()
    const { setValueUpdated } = useStore()
    const [data, setData] = useState([])
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


    return (

        <div className="get-users">
            
            <div className="div-show-title">
                <div className="id-title-show showing">id</div>
                <div className="user-title-show showing">username</div>
                <div className="pass-title-show showing">password</div>
                <div className="email-title-show showing">email</div>
                <div className="type-title-show showing">user type</div>
                <div className="login-title-show showing">last login</div>
                <div className="empty-show"></div>
                <div className="empty-show"></div>
            </div>
            {Array.isArray(data) && data.map((userObj) => {

                return (
                    <div key={userObj._id} className="show-users-div">
                        <div className="show-users id-show-users">{userObj._id}</div>
                        <div className="show-users">{userObj.username}</div>
                        <div className="show-users">{userObj.password}</div>
                        <div className="show-users">{userObj.email}</div>
                        <div className="show-users">{userObj.user_type}</div>
                        <div className="show-users">{userObj.last_login}</div>
                        <button className="edit-button" onClick={() => moveToEdit(userObj)}>Edit</button>
                        <button className="delete-user" id={userObj._id} onClick={(e) => deleteUser(e)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default GetUsers