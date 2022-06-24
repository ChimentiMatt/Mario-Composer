import { useState, useGlobal } from 'reactn'
import { Navigate, Link } from 'react-router-dom'
import axios from 'axios'


const SignupForm = ({animateToast}) => {

    const [token, setToken] = useGlobal("token")
    const [user, setUser] = useGlobal("user")
    const [error, setError ] = useState("")
    const [signedUp, setSignedUp ] = useState(false)
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "" 
    })

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try{
            await axios.post("http://localhost:1337/auth/signup", formState)
            const {data} = await axios.post("http://localhost:1337/auth/login", {
                username: formState.username,
                password: formState.password
            })
            setUser(data.user)
            setToken(data.token)
            setSignedUp(true)
        }
        catch (err){
            let param = 'Invalid credentials  '
            animateToast(param, true)
            // setError("Invalid form data")
        }
    }

    return (
        <>
            {error && <div>{error}</div>}
            {signedUp && <Navigate  replace to="/"/>}
            <form onSubmit={handleSubmit} className="flex">
                <h1 className='ml-[1rem] md:mr-[1rem] w-[6rem] pl-2 pr-2 pt-1 md:h-[2.5rem] md:text-2xl text-center'>Signup </h1>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formState.username} 
                    className="text-[rem] w-[6rem] pl-2  md:h-[2.5rem] md:w-[10rem] border-2 border-black rounded-l-lg"/>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formState.email} 
                    className="w-[6rem] pl-2  md:h-[2.5rem] md:w-[10rem] border-2 border-black "/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formState.password}
                    className="w-[6rem] pl-2  md:h-[2.5rem] md:w-[10rem] border-2 border-black "/>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formState.confirmPassword} 
                    className="w-[6rem] md:w-[10rem] pl-2 md:h-[2.5rem] border-2 border-black "/>
                <button className='pl-2 pr-2  md:h-[2.5rem] md:text-2xl text-center  bg-green-500 border-2 border-black rounded-r-lg'>Submit</button>
              
                <Link className='ml-4 md:ml-16 pr-2 pt-1 md:h-[2.5rem] md:text-2xl text-center hover:text-white' to="/login">login</Link>
            </form>
        </>
    )
}

export default SignupForm