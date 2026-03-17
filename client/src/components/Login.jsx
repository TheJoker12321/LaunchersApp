import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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
            navigate('/home')
            
        } catch (err) {

            console.error(err);
            
        }
    }

    return (

        <div>
            <form>
                <h1>Login:</h1>
                <div>
                    <label htmlFor="user-login">User Name: </label>
                    <input id="user-login" type="text" placeholder="John123" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="pass-login">Password: </label>
                    <input id="pass-login" type="password" placeholder="****" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button onClick={(e) => loginUser(e)}>Log In</button>
                </div>
                {wrongPass && <div>wrong password</div>}
            </form>
        </div>
    )
}

export default Login