import axios from "axios"
import { useState } from "react"

function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState('')
    const [isCreate, setIsCreate] = useState(false)

    async function createUser(e) {

        e.preventDefault()

        if (!username || !password || !email || !userType) return

        try {

            const user = {

                username,
                password,
                email,
                user_type: userType,

            }
            

            const token = localStorage.getItem('token')

            await axios.post('http://localhost:3000/api/auth/register/create', {user},

                {headers: {Authorization: `Bearer ${token}`}}
            
            )

            setIsCreate(true)

            setTimeout(() => {

                setIsCreate(false)

            }, 5000)


        } catch (err) {

            console.error(err)

        }
    }

    return (

        <div className="register-div">
            <form className="form-register">
                <h1>Register</h1>
                <div className="input-div">
                    <label htmlFor="username">User Name: </label>
                    <input id="username" type="text" placeholder="John123" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="input-div">
                    <label htmlFor="pass">Password: </label>
                    <input id="pass" type="password" placeholder="****" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="input-div">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" placeholder="JohnDoe@gmail.com" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="input-div">
                    <label htmlFor="type">User Type: </label>
                    <input id="type" type="text" placeholder="air force" onChange={e => setUserType(e.target.value)}/>
                </div>
                <div className="reg-button">
                    <button className="submit" onClick={(e) => createUser(e)}>create</button>
                </div>
                {isCreate && <div>user created successfully</div>}
            </form>
        </div>
    )
}


export default Register