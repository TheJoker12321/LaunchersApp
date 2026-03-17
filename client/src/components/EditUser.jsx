import { useState } from "react"

function EditUser() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    function updateUser(e) {

        e.preventDefault
    }

    return (

        <div>
            <form>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}