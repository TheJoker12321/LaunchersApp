import axios from "axios"
import { useState } from "react"
import useStore from "../zustand/createZustand.js"

function EditUser() {

    const { valueUpdated } = useStore()
    const [username, setUsername] = useState(valueUpdated.username)
    const [password, setPassword] = useState(valueUpdated.password)
    const [email, setEmail] = useState(valueUpdated.email)
    const [updated, setUpdated] = useState(false)

    async function updateUser(e) {

        e.preventDefault()

        if (!username || !password || !email) return;

        try {

            const token = localStorage.getItem('token')

            const user = {

                username,
                password,
                email

            }

            await axios.put(`http://localhost:3000/api/auth/register/update/${e.target.id}`, {user},

                {headers: {Authorization: `Bearer ${token}`}}

            )

            setUpdated(true)
            setTimeout(() => {
                setUpdated(false)
            }, 5000)

        } catch (err) {

            console.error(err);
            
        }

    }

    return (

        <div className="update-div">
            <form className="form-update">
                <h1 style={{margin: '0'}}>Update User</h1>
                <div className="input-div">
                    <label htmlFor="name-update">User Name: </label>
                    <input id="name-update" type="text" defaultValue={valueUpdated.username} onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="input-div">
                    <label htmlFor="pass-update">Password: </label>
                    <input id="pass-update" type="password" defaultValue={valueUpdated.password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="input-div">
                    <label htmlFor="email-update">Email</label>
                    <input id="email-update" type="email" defaultValue={valueUpdated.email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <button className="submit" id={valueUpdated._id} onClick={(e) => updateUser(e)}>Update</button>
                {updated && <div>user updated successfully</div>} 
            </form>
        </div>
    )
}

export default EditUser