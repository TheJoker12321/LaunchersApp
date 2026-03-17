import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/createZustand.js";

function Login() {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setTokenStore } = useStore()
    const [wrongPass, setWrongPass] = useState(false)


    async function loginUser(e) {

        e.preventDefault()

        if (!username || !password) return;

        try {

            const user = {

                username,
                password

            }

            const response = await axios.post('http://localhost:3000/api/auth/login', {user})
            localStorage.setItem('token', response.data.token)
            setTokenStore(response.data.token)
            navigate('/home')
            
        } catch (err) {

            console.error(err);
            
        }
    }

    return (

        <div className="div-login">
            <form className="form-login">
                <h1>Login:</h1>
                <div className="input-div">
                    <label htmlFor="user-login">User Name: </label>
                    <input id="user-login" type="text" placeholder="John123" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="input-div">
                    <label htmlFor="pass-login">Password: </label>
                    <input id="pass-login" type="password" placeholder="****" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="div-submit">
                    <button className="submit" onClick={(e) => loginUser(e)}>Log In</button>
                </div>
                {wrongPass && <div>wrong password</div>}
            </form>
        </div>
    )
}

export default Login