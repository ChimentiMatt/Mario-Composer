import { useState, useGlobal } from 'reactn'
import { Navigate, Link } from 'react-router-dom'
import axios from 'axios'


const LoginForm = ({animateToast}) => {
    const [logginLoad, setLogginLoad] = useGlobal("logginLoad")
    const [token, setToken] = useGlobal("token")
    const [user, setUser] = useGlobal("user")
    const [error, setError ] = useState("")
    const [loggedIn, setloggedIn ] = useState(false)
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:1337/auth/login", formState)
            setUser(data.user)
            setToken(data.token)
            setloggedIn(true)
            setLogginLoad(!logginLoad)
        }
        catch (err){
            let param = 'Invalid credentials  '
            animateToast(param, true)
            console.log(err)
            setError(err)
        }
        
    }

    return(
        <>
            {loggedIn && <Navigate replace to="/" />}
            <form onSubmit={handleSubmit} className="flex mt-0 md:mt-6">
                <h1 className='ml-1 pl-2 pr-2 md:pt-1 h-[1.5rem] md:h-[2.5rem] md:text-2xl text-center'>Login</h1>
                <input className='w-[6rem] md:w-[15rem] pl-2 h-[2.2rem] md:h-[2.5rem] border-2 border-black rounded-l-lg'
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    onChange={handleChange} 
                    value={formState.username} />
                <input  className='w-[6rem] md:w-[15rem] pl-2 h-[2.2rem] md:h-[2.5rem] border-2 border-black'
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    value={formState.password}/>
                <button className=' pl-2 pr-2 text-[1rem]  md:pt-1 md:text-2xl text-center  bg-green-500 border-2 border-black rounded-r-lg'>Login</button>
                <Link className=' pl-[1rem] md:ml-16 md:pl-2  md:pt-1 md:text-2xl text-center  border-black rounded-lg hover:text-white' to="/signup"> Signup</Link>
            </form>
        </>
    )

}


export default LoginForm